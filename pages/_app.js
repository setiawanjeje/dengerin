import "../styles/globals.css";
import styles from "../styles/Base.module.css";
import Head from "next/head";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { initialState, reducer } from "../reducer/reducer";

const store = createStore(reducer, initialState);

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <div className={styles.container}>
        <Head>
          <title>Create Next App</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <div className={styles.main}>
          <Component {...pageProps} />
        </div>
      </div>
    </Provider>
  );
}

export default MyApp;
