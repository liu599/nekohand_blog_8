import request from "umi-request";
const queryString = require('query-string');

const _errorHandler = (error) => {
    const codeMap = {
        '10001': "歌词服务器没有找到匹配的歌词",
        // ....
    };
    let code = '10001';
    if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        // console.log(error.response.status);
        // console.log(error.response.headers);
        // code = error.data.split(" ")[1].substr(0, 5);
        console.log(error.data, code);
        // console.log(error.request);
        // console.log(codeMap[error.data.status])
        // console.log(codeMap[code])
    } else {
        // The request was made but no response was received or error occurs when setting up the request.
        console.log(error.message);
    }


    // throw error; // If throw. The error will continue to be thrown.
    return Promise.resolve({
        data: {
            lrc: `[00:00.00]${codeMap[code]}`,
        }
    })
};

export async function FetchSources(url, option) {
    console.log(option, "fetchSources");
    // TODO: follow umi-request to write an uniform wrapper
    let data = option.data || {};
    let params = data;
    const requestType = option.requestType || "FORM";
    const method = option.method.toUpperCase() || "GET";
    if (method === "POST") {
         params = {};
         data = queryString.stringify(data);
    }
    return request(url, {
        requestType,
        method,
        errorHandler: option.errorHandler || _errorHandler,
        params: params,
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        },
        body: data,
    })
}
