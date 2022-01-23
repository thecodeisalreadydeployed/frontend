const buildScriptParametersPlaceholder = {
  outputDirectory: "{{.WorkingDirectory}}",
  installCommand: "{{.InstallCommand}}",
  buildCommand: "{{.BuildCommand}}",
  startCommand: "{{.StartCommand}}",
};

export const useParseBuildScript = (
  buildScript: string | undefined = "",
  parameters: typeof buildScriptParametersPlaceholder
): { parsedBuildScript: string } => {
  let parsedBuildScript = buildScript;

  const parametersArray = Object.keys(parameters) as Array<
    keyof typeof buildScriptParametersPlaceholder
  >;

  parametersArray.map((parameter) => {
    parsedBuildScript = parsedBuildScript.replaceAll(
      buildScriptParametersPlaceholder[parameter],
      parameters[parameter] === ""
        ? buildScriptParametersPlaceholder[parameter]
        : parameters[parameter]
    );
  });

  return {
    parsedBuildScript,
  };
};
