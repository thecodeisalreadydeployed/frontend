import React, { useEffect } from "react";

import clsx from "clsx";
import Prism from "prismjs";

import "prismjs/components/prism-docker";

type Language = "docker";

interface CodeProps {
  language: Language;
  code: React.ReactNode;
  hideScollbar?: boolean;
}

export const Code = (props: CodeProps): JSX.Element => {
  const { code, hideScollbar = true, language } = props;

  useEffect(() => {
    Prism.highlightAll();
  }, [code]);

  const prismLanguages = `language-${language}`;

  return (
    <pre className={clsx("rounded-lg", hideScollbar && "hide-scrollbar")}>
      <code className={clsx("font-roboto-mono text-sm", prismLanguages)}>
        {code}
      </code>
    </pre>
  );
};
