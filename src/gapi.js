const apiRequest = ({url, method, body = {}, headers}) => {
    const reqMeta = {
        method,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-Application-Key': GAPI_PUBLIC_KEY,
            ...headers
        }
    }
    if (method !== 'GET') {
        reqMeta.body = JSON.stringify(body)
    }
    return fetch(new Request(GAPI_BASE_URL + url, reqMeta))
}

export const API = {
    get: (params) => apiRequest({method: 'GET', ...params}),
    post: (params) => apiRequest({method: 'POST', ...params}),
    patch: (params) => apiRequest({method: 'PATCH', ...params}),
    delete: (params) => apiRequest({method: 'DELETE', ...params})
}
