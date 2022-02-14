import type { NextPage } from "next";
import type { AppProps } from "next/app";

declare global {
  type CustomNextPage = NextPage & {
    getLayout?: (page: React.ReactElement) => React.ReactNode;
    auth?: boolean;
  };

  type CustomAppProps = AppProps & {
    Component: CustomNextPage;
  };
}
