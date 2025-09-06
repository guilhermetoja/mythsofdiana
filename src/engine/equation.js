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

  addSides(numberToAdd) {
    this.lCons += numberToAdd;
    this.rCons += numberToAdd;
  }

  multSides(numberToMult) {
    this.lCoef *= numberToMult;
    this.lCons *= numberToMult;
    this.rCoef *= numberToMult;
    this.rCons *= numberToMult;
  }

  resolve() {
    while (this.isEquationSolved() == false) {
      console.log("oi");
    }
  }
}

let equationOne = new Equation(1, 0, 3, 4);

export default Equation;
