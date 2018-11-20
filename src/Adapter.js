const backendUrl="http://localhost:4000/"



    // let config={
    //         method: 'POST', 
    //         headers: {
    //             'Content-Type': 'application/JSON',
    //             'Data-Type': 'application/JSON'
    //         },
    //         body: JSON.stringify({message: {real_name: "Test", message:"OK..sds.." }})
    //     };


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


export function fetchStockQuote(symbol){
    const url = backendUrl+"api/stock/"+symbol
        
    return fetch(url).then(r => r.json())
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
            body: JSON.stringify(trade)
        };

    return fetch(url, config).then(r => r.json())
    
}