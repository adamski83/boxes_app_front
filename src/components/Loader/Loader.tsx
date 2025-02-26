import { CSSProperties, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { darkPalette } from "src/Theme/palette";

export const Loader = () => {
  const [color, setColor] = useState(darkPalette.primary.main);
  const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "#56753a",
    backgroundImage: `linear-gradient(90deg, ${darkPalette.custom.success}40%, ${darkPalette.primary.light} 50%, ${darkPalette.custom.warning} 100%)`,
  };

  return (
    <ClipLoader
      color={color}
      cssOverride={override}
      size={150}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  );
};
