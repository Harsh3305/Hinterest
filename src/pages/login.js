import styles from "@/styles/Login.module.css"
import Image from "next/image";
import Typewriter from "typewriter-effect";
import {AiFillGithub, AiFillGoogleCircle} from "react-icons/ai";

export default function Login({hostname, account, protocol}) {
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
                        `${protocol}${hostname}/`,
                        `${protocol}${hostname}/login`
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
                        `${protocol}${hostname}/`,
                        `${protocol}${hostname}/login`
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
    const protocol = "http://";
    return {
        props: {
            protocol: protocol,
            hostname: process.env.VERCEL_URL
        }
    }
}