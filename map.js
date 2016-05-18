
function Map() {};

s = 1;

var C_GRASS = '#0a0';

setInterval(function() { s = (s*2 + 1) % 100 }, 100);

Map.prototype.SymbolFor = function(x, y) {
    return ['.', C_GRASS];
};


function Player() {
    this.x = 0;
    this.y = 0;
    this.inventory = {};
};

Player.prototype.AddInventory = function(item) {
    if (this.inventory === undefined) {
        this.inventory[item] = 0;
    }
    message(item + ' added to inventory', '#fff');
    this.inventory[item]++;
}

