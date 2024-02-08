import "@/styles/globals.css";
import type { AppProps } from "next/app";
import firebaseConfig from "./firebase.config"
import { store } from '../redux/store'
import { Provider } from 'react-redux'
import RootLayout from "@/components/rootLayout";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useRouter } from "next/router";


export default function App({ Component, pageProps }: AppProps) {

  const router = useRouter();

  return (
    <Provider store={store}>
      <div className="font-boady bg-gray-300">
        {router.pathname === `/signIn` || router.pathname === "/registration"? (
          <Component {...pageProps} {...firebaseConfig} />
        ) : (
          <RootLayout>
            <Component {...pageProps} {...firebaseConfig} />
          </RootLayout>
        )}
      </div>
    </Provider>

  )
}
