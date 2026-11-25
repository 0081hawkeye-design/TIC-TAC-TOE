import React from "react";

// What info each square needs from App
interface BlockProps {
  value: "X" | "O" | null; // what is inside the square
  onClick: () => void; // what happens when clicked
  isWinning: boolean; // is this square part of the winning line?
  disabled: boolean; // block clicking (game over / computer thinking)
  label: string; // text for screen readers
}

const Block: React.FC<BlockProps> = ({ value, onClick, isWinning, disabled, label }) => {
  // build the css class names: filled -> X or O, winning -> glow
  const classes = `block ${value ? `filled ${value}` : ""} ${isWinning ? "win" : ""}`;

  return (
    <button className={classes} onClick={onClick} disabled={disabled} aria-label={label}>
      {/* show the X or O only if the square has something */}
      {value && <span className="mark">{value}</span>}
    </button>
  );
};

export default Block;
