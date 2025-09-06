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
    [1, 0, 0, 1, "x+2 = 3"],
    [1, 1, 0, 1, "x+3 = 3"],
    [1, -2, 0, -2, "x = 0"],
  ])(
    `Equation(%i, %i, %i, %i).addSides() should return "%s"`,
    (lCoef, lCons, rCoef, rCons, expected) => {
      const eq = new Equation(lCoef, lCons, rCoef, rCons);
      eq.addSides(2);
      expect(eq.getEquation()).toBe(expected);
    }
  );
});
