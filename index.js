let A = document.getElementById('A');
let B = document.getElementById('B');
let C = document.getElementById('C');

var c;
reset();
function reset() {
    C.style.display = 'none';
    let a = [ran(), ran(), ran()];
    A.innerText = `A=(${a[0]}, ${a[1]}, ${a[2]})`;
    let b = [ran(), ran(), ran()];
    B.innerText = `B=(${b[0]}, ${b[1]}, ${b[2]})`;

    c = [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
    C.innerText = `AxB=(${c[0]}, ${c[1]}, ${c[2]})`;
}
function showcross() {
    C.style.display = 'block';
}
function ran() {
    return Math.floor(Math.random() * 10);
}
