import '@/styles/globals.css'
import {getAccount} from "@/service/db_operation";
import Header from "@/component/header";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function App({ Component, pageProps }) {
  const account = getAccount();
  return <div>
    <Header {...pageProps} account={account} />
    <Component {...pageProps} account={account} />
    <ToastContainer/>
  </div>
}
