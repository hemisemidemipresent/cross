const container = document.getElementById('container');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(25, 2.5, 25);
const frustumSize = 69;
const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    preserveDrawingBuffer: false
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
container.appendChild(renderer.domElement);
const controls = new THREE.OrbitControls(camera, renderer.domElement);
let resolution = new THREE.Vector2(window.innerWidth, window.innerHeight);
let graph = new THREE.Object3D();
scene.add(graph);

let axesColor = 0x5ca4a9;
let colors = [0xff0000, 0x00ff00, 0x0000ff];
let length = 10;
let vecwidth = 15;

let A = document.getElementById('A');
let B = document.getElementById('B');
let C = document.getElementById('C');
var a, b, c;
reset();
render();
function init() {
    line = new THREE.Geometry();
    line.vertices.push(new THREE.Vector3(0, -10, 0));
    line.vertices.push(new THREE.Vector3(0, 10, 0));
    makeLine(line, axesColor);

    createGrid();
}
function render() {
    requestAnimationFrame(render);
    controls.update();
    renderer.render(scene, camera);
}
function createGrid() {
    for (let i = -length; i <= length; i++) {
        let line = new THREE.Geometry();

        let width = 3;
        if (i == 0) width = 7;

        line.vertices.push(new THREE.Vector3(i, 0, -length));
        line.vertices.push(new THREE.Vector3(i, 0, length));
        makeLine(line, axesColor, width);

        line = new THREE.Geometry();
        line.vertices.push(new THREE.Vector3(-length, 0, i));
        line.vertices.push(new THREE.Vector3(length, 0, i));
        makeLine(line, axesColor, width);
    }
}
function reset() {
    clear();
    init();

    C.style.display = 'none';
    a = [ran(), ran(), ran()];
    A.innerText = `A=(${a[0]}, ${a[1]}, ${a[2]})`;

    let a_vec = new THREE.Geometry();
    a_vec.vertices.push(new THREE.Vector3(0, 0, 0));
    a_vec.vertices.push(new THREE.Vector3(a[0], a[1], a[2]));
    makeLine(a_vec, colors[0], vecwidth);

    b = [ran(), ran(), ran()];
    B.innerText = `B=(${b[0]}, ${b[1]}, ${b[2]})`;
    let b_vec = new THREE.Geometry();
    b_vec.vertices.push(new THREE.Vector3(0, 0, 0));
    b_vec.vertices.push(new THREE.Vector3(b[0], b[1], b[2]));
    makeLine(b_vec, colors[1], vecwidth);

    c = [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
    C.innerText = `AxB=(${c[0]}, ${c[1]}, ${c[2]})`;
}
function showcross() {
    // resultant vector
    let c_vec = new THREE.Geometry();
    c_vec.vertices.push(new THREE.Vector3(0, 0, 0));
    c_vec.vertices.push(new THREE.Vector3(c[0], c[1], c[2]));
    makeLine(c_vec, colors[2], vecwidth);
    // bivector
    var geometry = new THREE.BufferGeometry();
    var positions = [0, 0, 0, a[0], a[1], a[2], a[0] + b[0], a[1] + b[1], a[2] + b[2]];
    geometry.computeVertexNormals();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    var mat = new THREE.MeshBasicMaterial();
    mat.color = new THREE.Color(0xd69dff);

    mat.side = THREE.DoubleSide;

    var object = new THREE.Mesh(geometry, mat);
    graph.add(object);

    geometry = new THREE.BufferGeometry();
    positions = [0, 0, 0, b[0], b[1], b[2], a[0] + b[0], a[1] + b[1], a[2] + b[2]];
    geometry.computeVertexNormals();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    object = new THREE.Mesh(geometry, mat);
    graph.add(object);

    // text
    C.style.display = 'block';
}
function ran() {
    return Math.floor(Math.random() * 5);
}
function makeLine(geo, color, lineWidth = 10, opacity = 1) {
    const g = new MeshLine();
    g.setGeometry(geo);

    const material = new MeshLineMaterial({
        useMap: false,
        color: color,
        opacity: opacity,
        resolution: resolution,
        sizeAttenuation: false,
        lineWidth: lineWidth
    });
    const mesh = new THREE.Mesh(g.geometry, material);
    graph.add(mesh);
}
function clear() {
    for (var i = graph.children.length - 1; i >= 0; i--) {
        graph.remove(graph.children[i]);
    }
}
