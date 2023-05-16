import {Account, Client} from "appwrite";

function getAccount() {
    const projectId = "64625a797d840e38d4af";
    const endpoint = "https://cloud.appwrite.io/v1";
    const client = new Client()
        .setEndpoint(endpoint)
        .setProject(projectId);
    return new Account(client);
}
export {
    getAccount
}