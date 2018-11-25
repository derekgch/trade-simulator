
// import { tsvParse } from  "d3-dsv";
import { timeParse } from "d3-time-format";

// function parseData(parse) {
// 	return function(d) {
// 		d.date = parse(d.date);
// 		d.open = +d.open;
// 		d.high = +d.high;
// 		d.low = +d.low;
// 		d.close = +d.close;
// 		d.volume = +d.volume;

// 		return d;
// 	};
// }

const parseDate = timeParse("%Y-%m-%d");

export function parseData(data){
    // let result = [];
    // data.forEach(e => {
    //     // let date = parseDate(e.date)
    //     // console.log(date)
    //     result.push({...e, "date":parseDate(e.date)})
    // });

    // console.log(result)
    return data.map( e=> {return {...e, "date":parseDate(e.date)}});
}

export function getData() {
	const promiseMSFT = fetch(`https://api.iextrading.com/1.0/stock/aapl/chart/6m`)
        .then(response => response.json())
        // .then(data => console.log(typeof(data)))
		.then(data => data.map( e=> {return {...e, date:parseDate(e.date)}}) )
	return promiseMSFT;
}