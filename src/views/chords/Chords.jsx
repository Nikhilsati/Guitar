import React, { useContext } from "react";
import ChordSelector from "../../components/chordSelector/ChordSelector";
import Fretboard from "../../components/fretboard/Fretboard";
import Switch from "../../components/switch/Switch";
import { AppContext } from "../../context/AppContext";

const Chords = () => {
  const {
    state,
    toggleLeftHandedMode,
    addToFavourites,
    handleChordChange,
    compareChords,
  } = useContext(AppContext);
  const { leftHandMode, favouriteChords, chord } = state;
  const isFavChord = Boolean(
    favouriteChords.find((item) => compareChords(item, chord))
  );
  return (
    <>
      <div style={{ position: "absolute", top: 20, left: 20 }}>
        <h4 style={{ color: "#fff" }}>Left Handed Mode</h4>
        <Switch
          id="left-hand-mode"
          isOn={leftHandMode}
          handleToggle={toggleLeftHandedMode}
        />
      </div>
      <div
        style={{
          position: "absolute",
          top: 20,
          right: 20,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <h4 style={{ color: "#fff" }}>Add to favourites</h4>
        <span
          style={{
            fontSize: 48,
            cursor: "pointer",
            userSelect: "none",
            textAlign: "center",
          }}
          onClick={() => addToFavourites(chord)}
        >
          {isFavChord ? "❤️" : "🤍"}
        </span>
      </div>
      <div
        style={{
          width: 250,
          height: 400,
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
          border: "2px solid #fff",
        }}
      >
        {favouriteChords.map((item) => (
          <div
            style={{
              width: 60,
              height: 60,
              padding: 12,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxSizing: "border-box",
              border: "1px solid #fff",
              color: "#fff",
              backgroundColor: compareChords(item, chord)
                ? "#4382bc"
                : "transparent",
            }}
            onClick={() => handleChordChange(item)}
          >
            {item.note + " " + item.type}
          </div>
        ))}
      </div>
      <Fretboard isLeftHandMode={leftHandMode} />
      <ChordSelector />
    </>
  );
};

export default Chords;
