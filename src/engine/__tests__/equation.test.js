import Equation from "../equation.js";

describe("Equation.getEquation", () => {
  test.each([
    // lCoef, lCons, rCoef, rCons, expected
    [1, 2, 3, 4, "x+2 = 3x+4"],
    [1, 2, 3, 0, "x+2 = 3x"],
    [1, 2, 0, 4, "x+2 = 4"],
    [1, 0, 3, 4, "x = 3x+4"],
    [0, 2, 3, 4, "2 = 3x+4"],
    [1, -2, 3, 4, "x-2 = 3x+4"],
    [1, 2, -3, 4, "x+2 = -3x+4"],
    [1, 2, 3, -4, "x+2 = 3x-4"],
    [-1, 2, 3, 4, "-1x+2 = 3x+4"],
    [1, -2, -3, 4, "x-2 = -3x+4"],
    [1, 2, -3, -4, "x+2 = -3x-4"],
    [-1, -2, 3, 4, "-1x-2 = 3x+4"],
    [0, 0, 3, 4, "not an equation"],
    [1, 0, 0, 4, "x = 4"],
    [1, 2, 0, 0, "x+2 = 0"],
    [0, 2, 0, 4, "2 = 4"],
    [0, 0, 0, 0, "not an equation"],
    [-1, -2, -3, -4, "-1x-2 = -3x-4"],
    [1, -2, 0, -4, "x-2 = -4"],
    [0, -2, 0, 4, "-2 = 4"],
  ])(
    'Equation(%i, %i, %i, %i).getEquation() should return "%s"',
    (lCoef, lCons, rCoef, rCons, expected) => {
      const eq = new Equation(lCoef, lCons, rCoef, rCons);
      expect(eq.getEquation()).toBe(expected);
    }
  );
});

describe("Equation.addSides", () => {
  test.each([
    // lCoef, lCons, rCoef, rCons, add, expected
    [1, 1, 1, 1, 2, "x+3 = x+3"], // add positive
    [1, 1, 1, 1, -2, "x-1 = x-1"], // add negative
    [1, 1, 1, 1, 0, "x+1 = x+1"], // add zero
    [2, -3, 1, -4, 5, "2x+2 = 1x+1"], // add positive, negatives in input
    [2, -3, 1, -4, -5, "2x-8 = 1x-9"], // add negative, negatives in input
    [0, 0, 0, 0, 3, "3 = 3"], // all zero, add positive
    [0, 0, 0, 0, -3, "-3 = -3"], // all zero, add negative
    [0, 0, 0, 0, 0, "not an equation"], // all zero, add zero
    [1, -2, 0, -2, 2, "x = 0"], // right side zeroed
    [1, -2, 0, -2, -2, "x-4 = -4"], // right side more negative
  ])(
    `Equation(%i, %i, %i, %i).addSides(%i) should return "%s"`,
    (lCoef, lCons, rCoef, rCons, add, expected) => {
      const eq = new Equation(lCoef, lCons, rCoef, rCons);
      eq.addSides(add);
      expect(eq.getEquation()).toBe(expected);
    }
  );
});
