let base_url = 'http://localhost:8080';
let cookie = null;

export const httpPost = function httpPost(url, data) {
    
    url = base_url + url;
    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data) || {},
    }).then(res => res.json()).then(
        (result) => {
            return result && result.responseData || null;
        }).catch(e => {
            return e;
        });
};


export const httpGet = function httpGet(url) {
    url = base_url + url;
    return fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    }).then(res => res.json()).then(
        (result) => {
            return result && result.responseData || null;;
        }).catch(e => {
            return e;
        });
};
 