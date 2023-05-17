async function fetchData(path, body, header, method, isJson) {
    if (path.charAt(path.length - 1) == `/`) {
        path = path.slice(0, path.length - 1);
    }
    path = path.replace("/?", "?");

    try {
        const configs = {
            method: method,
            headers: header,
        };
        if (method != "GET") {
            configs["body"] = JSON.stringify(body);
        }
        const result = await fetch(path, configs);

        if (isJson) {
            const data = {
                data: await result.json(),
                status: result.status
            }
            return data;
        }
        else {
            const data = {
                data: await result.text(),
                status: result.status
            }
            return data;
        }
    }
    catch (error) {
        const data = {
            data: error,
            status: 500
        }
        return data
    }
}
async function getRequest(path, token, isJson) {
    return await fetchData(
        path,
        {},
        generate_header(token, false),
        "GET",
        isJson
    )
}
async function postRequest(path, body, token, isJson) {
    const result = await fetchData(path, body, generate_header(token, true), "POST", isJson);
    return result
}
async function putRequest(path, body, token, isJson) {
    const result = await fetchData(path, body, generate_header(token, true), "PUT", isJson);
    return result
}
async function deleteRequest(path, body, token, isJson) {
    const result = await fetchData(path, body, generate_header(token, false), "DELETE", isJson);
    return result
}
function generate_header(token, isJson) {
    const header = {authentication: `bearer:${token}`};
    if (isJson) {
        header["Content-Type"] = "application/json"
    }
    return header;
}
export { getRequest, postRequest, putRequest, deleteRequest }