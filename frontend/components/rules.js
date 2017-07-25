import React, {Component} from 'react';

export default class Rules extends Component {
  render() {
    return (
      <div style={{fontFamily:"Cambria Math"}} className='sixty-left center-pane'>
        <h1 className='header'>The Rules</h1>
        <p className='sub-header'>Learn to Play</p>

        <h3 className=''>How to Win:</h3>
        <div>
          Capture the enemy <strong className='text-yellow'>Hero</strong> or
          capture three enemy <strong className='text-yellow'>power nodes</strong>.
        </div>

        <h3 className=''>Game Zones:</h3>
        <div>
          Each player begins the game with their <strong className='text-yellow'>Hero</strong> piece on the board and the
          rest of their pieces in their <strong className='text-yellow'>Reserve</strong>.
          Captured pieces are removed from the board and sent to prison.
          The <strong className='text-yellow'>Command Panel</strong> on the left
          side of the screen shows whose turn it is, how many actions you have left,
          and how much <strong className='text-yellow'>energy</strong> you have left to use this turn.
        </div>

        <h3 className=''>How to Play:</h3>
        <div>
          Each turn, you get <strong className='text-yellow'>two</strong> actions.  For each action, you can
          either <strong className='text-yellow'>deploy</strong> a piece from
          your <strong className='text-yellow'>Reserve</strong>, or you can <strong className='text-yellow'>move</strong> a
          piece on the board. You may not move the same piece twice in a turn
          or move a piece you just deployed, but otherwise you may do these actions
          in any combination you like (move two pieces, deploy two pieces, move then deploy, etc.).
          <br />
          <br />
          Note: Player 1 only gets one action on their first turn to negate the advantage of moving first.
        </div>

        <h3 className=''>Movement:</h3>
        <div>
          Each type of piece moves in a unique way, except power nodes, which cannot move.
          Unless otherwise noted, a piece can capture any enemy piece by moving to its hex.
          <ul style={{listStyle:'disc', margin:'10px'}}>
            <li style={{listStyle:'disc', margin:'5px'}}>
              <strong className='text-yellow'>Heroes</strong> can move one hex in any direction.
            </li>
            <li style={{listStyle:'disc', margin:'5px'}}>
              <strong className='text-yellow'>Queens</strong> may move any number of hexes in a straight line in any direction.
            </li>
            <li style={{listStyle:'disc', margin:'5px'}}>
              <strong className='text-yellow'>Rooks</strong> can move any number of hexes straight forward, back-left, or back-right (like an inverted Y shape)
            </li>
            <li style={{listStyle:'disc', margin:'5px'}}>
              <strong className='text-yellow'>Bishops</strong> can move any number of hexes in a straight line diagonally (like an X shape)
            </li>
            <li style={{listStyle:'disc', margin:'5px'}}>
              <strong className='text-yellow'>Pawns</strong> may move (but not capture!) one hex forward, and may capture (but not move!) one hex diagonally forward.
            </li>
            <li style={{listStyle:'disc', margin:'5px'}}>
              <strong className='text-yellow'>Power Nodes</strong> may not move.
            </li>
          </ul>
        </div>

        <h3 className=''>Deployment:</h3>
        <div>
          You can see what pieces are in your <strong className='text-yellow'>Reserve</strong> by clicking the 'Res' button
          on your <strong className='text-yellow'>Command Panel</strong>.  In order to deploy a piece,
          you must have enough <strong className='text-yellow'>energy</strong> to
          deploy it (you get 1 energy for each Power Node you have on the board;
          your energy refreshes at the start of each turn).  You may deploy
          pieces to any hex adjacent to your <strong className='text-yellow'>Hero</strong>.  The Reserve panel displays
          the energy cost of each piece in orange, as well as how many copies
          of that piece are still left in your Reserve in yellow.  More powerful pieces
          cost more energy to deploy, so you will need to deploy power nodes in
          order to get your strongest pieces on the board!
        </div>
        <br></br>

        <h3 className=''>Strategy:</h3>
        <ul style={{listStyle: 'disc', margin:'10px'}}>
          <li style={{listStyle: 'disc', margin: '5px'}}>
            Because you start without any power nodes, you  will need to deploy them
            in your early turns.  Be careful to place them where your opponent will
            not easily be able to capture them (an enemy bishop that reaches your back
            rank can be a menace!).  You can also deploy pawns for no energy, which
            can be useful for defending your <strong className='text-yellow'>Hero</strong> and claiming space on the board.
          </li>
          <li style={{listStyle: 'disc', margin: '5px'}}>
            Be on the lookout for the safety of your <strong className='text-yellow'>Hero</strong> once your opponent starts
            deploying rooks and bishops!  Deploying a pawn to block the line of an
            enemy attack is a good way to defend your <strong className='text-yellow'>Hero</strong>.  Catch your opponent by
            surprise by using your <strong className='text-yellow'>Hero</strong> to capture a piece they thought was defended,
            then deploying a pawn to block the line of the defender to your <strong className='text-yellow'>Hero</strong>.
          </li>
          <li style={{listStyle: 'disc', margin: '5px'}}>
            The hexes around your <strong className='text-yellow'>Hero</strong> can get crowded quickly, and if they are all
            occupied you cannot deploy new pieces to the board.  Be sure to leave a
            bolt-hole for your <strong className='text-yellow'>Hero</strong> to escape from sticky situations.  Push into the
            center of the board to create space for your units and pressure your
            opponent.
          </li>
        </ul>
        <br></br>
        <div>Good luck!</div>
      </div>
    )
  }
}
