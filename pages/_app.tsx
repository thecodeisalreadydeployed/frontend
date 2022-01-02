import { SWRConfigValue } from "utils/swr-fetcher";

import "styles/globals.css";

const MyApp = ({ Component, pageProps }: AppPropsWithLayout): JSX.Element => {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <SWRConfigValue>{getLayout(<Component {...pageProps} />)}</SWRConfigValue>
  );
};

export default MyApp;
