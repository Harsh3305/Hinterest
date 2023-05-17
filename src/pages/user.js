import {Router} from "next/router";
import {useEffect, useState} from "react";
import {getAccount} from "@/service/db_operation";
import {getRequest} from "@/service/networking";

export default function User({account}) {
    const [jwt, setJwt] = useState(undefined);
    account.createJWT()
        .then(r => setJwt(r.jwt))
        .catch(_=>setJwt(undefined))

    if (jwt === undefined || jwt === null) {
        Router().push("/404")
    }
    const [user, setUser] = useState(undefined);
    function getUserDetails() {
        getRequest('/api/user', jwt, true)
            .then((result)=>{
                if (result.status === 200) {
                    setUser(result.data)
                }
                else {
                    setUser(undefined)
                }
            })
            .catch((_)=>{setUser(undefined)})
    }
    useEffect(getUserDetails, [jwt])
    return <div>
        {user.email}
    </div>
}