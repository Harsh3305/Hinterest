import styles from "@/styles/component/Header.module.css";
import Link from "next/link";
import {useEffect, useState} from "react";
import {AiOutlineLogin, AiOutlineLogout} from "react-icons/ai";
import {toast} from "react-toastify";

export default function Header({account}) {
    const [token, setToken] = useState("");
    const [refresh, setRefresh] = useState(true);
    account.createJWT()
        .then((result)=> {
            setToken(result.jwt)
        })
        .catch((_)=>{
            setToken("")
        })
        .finally(()=>{
            setRefresh(false)
        })

    console.log(token)
    return <div className={styles.main}>
        <div className={styles.leftContainer}>
            <Link href={"/"}>
                Hinterest
            </Link>
        </div>
        <div className={styles.centerContainer}>
            <input
                placeholder={"Search Photos(Not Implemented)"}
                className={styles.searchBar}
            />
        </div>
        <div className={styles.rightContainer}>
            {
                token === "" ?
                    <div className={styles.button_container}>
                        <div className={styles.button_container}>
                            <Link href={"/login"} className={styles.header_button}>
                                <AiOutlineLogin/>
                                <div>
                                    Login
                                </div>
                            </Link>
                        </div>
                    </div> :
                    <div className={styles.button_container}>
                        <div
                            className={styles.header_button}
                            onClick={()=> {
                                account
                                    .deleteSession("current")
                                    .finally(()=>{
                                        toast(
                                            'Logout Successfully',
                                            { hideProgressBar: false,
                                                autoClose: 2000,
                                                type: 'success'
                                            }
                                        );
                                        setRefresh(true)
                                    })
                            }}
                        >
                            <AiOutlineLogout/>
                            <div>
                                Logout
                            </div>
                        </div>
                    </div>
            }
        </div>
    </div>
}