import React, { useCallback, useRef, useState } from "react";

import clsx from "clsx";
import { useOnClickOutside } from "hooks";
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
  editable?: boolean;
  onClick?: React.MouseEventHandler<HTMLPreElement>;
}

export const Code = (props: CodeProps): JSX.Element => {
  const {
    code,
    language,
    onChangeCode = () => null,
    editable = false,
    onClick = () => null,
  } = props;

  const editorRef = useRef<HTMLPreElement>(null);
  const [isEditable, setIsEditable] = useState(false);

  useOnClickOutside(editorRef, () => {
    setIsEditable(false);
  });

  const onEditableChange = useCallback(
    (code) => {
      onChangeCode(code.slice(0, -1));
    },
    [onChangeCode]
  );

  useEditable(editorRef, onEditableChange, {
    disabled: !isEditable,
  });

  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <Highlight {...defaultProps} code={code} language={language as any}>
      {({ className, getTokenProps, tokens }) => (
        <pre
          ref={editorRef}
          autoCapitalize="off"
          autoCorrect="off"
          className={clsx(
            "overflow-scroll !whitespace-pre rounded-lg bg-black p-4 font-mono text-sm outline-none",
            className,
            isEditable ? "ring-1 ring-zinc-500" : "cursor-pointer"
          )}
          spellCheck={false}
          onClick={(e) => {
            onClick(e);
            editable && setIsEditable(true);
          }}
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
