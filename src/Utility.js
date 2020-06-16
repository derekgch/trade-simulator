
// import { tsvParse } from  "d3-dsv";
import { timeParse } from "d3-time-format";


const parseDate = timeParse("%Y-%m-%d");

export function parseData(data){
    return data.map( e=> {return {...e, "date":parseDate(e.date)}});
}