export const distanceCal = (x1, y1, x2, y2) => {
  const xDifferenceSquare = Math.pow(x2 - x1, 2);
  const yDifferenceSquare = Math.pow(y2 - y1, 2);

  return Math.sqrt(xDifferenceSquare + yDifferenceSquare);
};
