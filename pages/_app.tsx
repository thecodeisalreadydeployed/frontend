import Head from "next/head";

import { Auth, SessionProvider, SWRConfigContext } from "contexts";

import "styles/globals.css";

const MyApp = ({ Component, pageProps }: CustomAppProps): JSX.Element => {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <>
      <Head>
        <title>CodeDeploy</title>
      </Head>
      <SessionProvider>
        {Component.auth === false ? (
          <SWRConfigContext>
            {getLayout(<Component {...pageProps} />)}
          </SWRConfigContext>
        ) : (
          <Auth>
            <SWRConfigContext>
              {getLayout(<Component {...pageProps} />)}
            </SWRConfigContext>
          </Auth>
        )}
      </SessionProvider>
    </>
  );
};

export default MyApp;
