import { Component, VERSION } from "@angular/core";

const MAX_ARRAY_CAPACITY = 2000;

const getStart = (x, y) => Math.min(x, y);
const getDiff = (x, y) => Math.abs(x - y);
const getArrLen = (s, e, p) => 1 + getDiff(s, e) / p;

const createArray = (start, end, step, f: (v, k) => any) => {
  let len = Math.min(getArrLen(start, end, step), MAX_ARRAY_CAPACITY);
  len == MAX_ARRAY_CAPACITY
    ? alert(`max array length: ${MAX_ARRAY_CAPACITY}`)
    : null;
  return Array.from({ length: len }, (v, k) =>
    f(step * k + getStart(start, end), k)
  );
};

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  name = "Angular " + VERSION.major;

  checkObj = {
    coefficient: 1,
    getFuncFromUser: "Math.pow(x, 2) - 20",
    start: -10,
    end: 10,
    step: 1,
  };

  getFuncFromUser = "Math.pow(x, 2) - 20";
  coefficient = 1;

  start = -10;
  end = 10;
  step = 1;
  scale = 1;
  spacing = 5;
  infinity = true;
  show_lines = true;

  private _max = Infinity;
  set max(v) {
    this._max = this.infinity ? Infinity : v;
  }
  get max() {
    return this.infinity ? Infinity : this._max;
  }

  disableSubmit = () =>
    this.checkObj.getFuncFromUser == this.getFuncFromUser &&
    this.checkObj.coefficient == this.coefficient &&
    this.checkObj.start == this.start &&
    this.checkObj.end == this.end &&
    this.checkObj.step == this.step;

  submit = () => {
    this.checkObj = {
      getFuncFromUser: this.getFuncFromUser,
      coefficient: this.coefficient,
      start: this.start,
      end: this.end,
      step: this.step,
    };

    try {
      eval(this.getFuncFromUser);
    } catch (e) {
      if (e instanceof SyntaxError) {
        alert(e.message);
        return;
      }
    }

    this.graph = this.initFunc();
  };

  cleanFunc = (x) => this.scale * Math.min(x, this.max);

  initFunc = () =>
    createArray(this.start, this.end, this.step, (v, k) => {
      let f_x = eval(this.getFuncFromUser.replace(/x/gi, v));
      return {
        x: v,
        f_x: f_x,
        h: Math.abs(f_x),
        r: f_x < 0 ? "180" : "0",
      };
    });

  graph: any[] = this.initFunc();
}