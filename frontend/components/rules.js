import React, {Component} from 'react';

export default class Rules extends Component {
  render() {
    return (
      <div style={{fontFamily:"Cambria Math"}}>
        <h1>The Rules of HexChess:</h1>

        <h3>How to Win:</h3>
        <div>Capture the enemy hero or capture three enemy power nodes</div>

        <h3>Game Zones:</h3>
        <div>
          Each player begins the game with their hero piece on the board and the rest of their pieces in their <strong>Reserve</strong>.  Captured pieces are removed from the board.  The Command Panel on the left side of the screen shows you whose turn it is, how many actions your have left, and how much energy you have left to use this turn.
        </div>

        <h3>How to Play:</h3>
        <div>
          Each turn, you get TWO actions.  For each action, you can either <strong>DEPLOY</strong> a piece from your Reserve, or you can <strong>MOVE</strong> a piece on the board. You may not move the same piece twice in a turn, or move a piece you just deployed, but otherwise you may do these actions in any combination you like (move two pieces, deploy two pieces, move then deploy, etc.).

          (note: Player 1 only gets one action on their first turn to negate the advantage of moving first)
        </div>

        <h3>Movement:</h3>
        <div>
          Each type of piece moves in a unique way, except power nodes, which cannot move.  Unless otherwise noted, a piece can capture any enemy piece by moving to its hex.
          <ul style={{listStyle:'disc', margin:'10px'}}>
            <li style={{listStyle:'disc', margin:'5px'}}>
              <strong>Heroes</strong> can move one hex in any direction.
            </li>
            <li style={{listStyle:'disc', margin:'5px'}}>
              <strong>Queens</strong> may move any number of hexes in a straight line in any direction.
            </li>
            <li style={{listStyle:'disc', margin:'5px'}}>
              <strong>Rooks</strong> can move any number of hexes straight forward, back-left, or back-right (like an inverted Y shape)
            </li>
            <li style={{listStyle:'disc', margin:'5px'}}>
              <strong>Bishops</strong> can move any number of hexes in a straight line diagonally (like an X shape)
            </li>
            <li style={{listStyle:'disc', margin:'5px'}}>
              <strong>Pawns</strong> may move (but not capture!) one hex forward, and may capture (but not move!) one hex diagonally forward.
            </li>
            <li style={{listStyle:'disc', margin:'5px'}}>
              <strong>Power Nodes</strong> may not move.
            </li>
          </ul>
        </div>

        <h3>Deployment:</h3>
        <div>
          You can see what pieces are in your Reserve by clicking the 'Res' button on your Command Panel.  In order to deploy a piece, you must have enough ENERGY to deploy it (you get 1 energy for each Power Node you have on the board; your energy refreshes at the start of each turn).  You may deploy pieces to any hex adjacent to your hero.  The Reserve panel displays the energy cost of each piece in orange, as well as how many copies of that piece are still left in your Reserve in blue.  More powerful pieces cost more energy to deploy, so you will need to deploy Power Nodes in order to get your strongest pieces on the board!
        </div>

        <div>Good luck!</div>
      </div>
    )
  }
}
