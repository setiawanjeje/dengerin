import "../styles/globals.css";
import styles from "../styles/Base.module.css";
import Head from "next/head";
import { createStore, compose, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { initialState, reducer } from "../reducer/reducer";

const composeEnhancers =
  (typeof window !== "undefined" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const store = createStore(
  reducer,
  initialState,
  composeEnhancers(applyMiddleware(thunk))
);

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
