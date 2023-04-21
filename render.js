import * as THREE from 'three';

let box = document.querySelector('#render_container');
let width = box.clientWidth;
let height = box.clientHeight;
console.log({ width, height });

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, width / height, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();

renderer.setSize( width, height );
document.getElementById( 'render_container' ).appendChild( renderer.domElement );

// Setting background color
scene.background = new THREE.Color( 0x282a2c );

// Adding lights
const ambientLight = new THREE.AmbientLight( 0xffffff, 0.6 );
scene.add( ambientLight );

const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.6 );
directionalLight.position.set( 10, 20, 0 ); // x, y, z
scene.add( directionalLight );

// Adding objects
const head = {
    origin: [ -4, 24, -4 ],
    size: [ 8, 8, 8 ],
    rotation: [ -6, 5, 0 ],
    pivot: [ 0, 24, 0 ],
    color: 0x3c1140
};
const body = {
    origin: [ -4, 12, -2 ],
    size: [ 8, 12, 4 ],
    rotation: [ 0, 0, 0 ],
    pivot: [ 0, 24, 0 ],
    color: 0x3c1125
};
const right_arm = {
    origin: [ -8, 12, -2 ],
    size: [ 4, 12, 4 ],
    rotation: [ -10, 0, 0 ],
    pivot: [ -5, 22, 0 ],
    color: 0x3c1101
};
const left_arm = {
    origin: [ 4, 12, -2 ],
    size: [ 4, 12, 4 ],
    rotation: [ 12, 0, 0 ],
    pivot: [ 5, 22, 0 ],
    color: 0x3c1101
};
const right_leg = {
    origin: [ -3.9, 0, -2 ],
    size: [ 4, 12, 4 ],
    rotation: [ 11, 0, 2 ],
    pivot: [ -1.9, 12, 0 ],
    color: 0x3c1101
};
const left_leg = {
    origin: [ -0.1, 0, -2 ],
    size: [ 4, 12, 4 ],
    rotation: [ -10, 0, -2 ],
    pivot: [ 1.9, 12, 0 ],
    color: 0x3c1101
};

function addCube(scene, object) {
    let size = object.size;
    let origin = [ object.origin[0] + size[0]/2, object.origin[1] + size[1]/2, object.origin[2] + size[2]/2 ];
    let rotation = object.rotation;
    let pivot = object.pivot;

    const geometry = new THREE.BoxGeometry( size[0], size[1], size[2] );
    const material = new THREE.MeshLambertMaterial({ color: object.color });
    const cube = new THREE.Mesh( geometry, material );
    const group = new THREE.Group();
    
    // Rotate around a pivot
    group.add( cube );
    group.position.set( pivot[0], pivot[1], pivot[2] );
    cube.position.set( -pivot[0] + origin[0], -pivot[1] + origin[1], -pivot[2] + origin[2] );
    group.rotation.set( rotation[0] / 180 * Math.PI, -rotation[1] / 180 * Math.PI, -rotation[2] / 180 * Math.PI );

    scene.add( group );
};

addCube(scene, head);
addCube(scene, body);
addCube(scene, right_arm);
addCube(scene, left_arm);
addCube(scene, right_leg);
addCube(scene, left_leg);

scene.add( new THREE.AxesHelper(20) );

// Setting camera position
camera.position.set(16, 32, 32);
camera.lookAt(0, 12, 0);


function animate() {
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
}
animate();