import axios from "axios";
import "../css/longRent.css";
let aotu = axios.create({
<<<<<<< HEAD
  baseURL: "https://10.3.133.66/"
});

export async function get(params, config = {}) {
  let { data } = await aotu.get("", {
    ...config,
    params
  });
  return data;
}

export async function post(params, config = {}) {
  let { data } = await aotu.post("", params, config);
  return data;
}

export default {
  get,
  post
};
=======
    baseURL:'http://10.3.133.66:1907/'
})



export async function get(url="",params={}){
    let data = await aotu.get(url,params)
    return data
}

export async function post(url="",params={}){
    let data = await aotu.post(url,params)
    return data
}

export default {
    get,
    post,
}
>>>>>>> 731e119127224f499f442d7032b9e6054747df8b
