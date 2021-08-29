type ButtonSize = "small" | "medium" | "large";

interface ButtonProps {
  text: string;
  size: ButtonSize;
  Prefix?: (props: React.ComponentProps<"svg">) => JSX.Element;
  Suffix?: (props: React.ComponentProps<"svg">) => JSX.Element;
}

const variant = (size: ButtonSize) => {
  let tw_buttonHeight = "";

  switch (size) {
    case "small":
      tw_buttonHeight = "h-8";
      break;
    case "medium":
      tw_buttonHeight = "h-10";
      break;
    case "large":
      tw_buttonHeight = "h-12";
      break;
  }

  return {
    buttonHeight: tw_buttonHeight,
  };
};

const Button = (props: ButtonProps) => {
  const { text, size, Suffix, Prefix } = props;

  const { buttonHeight } = variant(size);

  return (
    <button
      className={`flex items-center px-3 text-primary-background hover:text-primary bg-primary hover:bg-primary-background rounded border border-primary active:bg-primary-accent-2 ${buttonHeight}`}
    >
      {Prefix && <Prefix className="mr-2" />}
      {text}
      {Suffix && <Suffix className="ml-2" />}
    </button>
  );
};

export { Button };
