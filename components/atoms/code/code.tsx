import React, { useCallback, useRef } from "react";

import clsx from "clsx";
import Highlight, { defaultProps, Language, Prism } from "prism-react-renderer";
import { useEditable } from "use-editable";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(typeof global !== "undefined" ? global : window).Prism = Prism as any;
require("prismjs/components/prism-docker");

type AdditionalLanguage = "docker";

interface CodeProps {
  language: Language | AdditionalLanguage;
  code: string;
  onChangeCode?: (code: string) => void;
}

export const Code = (props: CodeProps): JSX.Element => {
  const { code, language, onChangeCode = () => null } = props;

  const editorRef = useRef(null);

  const onEditableChange = useCallback(
    (code) => {
      onChangeCode(code.slice(0, -1));
    },
    [onChangeCode]
  );

  useEditable(editorRef, onEditableChange, { disabled: false });

  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <Highlight {...defaultProps} code={code} language={language as any}>
      {({ className, getTokenProps, tokens }) => (
        <pre
          ref={editorRef}
          className={clsx(
            "overflow-scroll p-4 font-roboto-mono text-sm !whitespace-pre bg-zinc-900 rounded-lg outline-none",
            className
          )}
        >
          {tokens.map((line, i) => (
            <React.Fragment key={i}>
              {line
                .filter((token) => !token.empty)
                .map((token, key) => (
                  <span
                    key={key}
                    {...getTokenProps({
                      token,
                      key,
                    })}
                  />
                ))}
              {`\n`}
            </React.Fragment>
          ))}
        </pre>
      )}
    </Highlight>
  );
};
