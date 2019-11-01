import axios from 'axios';

let aotu = axios.create({
    baseURL: 'http://10.3.133.66:1907/'
})
export async function get(url = "", params = {}) {
    let data = await aotu.get(url, params)
    return data
}

export async function post(url = "", params = {}) {
    let data = await aotu.post(url, params)
    return data
}

export default {
    get,
    post
}