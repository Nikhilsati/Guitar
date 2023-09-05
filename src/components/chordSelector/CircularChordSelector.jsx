import React, { useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 600,
    height: 600,
    background: '#242628',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    backgroundColor: '#2f3234',
    borderRadius: '50%',
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  key: {
    fontSize: 16,
    padding: 8,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
    background: 'white',
    borderRadius: '50%',
    zIndex: 6,
    WebkitUserSelect: 'none',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#d4d4d4',
    },
  },
  selectedKey: {
    color: '#fff',
    backgroundColor: '#4382bc',
    '&:hover': {
      backgroundColor: '#387ab6',
    },
  },
  selected: {
    fontSize: 24,
    color: '#fff',
  },
}));

const calculatePosition = (
  current,
  total = 12,
  radius = 50,
  size = 56 / 2
) => ({
  left: `calc(${
    (
      radius -
      radius * Math.cos(-0.5 * Math.PI - 2 * (1 / total) * current * Math.PI)
    ).toFixed(2) + '%'
  } - ${size}px)`,
  top: `calc(${
    (
      radius +
      radius * Math.sin(-0.5 * Math.PI - 2 * (1 / total) * current * Math.PI)
    ).toFixed(2) + '%'
  } - ${size}px)`,
});

const initialDimension = 500;

const generateDimension = (percentage) => ({
  width: `${(initialDimension * percentage) / 100}px`,
  height: `${(initialDimension * percentage) / 100}px`,
});

const majorScale = [
  'C',
  'G',
  'D',
  'A',
  'E',
  'B',
  'F#',
  'C#',
  'A♭',
  'E♭',
  'B♭',
  'F',
];
const relativeMinor = [
  'A',
  'E',
  'B',
  'F#',
  'C#',
  'A♭',
  'E♭',
  'B♭',
  'F',
  'C',
  'G',
  'D',
];

const types = [
  'major',
  'minor',
  'dim',
  'dim7',
  'sus2',
  'sus4',
  '7sus4',
  'alt',
  'aug',
  'add9',
  'madd9',
];
const suffixes = [
  '5',
  '6',
  // '69',
  '7',
  // '7b5',
  // 'aug7',
  '9',
  // '9b5',
  // 'aug9',
  // '7b9',
  // '7#9',
  '11',
  '9#11',
  '13',
  // 'maj7',
  // 'maj7b5',
  // 'maj7#5',
  // 'maj9',
  // 'maj11',
  // 'maj13',
  // 'm6',
  // 'm69',
  // 'm7',
  // 'm7b5',
  // 'm9',
  // 'm11',
  // 'mmaj7',
  // 'mmaj7b5',
  // 'mmaj9',
  // 'mmaj11',
  // 'add9',
  // 'madd9',
  '/E',
  '/F',
  '/F#',
  '/G',
  '/G#',
  '/A',
  '/Bb',
  '/B',
  '/C',
  '/C#',
  // 'm/B',
  // 'm/C',
  // 'm/C#',
  '/D',
  // 'm/D',
  '/D#',
  // 'm/D#',
  // 'm/E',
  // 'm/F',
  // 'm/F#',
  // 'm/G',
  // 'm/G#',
];
const KeySelector = ({
  onChange,
  initialKey,
  renderChordName = (selected) =>
    `${selected.note} ${selected.type}${selected.suffix}`,
}) => {
  const classes = useStyles();
  const [selected, setSelected] = useState(
    initialKey || {
      note: '-',
      type: '',
      suffix: '',
    }
  );

  useEffect(() => {
    if (
      initialKey &&
      (initialKey.note !== selected.note || initialKey.type !== selected.type)
    )
      setSelected(initialKey);
  }, [initialKey]);

  useEffect(() => {
    if (onChange) onChange(selected);
  }, [selected]);

  const handleSelect = (key, value) => () =>
    selected[key] === value
      ? setSelected({ ...selected, [key]: '' })
      : setSelected({ ...selected, [key]: value });

  return (
    <div className={classes.root}>
      <div
        className={classes.circle}
        style={{ ...generateDimension(125), backgroundColor: '#2f3234' }}
      >
        <div className={classes.circle} style={{ ...generateDimension(105) }}>
          {suffixes.map((key, i) => (
            <span
              key={key}
              className={`${classes.key} ${
                selected.suffix === key ? classes.selectedKey : ''
              }`}
              onClick={handleSelect('suffix', key)}
              style={{
                position: 'absolute',
                ...calculatePosition(i, suffixes.length),
              }}
            >
              {key}
            </span>
          ))}
          <div
            className={classes.circle}
            style={{
              ...generateDimension(90),
              backgroundColor: '#2f3234',
              border: '2px solid #242628',
            }}
          >
            <div
              className={classes.circle}
              style={{ ...generateDimension(75) }}
            >
              {majorScale.map((key, i) => (
                <span
                  key={key}
                  className={`${classes.key} ${
                    selected.note === key ? classes.selectedKey : ''
                  }`}
                  onClick={handleSelect('note', key)}
                  style={{
                    position: 'absolute',
                    ...calculatePosition(i),
                  }}
                >
                  {key}
                </span>
              ))}
              <div
                className={classes.circle}
                style={{
                  ...generateDimension(60),
                  border: '2px solid #242628',
                }}
              >
                <div
                  className={classes.circle}
                  style={{ ...generateDimension(45) }}
                >
                  {types.map((key, i) => (
                    <span
                      key={key}
                      className={`${classes.key} ${
                        selected.type === key ? classes.selectedKey : ''
                      }`}
                      style={{
                        position: 'absolute',
                        ...calculatePosition(i, 11),
                      }}
                      onClick={handleSelect('type', key)}
                    >
                      {key}
                    </span>
                  ))}
                  <div
                    className={classes.circle}
                    style={{
                      width: 150,
                      height: 150,
                      backgroundColor: '#242628',
                    }}
                  >
                    <span className={classes.selected}>
                      {renderChordName(selected)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KeySelector;
