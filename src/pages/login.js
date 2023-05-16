import styles from "@/styles/Login.module.css"
import Image from "next/image";
import Typewriter from "typewriter-effect";
import {AiFillGithub, AiFillGoogleCircle} from "react-icons/ai";
import { Client, Account, ID } from "appwrite";

export default function Login({hostname, projectId}) {
    console.log(`hostname: ${hostname}`);
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
                    account.createOAuth2Session(
                        'github',
                        `${hostname}/`,
                        `${hostname}/login`
                    );
                }}>
                    <AiFillGithub/>
                    <hr className={styles.innerDivider}/>
                    <div className={styles.loginButtonTitle}>
                        Login with GitHub
                    </div>
                </button>
                <button className={styles.loginButton} onClick={()=> {
                    account.createOAuth2Session(
                        'google',
                        `${hostname}/`,
                        `${hostname}/login`
                    );
                }}>
                    <AiFillGoogleCircle/>
                    <hr className={styles.innerDivider}/>
                    <div className={styles.loginButtonTitle}>
                        Login with Google
                    </div>
                </button>
            </div>
        </div>
    </div>
}
export async function getStaticProps() {
    return {
        props: {
            hostname: process.env.VERCEL_URL,
            projectId: process.env.PROJECT_ID
        }
    }
}