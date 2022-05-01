import { makeStyles } from '@mui/styles';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  slidersContainer: {
    width: '100%',
    position: 'absolute',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    bottom: '-20%',
  },
  sliderButton: {
    width: 60,
    height: 60,
    backgroundColor: '#2f3234',
    borderRadius: '50%',
    cursor: 'pointer',
    userSelect: 'none',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    width: 16,
    height: 16,
    backgroundColor: 'rgb(47 50 52)',
    borderRadius: '50%',
    cursor: 'pointer',
  },
}));

const Slider = ({ onForward, onBack, activeSlider, total = 0 }) => {
  const classes = useStyles();
  const dots = new Array(total).fill(1);
  return (
    <div className={classes.slidersContainer}>
      <div className={classes.sliderButton} onClick={onBack}>
        {'<'}
      </div>
      {dots.map((_, i) => (
        <div
          className={classes.dot}
          style={{
            backgroundColor: activeSlider === i ? '#fff' : 'rgb(47 50 52)',
          }}
        />
      ))}

      <div className={classes.sliderButton} onClick={onForward}>
        {'>'}
      </div>
    </div>
  );
};

export default Slider;
