import { makeStyles } from "@mui/styles";
import React from "react";

const useStyles = makeStyles((theme) => ({
  checkbox: {
    height: 0,
    width: 0,
    visibility: "hidden",
    "&:checked + $label span": {
      left: "calc(100% - 2px)",
      transform: "translateX(-100%)",
    },
  },

  label: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    cursor: "pointer",
    width: 100,
    height: 50,
    background: "grey",
    borderRadius: 100,
    position: "relative",
    transition: "background-color .2s",
    "& span": {
      content: "",
      position: "absolute",
      top: 2,
      left: 2,
      width: 45,
      height: 45,
      borderRadius: 45,
      transition: "0.2s",
      background: "#fff",
      boxShadow: " 0 0 2px 0 rgba(10, 10, 10, 0.29)",
    },
    "&:active span": {
      width: 60,
    },
  },
}));

const Switch = ({
  id,
  isOn,
  handleToggle,
  onColor = "#4382bc",
  ...otherProps
}) => {
  const classes = useStyles();
  return (
    <div {...otherProps}>
      <input
        checked={isOn}
        onChange={handleToggle}
        className={classes.checkbox}
        type="checkbox"
        id={id}
      />
      <label
        htmlFor={id}
        style={{ background: isOn && onColor }}
        className={classes.label}
      >
        <span className={classes["$label $button"]} />
      </label>
    </div>
  );
};

export default Switch;
