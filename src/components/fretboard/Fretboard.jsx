import React, { useContext, useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';
import data from '../../data.json';
import { AppContext } from '../../context/AppContext';
import Slider from '../slider/Slider';

const useStyles = makeStyles((theme) => ({
  fretBoard: {
    width: 250,
    color: '#fff',
    position: 'relative',
  },
  fret: {
    height: 72,
    borderBottom: '4px solid #e19955',
    display: 'flex',
    justifyContent: 'space-between',
    position: 'relative',
  },
  fretNumber: {
    position: 'absolute',
    left: -50,
    top: 24,
  },
  string: {
    width: 2,
    height: 'calc(100% + 4px)',
    backgroundColor: 'black',
    display: 'flex',
    alignItems: 'center',
  },
  finger: {
    position: 'relative',
    left: -10,
    cursor: 'pointer',
  },
  bar: {
    height: 16,
    borderRadius: 8,
    backgroundColor: '#fff',
    width: 'calc(100% + 16px)',
    position: 'absolute',
    top: 31,
    zIndex: 9,
    left: -8,
  },
}));

const mapChordToDataKey = {
  A: 'A',
  'A♭': 'Ab',
  B: 'B',
  'B♭': 'Bb',
  C: 'C',
  'C#': 'Csharp',
  D: 'D',
  E: 'E',
  'E♭': 'Eb',
  F: 'F',
  'F#': 'Fsharp',
  G: 'G',
};

const mapTypeSuffix = {
  Maj: 'major',
  Min: 'minor',
  Dim: 'dim',
};

const getChordData = (chord) => {
  return data.chords[mapChordToDataKey[chord.note]]?.find((item) => {
    let suffix = (mapTypeSuffix[chord.type] || chord.type) + chord.suffix;
    console.log({ suffix });
    return item.suffix === suffix;
  });
};

const Fretboard = ({ isLeftHandMode }) => {
  const classes = useStyles();
  const { state } = useContext(AppContext);
  const { chord } = state;
  const [selectedChordData, setSelectedChordData] = useState({});
  const [slider, setSlider] = useState(0);

  const handleForward = () => {
    slider < selectedChordData?.positions?.length - 1 && setSlider(slider + 1);
  };
  const handleBack = () => {
    slider > 0 && setSlider(slider - 1);
  };

  useEffect(() => {
    setSelectedChordData(getChordData(chord));
    setSlider(0);
  }, [chord]);
  const tuningsName = ['E', 'A', 'D', 'G', 'B', 'e'];
  const stringWidth = [4, 3.5, 3, 3, 2, 1.5];
  const frets = [
    {
      id: 1,
      name: 1,
      strings: [0, 0, 0, 0, 0, 0],
    },
    {
      id: 2,
      name: 2,
      strings: [0, 0, 0, 0, 0, 0],
    },
    {
      id: 3,
      name: 3,
      strings: [0, 0, 0, 0, 0, 0],
    },
    {
      id: 4,
      name: 4,
      strings: [0, 0, 0, 0, 0, 0],
    },
    {
      id: 5,
      name: 5,
      strings: [0, 0, 0, 0, 0, 0],
    },
  ];
  return (
    <div className={classes.fretBoard}>
      <Slider
        onForward={handleForward}
        onBack={handleBack}
        activeSlider={slider}
        total={selectedChordData?.positions?.length}
      />
      <div className={classes.fret}>
        {(isLeftHandMode ? [...tuningsName].reverse() : tuningsName).map(
          (note) => (
            <p key={note}>{note}</p>
          )
        )}
      </div>
      {frets.map((fret) => (
        <div className={classes.fret} key={fret.id}>
          {selectedChordData?.positions?.[slider]?.barres[0] === fret.id && (
            <div className={classes.bar}></div>
          )}
          <span className={classes.fretNumber}>
            {fret.id -
              1 +
              (selectedChordData?.positions?.[slider].baseFret ?? 1)}
          </span>
          {fret.strings.map((_, index) => (
            <div
              key={index}
              className={classes.string}
              style={{
                width: isLeftHandMode
                  ? [...stringWidth].reverse()[index]
                  : stringWidth[index],
              }}
            >
              <span className={classes.finger}>
                {(isLeftHandMode
                  ? [...selectedChordData?.positions?.[slider].frets].reverse()
                  : selectedChordData?.positions?.[slider].frets)?.[index] ===
                  fret.id && fret.id > 0
                  ? '⚪'
                  : ''}
              </span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Fretboard;
