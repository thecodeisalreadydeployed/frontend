import { SWRConfigContext } from "contexts";

import "styles/globals.css";

const MyApp = ({ Component, pageProps }: CustomAppProps): JSX.Element => {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <SWRConfigContext>
      {getLayout(<Component {...pageProps} />)}
    </SWRConfigContext>
  );
};

export default MyApp;
