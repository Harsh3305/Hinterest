import {getClient} from "@/service/db_operation";
import {Account} from "appwrite";

export default async function handler(req, res) {
    switch (req.method) {
        case "GET":
            try {
                const jwt = req.headers.authentication.split(":")[1];
                const client = getClient(jwt);
                const account = new Account(client);
                const response = await account.get();
                res.status(200).json({
                    email: response.email,
                    name: response.name
                })
            }
            catch (_) {
                res.status(402).send("Not Authenticated")
            }
            break;
        default:
            res.status(404).send("Not Found")
    }

}
