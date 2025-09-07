import Chance from "chance";

const chance = new Chance();

class Equation {
  constructor(lCoef, lCons, rCoef, rCons) {
    this.lCoef = lCoef;
    this.lCons = lCons;
    this.rCoef = rCoef;
    this.rCons = rCons;
  }

  getEquation() {
    // Check if this is actually an equation (at least one side must have content)
    const hasLeftContent = this.lCoef !== 0 || this.lCons !== 0;
    const hasRightContent = this.rCoef !== 0 || this.rCons !== 0;

    if (!hasLeftContent && !hasRightContent) {
      return "not an equation";
    }

    let equation = "";

    // Build left side
    if (this.lCoef !== 0) {
      if (this.lCoef === 1) {
        equation = "x";
      } else if (this.lCoef === -1) {
        equation = "-x";
      } else {
        equation = `${this.lCoef}x`;
      }
    }

    if (this.lCons !== 0) {
      if (this.lCons > 0) {
        if (this.lCoef !== 0) {
          equation += `+${this.lCons}`;
        } else {
          equation = `${this.lCons}`;
        }
      } else {
        equation += `${this.lCons}`;
      }
    }

    // If left side is empty, make it "0"
    if (equation === "") {
      equation = "0";
    }

    equation += " = ";

    // Build right side
    let rightSide = "";

    if (this.rCoef !== 0) {
      if (this.rCoef === 1) {
        rightSide = "x";
      } else if (this.rCoef === -1) {
        rightSide = "-x";
      } else {
        rightSide = `${this.rCoef}x`;
      }
    }

    if (this.rCons !== 0) {
      if (this.rCons > 0) {
        if (this.rCoef !== 0) {
          rightSide += `+${this.rCons}`;
        } else {
          rightSide = `${this.rCons}`;
        }
      } else {
        rightSide += `${this.rCons}`;
      }
    }

    // If right side is empty, make it "0"
    if (rightSide === "") {
      rightSide = "0";
    }

    equation += rightSide;
    return equation;
  }

  isEquationSolved() {
    if (this.lCoef == 1) {
      if (this.lCons == 0) {
        if (this.rCoef == 0) {
          return true;
        }
      }
    }

    return false;
  }
  normalizeZeros() {
    // JS as vezes retorna coisas como -0, por exemplo em -0 * 5 = -0, que no codigo e diferente de 0
    if (Object.is(this.lCoef, -0)) this.lCoef = 0;
    if (Object.is(this.lCons, -0)) this.lCons = 0;
    if (Object.is(this.rCoef, -0)) this.rCoef = 0;
    if (Object.is(this.rCons, -0)) this.rCons = 0;
  }

  addConsSides(numberToAdd) {
    this.lCons += numberToAdd;
    this.rCons += numberToAdd;
    this.normalizeZeros();
  }

  addCoefSides(numberToAdd) {
    this.lCoef += numberToAdd;
    this.rCoef += numberToAdd;
    this.normalizeZeros();
  }

  multSides(numberToMult) {
    this.lCoef *= numberToMult;
    this.lCons *= numberToMult;
    this.rCoef *= numberToMult;
    this.rCons *= numberToMult;
    this.normalizeZeros();
  }

  resolve() {
    let minimumStepsForSolving = [];
    //begin ax + b = cx + d
    if (this.rCoef != 0) {
      minimumStepsForSolving.push(`${-1 * this.rCoef}x`);
      this.addCoefSides(-1 * this.rCoef);
    }
    // ax + b = d

    if (this.lCons != 0) {
      minimumStepsForSolving.push(`${-1 * this.lCons}`);
      this.addConsSides(-1 * this.lCons);
    }
    // ax = d

    if (this.lCoef != 1) {
      const multiplier = 1 / this.lCoef;
      minimumStepsForSolving.push(`${1 / this.lCoef}x`);
      this.multSides(multiplier);
    }

    return minimumStepsForSolving;
  }

  static generateRandomEq() {}
}

export default Equation;
