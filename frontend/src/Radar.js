import React from 'react';
import Sketch from 'react-p5';

const Radar = ({ drones }) => {
  const resizedDrones = drones.map((drone) => {
    return { x: drone.positionX, y: drone.positionY };
  });
  const setup = (p5, canvasParentRef) => {
    // use parent to render the canvas in this ref
    // (without that p5 will render the canvas outside of your component)
    p5.createCanvas(500, 500).parent(canvasParentRef);

    p5.noFill();
    p5.stroke(p5.color(0, 255, 0));
  };

  const draw = (p5) => {
    p5.push();
    p5.translate(p5.width / 2, p5.height / 2);
    p5.background(0);
    const count = 10;
    const offset = p5.frameCount % (500 / count);
    for (let i = 0; i < count + 5; i++) {
      p5.strokeWeight(p5.max((count - i) / 10, 0.1));
      p5.circle(0, 0, offset + (500 / count) * i);
    }
    p5.rotate(-2 * p5.PI + (2 * p5.PI * (p5.frameCount % 100)) / 100);
    p5.strokeWeight(2);
    p5.line(0, 0, 600, 0);
    p5.pop();
    p5.push();
    p5.fill('green');
    resizedDrones.forEach((drone) =>
      p5.circle(drone.x / 1000, drone.y / 1000, 7)
    );

    p5.pop();
  };

  return <Sketch setup={setup} draw={draw} />;
};
export default Radar;
