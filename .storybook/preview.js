import "styles/globals.css";
import { SWRConfig } from "swr";
import * as NextImage from "next/image";

const OriginalNextImage = NextImage.default;

Object.defineProperty(NextImage, "default", {
  configurable: true,
  value: (props) => <OriginalNextImage {...props} unoptimized />,
});

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

export const decorators = [
  (Story) => (
    <SWRConfig
      value={{
        fetcher: (resource, init) =>
          fetch(resource, init).then((res) => res.json()),
      }}
    >
      <Story />
    </SWRConfig>
  ),
];
