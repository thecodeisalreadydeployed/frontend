import Head from "next/head";

import { Auth, SessionProvider, SWRConfigContext } from "contexts";

import "styles/globals.css";

const MyApp = (props: CustomAppProps): JSX.Element => {
  const { Component, pageProps } = props;

  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <>
      <Head>
        <title>CodeDeploy</title>
      </Head>
      <SessionProvider>
        <Auth hasAuth={Component.auth ?? true}>
          <SWRConfigContext>
            {getLayout(<Component {...pageProps} />)}
          </SWRConfigContext>
        </Auth>
      </SessionProvider>
    </>
  );
};

export default MyApp;
