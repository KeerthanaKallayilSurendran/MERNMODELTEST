import commonApi from "./commonApi"
import SERVER_URL from "./serverUrl"

export const registerAPI = async (reqBody) => {
    return await commonApi("POST", `${SERVER_URL}/register`, reqBody)
}

export const loginAPI = async (reqBody) => {
    return await commonApi("POST", `${SERVER_URL}/login`, reqBody)
}

export const addMainTask = async (reqBody, reqHeader) => {
    console.log(reqBody);
    console.log(reqHeader);

    return await commonApi("POST", `${SERVER_URL}/addTask`, reqBody, reqHeader)
}

export const userTaskAPI = async (reqHeader) => {
    return await commonApi("GET", `${SERVER_URL}/viewMainTask`, {}, reqHeader)
}

export const taskUpdateAPI = async (id, reqBody, reqHeader) => {
    return await commonApi("PUT", `${SERVER_URL}/task/${id}/edit`, reqBody, reqHeader)
}

export const deleteTaskAPI = async (id, reqHeader) => {
    return await commonApi("DELETE", `${SERVER_URL}/task/${id}/delete`, {}, reqHeader)
}