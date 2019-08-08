import msgbox from './Msgbox.svelte'

var color = "#999";

function setColor(col) {
    color = col;
}

function Ok(message, title) {
    var c = createmb();
    c.Ok(message, title);
    c.show = true;
}

function OkCancel(message, title, okfunc) {
    var c = createmb();
    c.OkCancel(message, title, okfunc);
    c.show = true;
}

function YesNo(message, title, okfunc) {
    var c = createmb();
    c.YesNo(message, title, okfunc);
    c.show = true;
}

function InputLine(initial, title, placeholder, okfunc) {
    var c = createmb();
    c.Input(initial, title, placeholder, false, okfunc);
    c.show = true;
}

function InputBox(initial, title, placeholder, okfunc) {
    var c = createmb();
    c.Input(initial, title, placeholder, true, okfunc);
    c.show = true;
}

let _last = null;

// TODO : progress spinner
function Progress(message, title) {

}

// close spinner
function Close() {
    if (_last) {
        _last.show = false;
        _last = null;
    }
}

function createmb() {
    var n = document.createElement("div")
    var e = document.body.appendChild(n);
    // console.log(color);
    let m = new msgbox({ target: n, props: { node: n, color: color } });
    return m;
}

export default { Ok, OkCancel, YesNo, InputLine, InputBox, /*, Progress, Close */ setColor };