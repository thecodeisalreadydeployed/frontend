import { SWRConfigContext } from "utils/swr-fetcher";

import "styles/globals.css";

const MyApp = ({ Component, pageProps }: AppPropsWithLayout): JSX.Element => {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <SWRConfigContext>
      {getLayout(<Component {...pageProps} />)}
    </SWRConfigContext>
  );
};

export default MyApp;
