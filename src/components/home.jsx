import React from 'react';
import * as style from '../css/main.scss';
const HomeComponent = () => {
    let { x, y, ...z } = { x: 1, y: 2, a: 3, b: 4 };
    console.log(x); // 1
    console.log(y); // 2
    console.log(z); // { a: 3, b: 4 }
    const arr = Array.from(new Set([1, 2, 3, 2, 1]));
    const arr2 = [1, [2, 3], [4, [5]]].flat(2);
    console.log(arr2);
    const promise = new Promise((resolve,reject)=>{
        console.log("promise");
        resolve(1);
    });
    const sym = Symbol();
    console.log("symbol:"+sym.toString());

    return <div>
        <h2>Hello React16.7.0!</h2>
        <div className={style.hello}>Hello CSS Module!</div>
        <div className={style.flexContent}>
            <div className={style.block}>block1</div>
            <div className={style.block}>block2</div>
            <div className={style.block}>block3</div>
            <div className={style.block}>block4</div>
        </div>
        <div className={style.css3features}>
            <div className={style.cssblock}>css block1</div>
            <div className={style.cssblock}>css block2</div>
            <div className={style.cssblock}>css block3</div>
        </div>
    </div>
};
export default HomeComponent;