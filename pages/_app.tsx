import { SessionProvider } from "next-auth/react";

import { Auth, SWRConfigContext } from "contexts";

import "styles/globals.css";

const MyApp = ({
  Component,
  pageProps: { session, ...pageProps },
}: CustomAppProps): JSX.Element => {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <SessionProvider session={session}>
      {Component.auth === false ? ( // Make require authentication as default
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
  );
};

export default MyApp;
