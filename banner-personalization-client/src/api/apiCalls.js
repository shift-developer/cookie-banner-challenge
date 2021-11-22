import axios from 'axios'

export const login = async ({email, password}) => {
    try {
        const base64Access = btoa(`${email}:${password}`)

        const requestOptions = {
            method: 'POST',
            headers: {Authorization: "Basic " + base64Access}
        };
        const response = await axios('/api/auth/login', requestOptions)
        return response.data
    } catch(e) {
        if(e.response.data) {
            throw new Error(e.response.data.message)
        }
        return Promise.reject(e)
    }
}

export const userInfo = async ({token}) => {
    try {
        const _token = token || localStorage.getItem('token')

        const requestOptions = {
            method: 'GET',
            headers: {Authorization: "Bearer " + _token}
        };
        const response = await axios('/api/auth', requestOptions)
        return response.data
    } catch (e) {
        if(e.response.data) {
            throw new Error(e.response.data.message)
        }
        return Promise.reject(e)
    }
}

export const register = async ({email, password, fullName}) => {
    try {
        const requestOptions = {
            method: 'POST',
            data: {email, password, fullName}
        };
        const response = await axios('/api/auth/register', requestOptions)
        return response.data 
    } catch (e) {
        if(e.response.data) {
            throw new Error(e.response.data.message)
        }
        return Promise.reject(e)
    }
}