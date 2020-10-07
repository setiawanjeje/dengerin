import "../styles/globals.css";
import styles from "../styles/Base.module.css";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.main}>
        <Component {...pageProps} />
      </div>
    </div>
  );
}

export default MyApp;
