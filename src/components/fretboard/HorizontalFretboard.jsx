import React from "react";
import { makeStyles } from "@mui/styles";
import { scale, tuningsName } from "../../utils/constants";

const useStyles = makeStyles((theme) => ({
  fretBoard: {
    color: "#fff",
    position: "relative",
    height: 250,
    display: "flex",
    flexDirection: "row-reverse",
  },
  fret: {
    width: 72,
    borderRight: "4px solid #e19955",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    position: "relative",
    boxSizing: "borderBox",
  },
  fretNumber: {
    position: "absolute",
    top: -70,
    left: "calc(50%)",
    textAlign: "center",
    fontSize: "1.5rem",
  },
  string: {
    height: 2,
    width: "calc(100% + 4px)",
    backgroundColor: "black",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
  },
  finger: {
    position: "relative",
    top: -12,
    cursor: "pointer",
    display: "block",
    width: 24,
    minHeight: 24,
    borderRadius: 12,
    backgroundColor: "#fff",
    color: "#000",
    fontSize: 12,
    lineHeight: "24px",
    verticalAlign: "middle",
    textAlign: "center",
  },
  selectedFinger: {
    width: 32,
    minHeight: 32,
    lineHeight: "32px",
    fontSize: 20,
    color: "#fff",
    backgroundColor: "#4382bc",
    top: -18,
  },
  bar: {
    height: "calc(100% + 16px)",
    borderRadius: 8,
    backgroundColor: "#fff",
    width: 16,
    position: "absolute",
    left: "50%",
    zIndex: 9,
    top: -8,
  },
  hide: {
    display: "none",
  },
}));

const baseIndex = [4, 9, 2, 7, 11, 4];

const HorizontalFretboard = ({ keyScale, unSelectedNote, showNumbers }) => {
  const classes = useStyles();
  let width = 1800;
  const frets = new Array(19).fill(0).map((item, index) => {
    let fretWidth = (width / 17.817).toFixed(2);
    width -= fretWidth;
    return {
      id: index + 1,
      name: index + 1,
      strings: [0, 0, 0, 0, 0, 0],
      width: fretWidth,
    };
  });
  const stringWidth = [4, 3.5, 3, 3, 2, 1.5];
  return (
    <div className={classes.fretBoard}>
      <div className={classes.fret}>
        {tuningsName.map((note, index) => (
          <p
            className={`${classes.finger} ${
              keyScale.includes(note.toLocaleUpperCase())
                ? classes.selectedFinger
                : ""
            }`}
            style={{ position: "static", margin: "-12px 12px" }}
            key={note}
          >
            {showNumbers
              ? keyScale.findIndex(
                  (item) => item === note.toLocaleUpperCase()
                ) + 1
              : note}
          </p>
        ))}
      </div>
      {frets.map((fret, id) => (
        <div
          className={classes.fret}
          key={fret.id}
          style={{ width: fret.width + "px" }}
        >
          {/* {selectedChordData?.positions?.[slider]?.barres[0] === fret.id && (
            <div className={classes.bar}></div>
          )} */}
          <span className={classes.fretNumber}>{fret.id}</span>
          {fret.strings.map((_, index) => (
            <div
              key={index}
              className={classes.string}
              style={{
                height: stringWidth[index],
              }}
            >
              <span
                className={`${classes.finger} ${
                  keyScale.includes(scale[(baseIndex[index] + fret.id) % 12])
                    ? classes.selectedFinger
                    : unSelectedNote
                    ? ""
                    : classes.hide
                }`}
              >
                {showNumbers
                  ? keyScale.findIndex(
                      (item) =>
                        item === scale[(baseIndex[index] + fret.id) % 12]
                    ) + 1
                  : scale[(baseIndex[index] + fret.id) % 12]}
              </span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default HorizontalFretboard;
