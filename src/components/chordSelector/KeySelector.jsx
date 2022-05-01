import React, { useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';
import { scale } from '../../utils/constants';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 244,
    height: 244,
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
    // fontSize: 16,
    padding: 8,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 24,
    height: 24,
    fontSize: 12,
    lineHeight: '24px',
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
  size = (24 + 16) / 2
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

const initialDimension = 400;

const generateDimension = (percentage) => ({
  width: `${(initialDimension * percentage) / 100}px`,
  height: `${(initialDimension * percentage) / 100}px`,
});

const KeySelector = ({
  onChange,
  initialKey,
  renderChordName = (selected) => `${selected.note} ${selected.type}`,
}) => {
  const classes = useStyles();
  const major = 'Maj';
  // const minor = 'Min';
  const [selected, setSelected] = useState(
    initialKey || {
      note: '-',
      type: '',
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

  const handleSelect =
    ({ note, type }) =>
    () => {
      setSelected({ note, type });
    };

  return (
    <div className={classes.root}>
      <div
        className={classes.circle}
        style={{ ...generateDimension(60), border: '2px solid #242628' }}
      >
        <div className={classes.circle} style={{ ...generateDimension(45) }}>
          {scale.map((key, i) => (
            <span
              key={key}
              className={`${classes.key} ${
                selected.note === key ? classes.selectedKey : ''
              }`}
              style={{
                position: 'absolute',
                ...calculatePosition(i),
              }}
              onClick={handleSelect({ note: key, type: major })}
            >
              {key}
            </span>
          ))}
          <div
            className={classes.circle}
            style={{ width: 120, height: 120, backgroundColor: '#242628' }}
          >
            <span className={classes.selected}>
              {renderChordName(selected)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KeySelector;
