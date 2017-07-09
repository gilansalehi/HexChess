export const selectUser = (user) => {
    console.log("You clicked on user: ", user.first);
    return {
        type: 'USER_SELECTED',
        payload: user
    }
};

export const clickHex = (hex) => {
  console.log(`Hex ${hex.pos} was clicked`);
  return {
    type: 'HEX_CLICKED',
    payload: hex,
  }
}

export const setSelection = (hex) => {
  return {
    type: 'SET_SELECTION',
    payload: hex,
  }
}

export const clearSelection = () => {
  return {
    type: 'CLEAR_SELECTION',
    payload: false,
  }
}

export const movePiece = (selection, destination) => {
  return {
    type: 'MOVE_PIECE',
    payload: {
      player: selection.player,
      contents: selection.contents,
      start: selection.pos,
      end: destination.pos,
    },
  }
}

export const deployPiece = (selection, destination) => {
  return {
    type: 'DEPLOY_PIECE',
    payload: {
      player: selection.player,
      contents: selection.contents,
      start: selection.pos,
      end: destination.pos,
    },
  }
}

export const showReserve = () => {
  return {
    type: 'SHOW_RESERVE',
    payload: true,
  }
}

export const hideReserve = () => {
  return {
    type: 'HIDE_RESERVE',
    payload: true,
  }
}

export const toggleReserve = () => {
  return { type: 'TOGGLE_RESERVE' }
}

export const useEnergy = (cost) => {
  return {
    type: 'USE_ENERGY',
    payload: cost,
  }
}

export const resetEnergy = () => {
  return {
    type: 'RESET_ENERGY',
    payload: 0,
  }
}

export const incrementActions = () => {
  return { type: 'INCREMENT_ACTIONS' };
}

export const resetActions = () => {
  return { type: 'RESET_ACTIONS' };
}

export const passTurn = () => {
  return { type: 'SWITCH_PLAYER' };
}

export const readyAllPieces = () => {
  return { type: 'READY_ALL_PIECES' };
}

export const updateInfo = (obj) => {
  // const { image, text } = obj;
  return {
    type: 'UPDATE_INFO',
    payload: obj,
  };
}

export const declareWinner = (winner) => {
  return {
    type: 'GAME_OVER',
    payload: winner,
  };
}
