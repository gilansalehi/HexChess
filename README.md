# Hex Chess
Hello, and welcome to Hex Chess -- a full stack web app built with ruby on rails, react, and redux.

## How to Play:

### How to Win:
Capture the enemy hero or capture three enemy power nodes

### Game Zones:

Each player begins the game with their hero piece on the board and the rest of their pieces in their Reserve.  Captured pieces are removed from the board.  The Command Panel on the left side of the screen shows you whose turn it is, how many actions your have left, and how much energy you have left to use this turn.


### How to Play:

Each turn, you get TWO actions.  For each action, you can either DEPLOY a piece from your Reserve, or you can MOVE a piece on the board. You may not move the same piece twice in a turn, or move a piece you just deployed, but otherwise you may do these actions in any combination you like (move two pieces, deploy two pieces, move then deploy, etc.).

(note: Player 1 only gets one action on their first turn to negate the advantage of moving first)


### Movement:

Each type of piece moves in a unique way, except power nodes, which cannot move.  Unless otherwise noted, a piece can capture any enemy piece by moving to its hex.
+ Heroes can move one hex in any direction.
+ Queens may move any number of hexes in a straight line in any direction.
+ Rooks can move any number of hexes straight forward, back-left, or back-right (like an inverted Y shape)
+ Bishops can move any number of hexes in a straight line diagonally (like an X shape)
+ Pawns may move (but not capture!) one hex forward, and may capture (but not move!) one hex diagonally forward.
+ Power Nodes may not move.

### Deployment:

You can see what pieces are in your Reserve by clicking the 'Res' button on your Command Panel.  In order to deploy a piece, you must have enough ENERGY to deploy it (you get 1 energy for each Power Node you have on the board; your energy refreshes at the start of each turn).  You may deploy pieces to any hex adjacent to your hero.  The Reserve panel displays the energy cost of each piece in orange, as well as how many copies of that piece are still left in your Reserve in blue.  More powerful pieces cost more energy to deploy, so you will need to deploy Power Nodes in order to get your strongest pieces on the board!

#### Enjoy!
