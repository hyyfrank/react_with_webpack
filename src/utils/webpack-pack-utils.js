const fs = require("fs");
const HtmlWebpackPlugin = require("html-webpack-plugin");
//util function to do the multipage build
function getPath(path){
	let arr = [];
	let existpath = fs.existsSync(path); //是否存在目录
	if(existpath){
		let readdirSync = fs.readdirSync(path);  //获取目录下所有文件
		readdirSync.map((item)=>{
			let currentPath = path + "/" + item;
			let isDirector = fs.statSync(currentPath).isDirectory(); //判断是不是一个文件夹
			if(isDirector){ // component目录下为组件 需要排除
				arr.push(item);
			}
		});
		return arr;
	}
};

function getEntry(path){
	let entry = {};
    entry["babel-polyfill"] = "@babel/polyfill";
	getPath(path).map((item)=>{
		entry[`${item}/${item}`] = `${path}/${item}/index.js`;
	});
	return entry;
};


function createHtml(page_path){
    let htmlArr = [];
	getPath(page_path).map((item)=>{
		console.log("path item : "+ item)
		htmlArr.push(new HtmlWebpackPlugin({
			chunks:[`${item}/${item}`],
			template: "./src/index.html",
			filename : item == "index" ? "index.html" : `${item}/index.html`,
			minify:{
				collapseWhitespace: true,
				preserveLineBreaks: true
			},
		}));
	});
	return htmlArr;
}

module.exports = {
    generateHtmlPages: createHtml,
    getEntry: getEntry
};