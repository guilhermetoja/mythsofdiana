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
    [2, -3, 1, -4, 5, "2x+2 = x+1"], // add positive, negatives in input
    [2, -3, 1, -4, -5, "2x-8 = x-9"], // add negative, negatives in input
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

describe("Equation.multSides", () => {
  test.each([
    // lCoef, lCons, rCoef, rCons, mult, expected
    [1, 1, 1, 1, 2, "2x+2 = 2x+2"], // multiply by positive
    [1, 1, 1, 1, -2, "-2x-2 = -2x-2"], // multiply by negative
    [1, 1, 1, 1, 0, "not an equation"], // multiply by zero
    [2, -3, 1, -4, 3, "6x-9 = 3x-12"], // multiply by positive, negatives in input
    [2, -3, 1, -4, -1, "-2x+3 = -1x+4"], // multiply by negative, negatives in input
    [0, 0, 0, 0, 5, "not an equation"], // all zero, multiply by positive
    [0, 0, 0, 0, -3, "not an equation"], // all zero, multiply by negative
    [0, 0, 0, 0, 0, "not an equation"], // all zero, multiply by zero
    [1, -2, 0, -2, 2, "2x-4 = -4"], // right side zeroed
    [1, -2, 0, -2, -2, "-2x+4 = 4"], // right side more negative
  ])(
    `Equation(%i, %i, %i, %i).multSides(%i) should return "%s"`,
    (lCoef, lCons, rCoef, rCons, mult, expected) => {
      const eq = new Equation(lCoef, lCons, rCoef, rCons);
      eq.multSides(mult);
      expect(eq.getEquation()).toBe(expected);
    }
  );
});

describe("Equation.isEquationSolved", () => {
  test.each([
    // lCoef, lCons, rCoef, rCons, expected
    [1, 0, 0, 0, true], // canonical solved form: x = 0
    [1, 0, 0, 5, true], // x = 5
    [1, 0, 0, -3, true], // x = -3
    [1, 0, 0, 100, true], // x = 100
    [1, 1, 0, 0, false], // lCons not zero
    [2, 0, 0, 0, false], // lCoef not 1
    [1, 0, 1, 0, false], // rCoef not zero
    [1, 0, 2, 0, false], // rCoef not zero
    [1, 0, 0, 0, true], // x = 0
    [1, 0, 0, 42, true], // x = 42
    [0, 0, 0, 0, false], // lCoef not 1
    [-1, 0, 0, 0, false], // lCoef not 1
    [1, 0, 0, -42, true], // x = -42
    [1, 5, 0, 0, false], // lCons not zero
    [1, 0, 3, 4, false], // rCoef not zero
  ])(
    `Equation(%i, %i, %i, %i).isEquationSolved() should return %s`,
    (lCoef, lCons, rCoef, rCons, expected) => {
      const eq = new Equation(lCoef, lCons, rCoef, rCons);
      expect(eq.isEquationSolved()).toBe(expected);
    }
  );
});
