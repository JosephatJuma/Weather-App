import React from "react";

function useChangeTheme() {
  const [theme, setTheme] = React.useState("dark");
  return { theme, setTheme };
}

export default useChangeTheme;
