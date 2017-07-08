export const hero = (options) => {
  return {
    type: 'hero',
    player: options.player,
    cost: 0,
    ready: true,
    pos: options.pos,
    moveDirs: ['adjacent'],
    imgUrl: options.imgUrl,
    info: options.info,
  }
};

export const pawn = (options) => {
  return {
    type: 'pawn',
    player: options.player,
    cost: 0,
    ready: true,
    pos: 'reserve',
    moveDirs: ['pawn'],
    imgUrl: options.imgUrl,
  }
};

export const bishop = (options) => {
  return {
    type: 'bishop',
    player: options.player,
    cost: 2,
    ready: true,
    pos: 'reserve',
    moveDirs: ['bishop'],
    imgUrl: options.imgUrl,
  }
};

export const rook = (options) => {
  return {
    type: 'rook',
    player: options.player,
    cost: 3,
    ready: true,
    pos: 'reserve',
    moveDirs: ['rook'],
    imgUrl: options.imgUrl,
  }
};

export const queen = (options) => {
  return {
    type: 'queen',
    player: options.player,
    cost: 6,
    ready: true,
    pos: 'reserve',
    moveDirs: ['queen'],
    imgUrl: options.imgUrl,
  }
};

export const node = (options) => {
  return {
    type: 'node',
    player: options.player,
    cost: 0,
    ready: true,
    pos: 'reserve',
    moveDirs: ['none'],
    imgUrl: options.imgUrl,
  }
};
