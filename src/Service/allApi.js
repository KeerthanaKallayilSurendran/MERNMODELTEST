import commonApi from "./commonApi"
import SERVER_URL from "./serverUrl"

export const registerAPI = async (reqBody) => {
    return await commonApi("POST", `${SERVER_URL}/register`, reqBody)
}

export const loginAPI = async (reqBody) => {
    return await commonApi("POST", `${SERVER_URL}/login`, reqBody)
}

export const addMainTask = async (reqBody, reqHeader) => {
    return await commonApi("POST", `${SERVER_URL}/addTask`, reqBody, reqHeader)
}