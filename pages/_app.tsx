import { SWRConfig } from "swr";

import "styles/globals.css";

const MyApp = ({ Component, pageProps }: AppPropsWithLayout): JSX.Element => {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <SWRConfig
      value={{
        fetcher: (resource, init) =>
          fetch(resource, init).then((res) => res.json()),
      }}
    >
      {getLayout(<Component {...pageProps} />)}
    </SWRConfig>
  );
};

export default MyApp;
