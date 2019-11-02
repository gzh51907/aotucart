export const GET_ID = "GET_ID"

function getId(id){
    return {
        type:GET_ID,
        payload:id
    }
}



export default {
    getId
}