import React from "react";
import { withStyles } from "@material-ui/styles";
import styles from "./styles/PaletteFooterStyles";

const PaletteFooter = (props) => {
  const { paletteName, emoji, classes } = props;
  return (
    <div className={classes.PaletteFooter}>
      {paletteName}
      <span className={classes.emoji}>{emoji}</span>
    </div>
  );
};

// Other way to declare Stateless Function Component:

// function PaletteFooter(props) {
//     const { paletteName, emoji } = props;
//     return (
//       <div className="Palette-footer">
//         {paletteName}
//         <span className="emoji">{emoji}</span>
//       </div>
//     );
//   };

export default withStyles(styles)(PaletteFooter);
