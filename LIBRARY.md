# **Library**

### Global Variables
- **gridSize = ?**
Sets the size of the grid.  Can be changed later on.
- **tilesRemain** = gridSize;
- **startTurns = ?**
- **currentPlayer = players[0]**
This will make it easier to add two players later on.

### Global Arrays
- **flipped = []**
Contains indexes for any active cards that are flipped over
- **sortedTiles** = [starting Array of constructed tiles]
- **randomTiles = []**
An array of Tiles placed in random sequence.
- **players = [new Player(name, 0)]**

### Constructors
- **Player (name, index)**
    * **this.name** = name;
    * **this.index** = index of player in player array;
    * **this.opponent** = index of opposing player;
    * **this.turns** = startTurns;
    * **this.matches** = 0;
- **Tile (set, path)**
    * **this.set** = set;
    * **this.path** = path;
    * **this.active** = true;

### Core Functions:

* **shuffle (input)**
returns a shuffled version of the input array
* **tile (elementID)**
returns object for elementID
* **checkMatch ()**
Checks flipped to see if both objects are a matching set.  If so, activate matchFound.  Otherwise, flip tile x 2.
Afterward, call flipTile on both elements, and then clear the array
* **flipTile (elementID)**
If elementID is not in flip array, reveal the card and add to array
If it is in flip array, return the image to default
* **matchFound (array)**
Iterate points to current player, set object.active = false, and change opacity.

### Misc Sources
* Generate Array of sequential numbers:  https://stackoverflow.com/questions/3895478/does-javascript-have-a-method-like-range-to-generate-an-array-based-on-suppl
* fisher-yates shuffle: https://bost.ocks.org/mike/shuffle/
