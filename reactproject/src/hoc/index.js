import React,{Component} from 'react';
import axios from 'axios';


export function test(InnerComponent){
    
    let user = {
        username:"zhouxioahui",
        password:'22222'
    }

    return function(){
        return <InnerComponent user={user}/>
    }

}