import React, { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import CircularChordSelector from './CircularChordSelector';

const ChordSelector = () => {
  const { state, handleChordChange } = useContext(AppContext);

  return (
    <div>
      <CircularChordSelector
        onChange={handleChordChange}
        initialKey={state.chord}
      />
    </div>
  );
};

export default ChordSelector;
