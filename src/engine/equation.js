class Equation {
  constructor(lCoef, lCons, rCoef, rCons) {
    this.lCoef = lCoef;
    this.lCons = lCons;
    this.rCoef = rCoef;
    this.rCons = rCons;
  }

  getEquation() {
    if (this.lCoef != 0 || this.lCons) {
      let equation = "";

      if (this.lCoef != 0) {
        if (this.lCoef == 1) {
          equation = `x`;
        } else if (this.lCoef == -1) {
          equation = "-x";
        } else {
          equation = `${this.lCoef}x`;
        }
      }

      if (this.lCons != 0) {
        if (this.lCons > 0) {
          if (this.lCoef != 0) {
            equation = equation + `+${this.lCons}`;
          } else {
            equation = equation + `${this.lCons}`;
          }
        } else if (this.lCons < 0) {
          equation = equation + `${this.lCons}`;
        }
      }

      equation = equation + ` = `;

      if (this.rCoef != 0) {
        if (this.rCoef == 1) {
          equation += `x`;
        } else if (this.rCoef == -1) {
          equation += "-x";
        } else {
          equation += `${this.rCoef}x`;
        }
      }

      if (this.rCons != 0) {
        if (this.rCons > 0) {
          if (this.rCoef != 0) {
            equation = equation + `+${this.rCons}`;
          } else {
            equation = equation + `${this.rCons}`;
          }
        } else if (this.rCons < 0) {
          equation = equation + `${this.rCons}`;
        }
      } else {
        if (this.rCoef == 0) {
          equation += this.rCons;
        }
      }

      return equation;
    }
    return "not an equation";
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

  addConsSides(numberToAdd) {
    this.lCons += numberToAdd;
    this.rCons += numberToAdd;
  }

  addCoefSides(numberToAdd) {
    this.lCoef += numberToAdd;
    this.rCoef += numberToAdd;
  }

  multSides(numberToMult) {
    this.lCoef *= numberToMult;
    this.lCons *= numberToMult;
    this.rCoef *= numberToMult;
    this.rCons *= numberToMult;
  }

  resolve() {
    let minimumStepsForSolving = [];

    // begin: ax + b = cx + d
    if (this.rCoef != 0) {
      minimumStepsForSolving.push([-this.rCoef, "coef"]);
      this.addCoefSides(-this.rCoef);
    }
    // now in ax + b = d

    if (this.lCoef != 1) {
      minimumStepsForSolving.push([1 / this.lCoef, "coef"]);
      this.multSides(1 / this.lCoef);
    } // now in x + b = d

    if (this.lCons != 0) {
      minimumStepsForSolving.push([-this.lCons, "add"]);
      this.addConsSides(-this.lCons);
    }
    // now in x = d

    return {
      minimumStepsForSolving,
      finalEquation: this.getEquation(),
    };
  }
}

export default Equation;
