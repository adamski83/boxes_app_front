import { CSSProperties, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { darkPalette } from "src/Theme/palette";

export const Loader = () => {
  const [color, setColor] = useState("#ffffff");
  const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "#56753a",
    backgroundImage: `linear-gradient(90deg, ${darkPalette.secondary.main} 40%, ${darkPalette.primary.light} 50%, ${darkPalette.secondary.dark} 100%)`,
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
