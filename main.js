display = new Display(24, 80); 
player = new Player();
map = new Map();

var el = document.getElementById("text_out");

var flowers = {}; 

for (var i = 0; i < 12; i ++) {
    var x = randInt()%display.width;
    var y = randInt()%display.height;
    var p = x+'_'+y;
    flowers[p] = ['f', ['red', 'yellow', 'blue'][randInt()%3]];
};

document.addEventListener('keydown', function(e) {
    switch (e.code) {
    case "ArrowDown":
    case "KeyJ":
        player.y ++;
        break;
    case "ArrowUp":
    case "KeyK":
        player.y --;
        break;
    case "ArrowLeft":
    case "KeyH":
        player.x --;
        break;
    case "ArrowRight":
    case "KeyL":
        player.x ++;
        break;
    case "KeyG":
        grab();
        break;
    }
   render();
});


render();

function grab() {
    var p = player.x + '_' + player.y;
    var f = flowers[p];
    if (f) {
        var obj = f[1] + ' flower';
        player.AddInventory(obj);
        delete(flowers[p]);
    } else {
        message('there are no flowers here!', 'red');
    }
}

function message(m, c) {
        document.getElementById('message').innerHTML = '<div style="color:'+c+';">'+m+'</div>\n';
}

function render() {
    display.Clear();
    display.CopyFunc(map.SymbolFor);

    for (_f in flowers) if (flowers.hasOwnProperty(_f)) {
        f = flowers[_f];
        pnts = _f.split('_');
        display.WriteChar(parseInt(pnts[0]), parseInt(pnts[1]), f[0], f[1]);
    }

    display.WriteChar(player.x, player.y, '@');
    display.Switch();
    el.innerHTML = display.Render();
}

function randInt() {
    return Math.floor(Math.random()*10000)
}

message('HAPPY MOTHERS DAY (arrow keys to move, g to pick flowers)', 'pink')
