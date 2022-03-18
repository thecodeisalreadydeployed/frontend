import "styles/globals.css";
// import { SWRConfigContext } from "contexts/swr-fetcher";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

// export const decorators = [
//   (Story) => (
//     // <SWRConfigContext>
//     <Story />
//     // </SWRConfigContext>
//   ),
// ];
