import { createContext, useState } from 'react';

export const AppContext = createContext(null);

const AppContextProvider = ({ children }) => {
  const [state, setState] = useState({
    leftHandMode: false,
    chord: { note: 'C', type: 'major', suffix: '' },
    favouriteChords: [
      { note: 'C', type: 'major', suffix: '' },
      { note: 'E', type: 'major', suffix: '' },
    ],
  });

  const compareChords = (chordA, chordB) => {
    return (
      chordA.note === chordB.note &&
      chordA.type === chordB.type &&
      chordA.suffix === chordB.suffix
    );
  };

  const handleChordChange = (chord) => setState({ ...state, chord });
  const toggleLeftHandedMode = () =>
    setState({ ...state, leftHandMode: !state.leftHandMode });

  const addToFavourites = (chord) => {
    const index = state.favouriteChords.findIndex((item) =>
      compareChords(item, chord)
    );
    if (index === -1) {
      setState({
        ...state,
        favouriteChords: [chord, ...state.favouriteChords],
      });
    } else {
      setState({
        ...state,
        favouriteChords: state.favouriteChords.filter((item, i) => index !== i),
      });
    }
  };
  return (
    <AppContext.Provider
      value={{
        state,
        setState,
        toggleLeftHandedMode,
        addToFavourites,
        handleChordChange,
        compareChords,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
