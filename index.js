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
          }

          console.log('violation detected');
        }
      });
    }
  );
});

const job2 = schedule.scheduleJob('*/5 * * * * *', () => {
  // console.log(violations);
  const violation = violations.filter(
    (element) => Date.now() - element.time < tenMinutes
  );
  console.log(violation);
});

// calculate distance between two points
const distanceCalculator = (x1, y1, x2, y2) => {
  xDifferenceSquare = Math.pow(x2 - x1, 2);
  yDifferenceSquare = Math.pow(y2 - y1, 2);

  return Math.sqrt(xDifferenceSquare + yDifferenceSquare);
};

app.use(cors());
app.use(express.json());

app.get('/info', (req, res) => {});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
