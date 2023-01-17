const express = require('express');
const app = express();
const cors = require('cors');
const schedule = require('node-schedule');
const request = require('request');
const { XMLParser } = require('fast-xml-parser');

const birdX = 250000;
const birdY = 250000;
const minDistance = 100000;
const violations = [];

request(
  'https://assignments.reaktor.com/birdnest/drones',
  { json: false },
  (err, res, body) => {
    if (err) {
      return console.log(err);
    }
    const parser = new XMLParser();
    const json = parser.parse(body);
    console.log(json.report.capture.drone);
    json.report.capture.drone.forEach((element, i) => {
      if (
        distanceCalculator(element.positionX, element.positionY, birdX, birdY) <
        minDistance
      ) {
        violations.push(element);
      }
    });
  }
);

const job1 = schedule.scheduleJob('*/10 * * * * *', () => {});

const job2 = schedule.scheduleJob('*/10 * * * * *', () => {});

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
