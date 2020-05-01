import React from "react";

const PaletteFooter = (props) => {
  const { paletteName, emoji } = props;
  return (
    <div className="Palette-footer">
      {paletteName}
      <span className="emoji">{emoji}</span>
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

export default PaletteFooter;
