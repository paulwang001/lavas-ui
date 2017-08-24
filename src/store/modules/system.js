/**
 * Created by Paul Wang on 2017/8/19.
 */
import * as sysTypes from '../system-mutation-types';
import axios from 'axios';
const state = {
   applications:[
     {
       "code":"system",
       "name":"系统管理",
        "home":"/system"
     }
   ]
       
};

const actions = {

};

let mutations = {

}

export default {
    namespaced: true,
    actions,
    mutations,
    state,
    modules: {
        branch: {
            namespaced: true,
            state: {
                types: [],
                branch: {}
            },
            actions: {
                
                async getBranchTypes({commit}){
                    let res = await axios({
                        method:'get',
                        url: '/api/system/branch/types.json',
                        responseType: 'json'
                    });
                    if(res.status===200){
                        commit(sysTypes.GET_BRANCH_TYPES,{types:res.data.items});
                    }
                },
                async getBranchList({commit},{type}){
                    let res = await axios({
                        method:'get',
                        url: '/api/system/branch/list.json?type='+type,
                        responseType: 'json'
                    });
                    console.log('branch type----',type);
                    if(res.status===200){
                        commit(sysTypes.GET_BRANCH_LIST,{branch:res.data});
                    }
                }

            },
            mutations: {
                
               [sysTypes.GET_BRANCH_TYPES](state,{types}){
                   state.types=types;
               },  
               [sysTypes.GET_BRANCH_LIST](state,{branch}){
                   state.branch=branch;
               }
            }
        },
        app: {

        }
    }
}
