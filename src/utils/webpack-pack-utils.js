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
		/**
		 * 下面输出格式为{"about/about":".src/aobout/index.js"}
		 * 这样目的是为了将js打包到对应的文件夹下
		 */
		entry[`${item}/${item}`] = `${path}/${item}/index.js`;
	});
	return entry;
};


function createHtml(page_path){
    let htmlArr = [];
	getPath(page_path).map((item)=>{
		let infoJson ={},infoData={};
		try{
			// 读取pageinfo.json文件内容，如果在页面目录下没有找到pageinfo.json 捕获异常
			infoJson = fs.readFileSync(`${page_path}/${item}/pageinfo.json`,"utf-8");//
			infoData = JSON.parse(infoJson);
		}catch(err){
			infoData = {};
		}
		htmlArr.push(new HtmlWebpackPlugin({
			title:infoData.title ? infoData.title : "webpack,react多页面架构",
			meta:{
				keywords: infoData.keywords ? infoData.keywords : "webpack，react，github",
				description:infoData.description ? infoData.description : "这是一个webpack，react多页面架构"
			},
			chunks:[`${item}/${item}`], //引入的js
			template: "./src/index.html",
			filename : item == "index" ? "index.html" : `${item}/index.html`, //html位置
			minify:{//压缩html
				collapseWhitespace: true,
				preserveLineBreaks: true
			},
		}));
	});
	return htmlArr;
}

//todo. add purifiy for each page.


module.exports = {
    generateHtmlPages: createHtml,
    getEntry: getEntry
};