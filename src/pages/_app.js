import '@/styles/globals.css'
import {getAccount} from "@/service/db_operation";
import Header from "@/component/header";

export default function App({ Component, pageProps }) {
  const account = getAccount();
  return <div>
    <Header {...pageProps} account={account} />
    <Component {...pageProps} account={account} />
  </div>
}
