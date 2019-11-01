import axios from 'axios';

let Nsg = axios.create({
    baseURL:'https://www.nanshig.com/mobile/index.php'
})

export async function get(params,config={}){
    let {data} = await Nsg.get('',{
        ...config,
        params
    });
    return data;
}

export async function post(params,config={}){
    let {data} = await Nsg.post('',params,config);
    return data;
}

export default {
    get,
    post
}