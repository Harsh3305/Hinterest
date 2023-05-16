import styles from "@/styles/Login.module.css"
import Image from "next/image";
import Typewriter from "typewriter-effect";
import {AiFillGithub, AiFillGoogleCircle} from "react-icons/ai";
import { Client, Account, ID } from "appwrite";

export default function Login({projectId}) {
    const client = new Client()
        .setEndpoint('https://cloud.appwrite.io/v1')
        .setProject(projectId);
    const account = new Account(client);
    account.get().then(console.log)
        .catch(console.error)
    return <div className={styles.main}>
        <div>
            <Image
                src={"/login.svg"}
                alt={"Login Image"}
                width={800}
                height={800}
            />
        </div>
        <hr className={styles.divider}/>
        <div className={styles.loginContainer}>
            <div className={styles.title}>
                <Typewriter
                    options={{
                        strings: "Login or Signup with your account",
                        autoStart: true,
                        loop: false
                    }}
                />
            </div>
            <div className={styles.loginButtonContainer}>
                <button className={styles.loginButton} onClick={()=> {
                    account.createOAuth2Session('github');
                }}>
                    <AiFillGithub/>
                    <div className={styles.loginButtonTitle}>
                        Login with GitHub
                    </div>
                </button>
                <button className={styles.loginButton} onClick={()=> {
                    account.createOAuth2Session('google');
                }}>
                    <AiFillGoogleCircle/>
                    <div className={styles.loginButtonTitle}>
                        Login with Google
                    </div>
                </button>
            </div>
        </div>
    </div>
}
export async function getStaticProps(context) {
    return {
        props: {
            projectId: process.env.PROJECT_ID
        }
    }
}