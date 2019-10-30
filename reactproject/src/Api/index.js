import axios from 'axios';

let aotu = axios.create({
    baseURL:'https://10.3.133.66/'
})

export async function get(params,config={}){
    let {data} = await aotu.get('',{
        ...config,
        params
    });
    return data;
}

export async function post(params,config={}){
    let {data} = await aotu.post('',params,config);
    return data;
}

export default {
    get,
    post
}