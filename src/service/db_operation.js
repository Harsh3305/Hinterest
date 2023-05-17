import {Account, Client} from "appwrite";

function getClient(jwt) {
    const projectId = "64625a797d840e38d4af";
    const endpoint = "https://cloud.appwrite.io/v1";
    const client = new Client()
        .setEndpoint(endpoint)
        .setProject(projectId)
    if (jwt) {
        client.setJWT(jwt);
    }
    return client
}

function getAccount() {
    const client = getClient();
    return new Account(client);
}
export {
    getClient,
    getAccount
}