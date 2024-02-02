import "@/styles/globals.css";
import type { AppProps } from "next/app";
import firebaseConfig from "./firebase.config"
import { store } from '../redux/store'
import { Provider } from 'react-redux'
import RootLayout from "@/components/rootLayout";


export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="font-boady">
      <Provider store={store}>
        <RootLayout>
          <Component {...pageProps} {...firebaseConfig} />
        </RootLayout>
      </Provider>

    </div>
  )
}
