import React from 'react';
import * as style from '../css/main.css';
const HomeComponent = () => {
    let { x, y, ...z } = { x: 1, y: 2, a: 3, b: 4 };
    console.log(x); // 1
    console.log(y); // 2
    console.log(z); // { a: 3, b: 4 }
    const promise = new Promise((resolve,reject)=>{
        console.log("promise");
        resolve(1);
    });
    const sym = Symbol();
    console.log("symbol:"+sym.toString());

    return <div>
        <h2>Hello React16.7.0!</h2>
        <div className={style.hello}>Hello CSS Module!</div>
    </div>
};
export default HomeComponent;