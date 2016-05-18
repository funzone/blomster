C_DEFAULT = '#fff';

function Display(h, w) {
    this.height = h;
    this.width = w;
    this.size = h * w;
    this.output_buffer = new Array(this.size);
    this.render_buffer = new Array(this.size);
}

Display.prototype.WriteChar = function(x, y, c, color) {
    this.render_buffer[this._pnt(x, y)] = [
        c.charCodeAt(0),
        color ? color : C_DEFAULT
    ];
};

Display.prototype.Switch = function() {
    var tmp = this.output_buffer;
    this.output_buffer = this.render_buffer;
    this.render_buffer = tmp;
};

Display.prototype.Clear = function() {
    this.CopyFunc(function() {
        return ' ';
    });
};

Display.prototype.Render = function(id) {
    var o = '';
    for (var i = 0; i < this.size; i++) {
        var _c = this.output_buffer[i];
        c = '<span style="color:'+_c[1]+';">'+String.fromCharCode(_c[0])+'</span>';
        o += c ? c : ' ';
        if ((i+1) % this.width == 0) {
            o += '\n';
        }
    }
    return o;
};

Display.prototype.CopyFunc = function(fn) {
    for (var i = 0; i < this.size; i++) {
       var p = this._toPnt(i);
       var v = fn(p.x, p.y);
       if (typeof v == "object") {
           this.WriteChar(p.x, p.y, v[0], v[1])
       }
       else if (v !== undefined) {
           this.WriteChar(p.x, p.y, v);
       }
    }
};

Display.prototype._toPnt = function(p) {
    var y = Math.floor(p / this.width);
    var x = p - y * this.width;
    return {x: x, y: y}; 
};

Display.prototype._pnt = function(x, y) {
    return y * this.width + x
};

