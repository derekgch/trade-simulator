// const backendUrl="http://localhost:4000/"
const backendUrl="https://ttp-fs-20180728-backend.herokuapp.com/"


// https://ttp-fs-20180728-backend.herokuapp.com

//batch quotes
//http://localhost:4000/api/batch/intc,fb
//batch prices

export function handleErrors(response) {
    // console.log(response)
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response.json();
}


export function postUser(user){
    const url = backendUrl+"users";
    let config={
        method: 'POST', 
        headers: {
            'Content-Type': 'application/JSON',
            'Data-Type': 'application/JSON'
        },
        body: JSON.stringify(user)
    };
    return fetch(url,config).then(r => r.json())
}

export function postSessions(user){
    const url = backendUrl+"sessions";
    let config={
        method: 'POST', 
        headers: {
            'Content-Type': 'application/JSON',
            'Data-Type': 'application/JSON'
        },
        body: JSON.stringify(user)
    };
    return fetch(url,config)
}

export function fetchUserInfo(token, userID){
    const url = backendUrl+"/users/"+userID
    let config={
            method: 'GET', 
            headers: {
                'Authorization': token,
                'Content-Type': 'application/JSON',
                'Data-Type': 'application/JSON'
            },
        };
    return fetch(url, config)
}

export function fetchUserHistory(token, userID, page){
    const url = backendUrl+"/trades/"+userID +"?page=" +page
    let config={
            method: 'GET', 
            headers: {
                'Authorization': token,
                'Content-Type': 'application/JSON',
                'Data-Type': 'application/JSON',
            },
        };
    return fetch(url, config)
}

export function fetchStockPrice(symbols){
    const url = backendUrl+"api/price/"+symbols
        
    return fetch(url)
}

export function fetchStockQuote(symbol){
    const url = backendUrl+"api/stock/"+symbol       
    return fetch(url)
}

export function fetchBatchQuote(symbols){
    const url = backendUrl+"api/batch/"+symbols      
    return fetch(url)
}

export function sendTrade(trade, userID, token){
    const url = backendUrl+"/trades/"+userID
    let config={
            method: 'POST', 
            headers: {
                'Authorization': token,
                'Content-Type': 'application/JSON',
                'Data-Type': 'application/JSON'
            },
            body: JSON.stringify({trade})
        };

    return fetch(url, config)
}

export function getStock6m(symbol){
    const url= `https://api.iextrading.com/1.0/stock/${symbol}/chart/6m`;
    return fetch(url);

}

export function getFocus(){
    const url ='https://api.iextrading.com/1.0/stock/market/list/infocus';
    return fetch(url);
}   

export function getSymbols(){
    const url = 'https://api.iextrading.com/1.0/ref-data/symbols'
    return fetch(url);
}