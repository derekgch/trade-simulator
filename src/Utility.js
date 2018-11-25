
// import { tsvParse } from  "d3-dsv";
import { timeParse } from "d3-time-format";


const parseDate = timeParse("%Y-%m-%d");

export function parseData(data){
    return data.map( e=> {return {...e, "date":parseDate(e.date)}});
}

// export function getData() {
// 	const promiseQuote = fetch(`https://api.iextrading.com/1.0/stock/aapl/chart/6m`)
//         .then(response => response.json())
//         // .then(data => console.log(typeof(data)))
// 		.then(data => data.map( e=> {return {...e, date:parseDate(e.date)}}) )
// 	return promiseQuote;
// }