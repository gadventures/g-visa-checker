const {
    GAPI_PUBLIC_KEY,
    GAPI_BASE_URL
} = process.env

const apiRequest = ({url, method, body = {}, headers, ...opts}) => {
    const reqMeta = {
        method,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-Application-Key': opts.GAPI_PUBLIC_KEY || GAPI_PUBLIC_KEY,
            ...headers
        }
    }
    if (method !== 'GET') {
        reqMeta.body = JSON.stringify(body)
    }
    return fetch(new Request((opts.GAPI_BASE_URL || GAPI_BASE_URL) + url, reqMeta))
}

export const API = {
    get: (params) => apiRequest({method: 'GET', ...params}),
    post: (params) => apiRequest({method: 'POST', ...params}),
    patch: (params) => apiRequest({method: 'PATCH', ...params}),
    delete: (params) => apiRequest({method: 'DELETE', ...params})
}
