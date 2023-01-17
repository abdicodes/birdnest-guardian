const express = require('express');
const app = express();
const cors = require('cors');
const schedule = require('node-schedule');
const request = require('request');
const { XMLParser } = require('fast-xml-parser');

//coordinations of the birdnest
const birdX = 250000;
const birdY = 250000;
// min distance for violations
const minDistance = 100000;
//10 minutes in millisconds
const tenMinutes = 600000;
//min distance recorded violation starts with 500000 and gets updated in each request
let minRecordedDistance = { distance: 500000, drone: null };
let violations = [];
let pilots = [];

// request(
//   'https://assignments.reaktor.com/birdnest/drones',
//   { json: false },
//   (err, res, body) => {
//     if (err) {
//       return console.log(err);
//     }
//     const parser = new XMLParser();
//     const json = parser.parse(body);
//     console.log(json.report.capture.drone);
//     json.report.capture.drone.forEach((element, i) => {
//       if (
//         distanceCalculator(element.positionX, element.positionY, birdX, birdY) <
//         minDistance
//       ) {
//         violations.push(element);
//       }
//     });
//   }
// );

const job1 = schedule.scheduleJob('*/2 * * * * *', () => {
  request(
    'https://assignments.reaktor.com/birdnest/drones',
    { json: false },
    (err, res, body) => {
      if (err) {
        return console.log(err);
      }
      const parser = new XMLParser();
      const json = parser.parse(body);
      // console.log(json.report.capture.drone);
      json.report.capture.drone.forEach((element, i) => {
        const droneDistance = distanceCalculator(
          element.positionX,
          element.positionY,
          birdX,
          birdY
        );
        //this funcition will compare if recorded dist is less than min recorded and updates min recorded accordingly
        if (droneDistance < minDistance) {
          if (droneDistance < minRecordedDistance.distance)
            minRecordedDistance = { distance: droneDistance, drone: element };

          /* this function will add the drone to violation array if it doesn't exist already and adds a time stamp
           to make sure it's kept no longer than 10 minutes */
          const exists =
            violations.findIndex(
              (e) => e.serialNumber === element.serialNumber
            ) > -1;

          if (!exists) {
            violations.push({ ...element, time: Date.now() });
            pilotRequest(element.serialNumber);
          }

          console.log('violation detected');
        }
      });
    }
  );
});

const job2 = schedule.scheduleJob('*/5 * * * * *', () => {
  // console.log(violations);
  violations = violations.filter(
    (element) => Date.now() - element.time < tenMinutes
  );
  // pilots = pilots.filter((pilot) =>
  //   violations.map((e) => e.serialNumber).includes(pilot.pilotId)
  // );

  // console.log(violation);
});

// calculate distance between two points
const distanceCalculator = (x1, y1, x2, y2) => {
  xDifferenceSquare = Math.pow(x2 - x1, 2);
  yDifferenceSquare = Math.pow(y2 - y1, 2);

  return Math.sqrt(xDifferenceSquare + yDifferenceSquare);
};

const pilotRequest = (serialNumber) => {
  request(
    `https://assignments.reaktor.com/birdnest/pilots/${serialNumber}`,
    { json: true },
    (error, response, body) => {
      console.error('error:', error); // Print the error if one occurred
      console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
      pilots = [...pilots, { ...body, time: Date.now() }];
      console.log(pilots);
    }
  );
};

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send(pilots);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
