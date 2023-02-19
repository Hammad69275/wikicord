import axios from 'axios';

const BASE_URL = `YOUR_API_URL`

async function fetch(options){
    return new Promise((resolve,reject) => {
        options.headers = {
            "content-type":"text/plain",
            ...options?.headers
        }
        axios(options)
        .then(res => resolve(res) )
        .catch(res => resolve(res.response))
    })
}

async function Register(username,email,password){
    let registerReq = await fetch({
        method:"post",
        url:`${BASE_URL}/api/v1/auth/register`,
        data:{
            username,email,password
        },      
    })
    return {
        status:registerReq.status,
        ...registerReq.data
    }

}

async function Login(email,password){
    let loginReq = await fetch({
        method:"post",
        url:`${BASE_URL}/api/v1/auth/login`,
        data:{
            email,password
        },      
    })
    return {
        status:loginReq.status,
        ...loginReq.data
    }
}
async function Verify(otp){
    let verify = await fetch({
        method:"get",
        url:`${BASE_URL}/api/v1/auth/verify?otp=${otp}`
    })
    return {
        status:verify.status,
        ...verify.data
    }

}
async function getUserDetails(token){
    let userReq = await fetch({
        method:"get",
        url:`${BASE_URL}/api/v1/me`,
        headers:{
            "Authorization":token
        }
    })
    return {
        status:userReq.status,
        ...userReq.data
    }
}
async function getWikiList(token){
    let wikiList = await fetch({
        method:"get",
        url:`${BASE_URL}/api/v1/wiki/all`,
        headers:{
            "Authorization":token
        }
    })
    return {
        status:wikiList.status,
        ...wikiList.data
    }

}
async function getOwnWiki(token,id){
    let mywiki = await fetch({
        method:"get",
        url:`${BASE_URL}/api/v1/wiki/${id}`,
        headers:{
            "Authorization":token
        }
    })
    return {
        status:mywiki.status,
        ...mywiki.data
    }

}

async function changePfp(token,file){
    const data = new FormData()
    data.append("pfp",file,file.name)
    let result = await fetch({
        method:"PATCH",
        url:`${BASE_URL}/api/v1/me/pfp`,
        data:data,
        headers:{
            "Authorization":token
        }
    })
    return {
        status:result.status,
        ...result.data
    }
}

async function patchWiki(token,id,data,action){
    let result = await fetch({
        method:action,
        url:`${BASE_URL}/api/v1/wiki/${id}`,
        data:data,
        headers:{
            "Authorization":token
        }
    })
    return {
        status:result.status,
        ...result.data
    }
}

async function getWiki(token,id,password){
    let options = {
        method:"GET",
        url:`${BASE_URL}/api/v1/wiki/${id}?password=${password}`,
        headers:{
            "Authorization":token
        }
    }
    let result = await fetch(options)
    return {
        status:result.status,
        ...result.data
    }
}
async function getUsers(token){
    let options = {
        method:"GET",
        url:`${BASE_URL}/api/v1/users/all`,
        headers:{
            "Authorization":token
        }
    }
    let result = await fetch(options)
    return {
        status:result.status,
        ...result.data
    }
}

export { Register,Login,Verify,getUserDetails,getWikiList, getOwnWiki , changePfp , patchWiki,getWiki,getUsers }