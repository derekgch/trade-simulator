const backendUrl="http://localhost:4000/"

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