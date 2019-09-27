import React, { Component } from "react";
import * as style from "../css/main.scss";
import { map, filter } from "lodash-es";
import $ from "jquery";

class HomeComponent extends Component {
  render() {
    const sum = (a, b) => a + b;
    console.log("💩");
    filter([1, 2, 3], function(item) {
      console.log(item + 1);
    });
    console.log(`2 + 3 = ${sum(2, 3)}`);
    map([1, 2, 3], x => {
      console.log(x);
    });
    let { x, y, ...z } = { x: 1, y: 2, a: 3, b: 4 };
    console.log(x); // 1
    console.log(y); // 2
    console.log(z); // { a: 3, b: 4 }
    const arr = Array.from(new Set([1, 2, 3, 2, 1]));
    const arr2 = [1, [2, 3], [4, [5]]].flat(2);
    console.log(arr2);
    const promise = new Promise((resolve, reject) => {
      console.log("promise");
      resolve(1);
    });
    const sym = Symbol();
    console.log("symbol:" + sym.toString());
    console.log($(".block"));

    const { value, onIncreaseClick } = this.props;

    return (
      <div>
        <h2 className={style.myfont}>Hello React16.7.0!</h2>
        <div className={style.hello}>Hello CSS Module!</div>
        <div className={style.myblurfont}>Blur Font Test</div>
        <div className={style.flexContent}>
          <div className={style.block}>block1</div>
          <div className={style.block}>block2</div>
          <div className={style.block}>block3</div>
          <div className={style.block}>block4</div>
        </div>
        <div>
          <span>{value}</span>
          <button onClick={onIncreaseClick}>Increase</button>
        </div>
        <div className={style.css3features}>
          <div className={style.img1}>png</div>
          <div className={style.img2}>jpg</div>
          <div className={style.img3}>jpeg</div>
        </div>
        <div className={style.para}>
          A peep at some distant orb has power to raise and purify our thoughts
          like a strain of sacred music, or a noble picture, or a passage from
          the grander poets. It always does one good.A peep at some distant orb
          has power to raise and purify our thoughts like a strain of sacred
          music, or a noble picture, or a passage from the grander poets. It
          always does one good.A peep at some distant orb has power to raise and
          purify our thoughts like a strain of sacred music, or a noble picture,
          or a passage from the grander poets. It always does one good.A peep at
          some distant orb has power to raise and purify our thoughts like a
          strain of sacred music, or a noble picture, or a passage from the
          grander poets. It always does one good.A peep at some distant orb has
          power to raise and purify our thoughts like a strain of sacred music,
          or a noble picture, or a passage from the grander poets. It always
          does one good.
        </div>
      </div>
    );
  }
}
export default HomeComponent;
