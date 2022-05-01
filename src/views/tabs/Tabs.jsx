import React, { useState } from 'react';
import HorizontalFretboard from '../../components/fretboard/HorizontalFretboard';
import KeySelector from '../../components/chordSelector/KeySelector';
import { majorScale, minorScale, scale } from '../../utils/constants';
import Switch from '../../components/switch/Switch';

const getScale = (key) => {
  const baseIndex = scale.findIndex((note) => note === key.note);
  if (key.type === 'Maj')
    return majorScale.map((step, index) => scale[(baseIndex + step) % 12]);

  if (key.type === 'Min')
    return minorScale.map((step, index) => scale[(baseIndex + step) % 12]);
};
const Tabs = () => {
  const [selectedKey, setSelectedKey] = useState({
    note: 'C',
    type: 'Maj',
  });

  const [extraNotes, setExtraNotes] = useState(false);
  const [showNumbers, setShowNumbers] = useState(false);

  const handleExtraNotes = () => setExtraNotes(!extraNotes);
  const handleShowNumbers = () => setShowNumbers(!showNumbers);

  return (
    <div>
      <HorizontalFretboard
        keyScale={getScale(selectedKey)}
        unSelectedNote={extraNotes}
        showNumbers={showNumbers}
      />
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <KeySelector
          onChange={(key) => setSelectedKey(key)}
          initialKey={selectedKey}
        />
        <div>
          <h4 style={{ color: '#fff' }}>Hide extra notes</h4>
          <Switch
            id='extra-notes'
            isOn={!extraNotes}
            handleToggle={handleExtraNotes}
          />
        </div>
        <div>
          <h4 style={{ color: '#fff' }}>Show No's</h4>
          <Switch
            id='numbers'
            isOn={showNumbers}
            handleToggle={handleShowNumbers}
          />
        </div>
      </div>
    </div>
  );
};

export default Tabs;
