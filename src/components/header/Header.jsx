import { makeStyles } from "@mui/styles";
import React from "react";
import { NavLink } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: 48,
    padding: 12,
    boxSizing: "border-box",
    position: "fixed",
    top: 0,
    left: 0,
    display: "flex",
    borderBottom: "1px solid #2f3234",
  },
  navItem: {
    color: "#fff",
    listStyleType: "none",
    cursor: "pointer",
    margin: "0 16px",
    textDecoration: "none",
  },
}));
const Header = () => {
  const classes = useStyles();
  return (
    <ul className={classes.root}>
      {["Chords", "Tabs"].map((nav) => (
        <NavLink className={classes.navItem} to={nav}>
          {nav}
        </NavLink>
      ))}
    </ul>
  );
};

export default Header;
