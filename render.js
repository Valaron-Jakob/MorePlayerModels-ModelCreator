import * as THREE from 'three';

// Setting up the scene
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

// Concept objects
//
// cubes and groups(bones)
// group:   pivot, rotation, subgroups/cubes
// cube:    pivot, rotation, origin, size, color
const hat = {
    pivot: [ 0, 0, 0 ],
    rotation: [ 0, 0, 0 ],
    cubes: [
        {
            origin: [-5, 6, -5],
            size: [10, 3, 10],
            pivot: [ 0, 0, 0 ],
            rotation: [ 0, 0, 0 ]
        },
        {
            origin: [-4, 9, -4.05],
            size: [8, 4, 8],
            pivot: [0, 9, -4],
            rotation: [-20, 0, 0]
        },
        {
            origin: [-3, 10.27008, 0.36089],
            size: [6, 4, 6],
            pivot: [0, 13.67008, 1.61089],
            rotation: [-50, 0, 0]
        },
        {
            origin: [-2, 10.55143, 5.3136],
            size: [4, 4, 4],
            pivot: [0, 14.30143, 5.5636],
            rotation: [-87.5, 0, 0]
        },
        {
            origin: [-1, 9.85124, 8.18779],
            size: [2, 4, 2],
            pivot: [0, 12.65124, 7.88779],
            rotation: [-127.5, 0, 0]
        },
        {
            origin: [-2, 8.12122, 5.52865],
            size: [4, 4, 4],
            pivot: [0, 10.12122, 7.52865],
            rotation: [-149.63881, 40.78947, 20.94102]
        }
    ],
    groups: [
        {
            pivot: [ 0, 0, 0 ],
            rotation: [ 0, 0, 0 ],
            cubes: [],
            groups: []
        }
    ]
}

// "pivot": [-1, -5, 1.85],
// "rotation": [-2.5, 0, -32.5],
// "cubes": [
//     {"origin": [-1, -21, 1.85], "size": [1, 31, 1], "uv": [0, 0]},
//     {"origin": [-1, -22, 1.85], "size": [1, 1, 1], "inflate": 0.2, "uv": [10, 2]},
//     {"origin": [-1, -11, 1.85], "size": [1, 1, 1], "inflate": 0.2, "uv": [10, 0]},
//     {"origin": [-1, -2, 1.85], "size": [1, 1, 1], "inflate": 0.2, "uv": [8, 8]},
//     {"origin": [-1, 8, 1.85], "size": [1, 1, 1], "inflate": 0.2, "uv": [4, 8]},
//     {"origin": [-2, 7, 2.35], "size": [3, 8, 0], "uv": [4, 0]}

const spear = [
    {
        pivot: [ -1, -5, 1.85 ],
        rotation: [ -2.5, 0, -32.5 ],
        cubes: [
            {
                origin: [ -1, -21, 1.85 ],
                size: [ 1, 31, 1 ],
                pivot: [ 0, 0, 0 ],
                rotation: [ 0, 0, 0 ]
            },
            {
                origin: [ -1, -22, 1.85 ],
                size: [ 1, 1, 1 ],
                pivot: [ 0, 0, 0 ],
                rotation: [ 0, 0, 0 ]
            },
            {
                origin: [ -1, -11, 1.85 ],
                size: [ 1, 1, 1 ],
                pivot: [ 0, 0, 0 ],
                rotation: [ 0, 0, 0 ]
            },
            {
                origin: [ -1, -2, 1.85 ],
                size: [ 1, 1, 1 ],
                pivot: [ 0, 0, 0 ],
                rotation: [ 0, 0, 0 ]
            },
            {
                origin: [ -1, 8, 1.85 ],
                size: [ 1, 1, 1 ],
                pivot: [ 0, 0, 0 ],
                rotation: [ 0, 0, 0 ]
            },
            {
                origin: [ -2, 7, 2.35 ],
                size: [ 3, 8, 0 ],
                pivot: [ 0, 0, 0 ],
                rotation: [ 0, 0, 0 ]
            }
        ],
        groups: []
    }
]

const player = [
    {
        pivot: [ 0, 0, 0 ],
        rotation: [ 0, 0, 0 ],
        cubes: [
            {
                origin: [ -4, 24, -4 ],
                size: [ 8, 8, 8 ],
                pivot: [ 0, 24, 0 ],
                rotation: [ -6, 5, 0 ]
            },
            {
                origin: [ -4, 12, -2 ],
                size: [ 8, 12, 4 ],
                pivot: [ 0, 24, 0 ],
                rotation: [ 0, 0, 0 ]
            },
            {
                origin: [ -8, 12, -2 ],
                size: [ 4, 12, 4 ],
                pivot: [ -5, 22, 0 ],
                rotation: [ -10, 0, 0 ]
            },
            {
                origin: [ 4, 12, -2 ],
                size: [ 4, 12, 4 ],
                pivot: [ 5, 22, 0 ],
                rotation: [ 12, 0, 0 ]
            },
            {
                origin: [ -3.9, 0, -2 ],
                size: [ 4, 12, 4 ],
                pivot: [ -1.9, 12, 0 ],
                rotation: [ 11, 0, 2 ]
            },
            {
                origin: [ -0.1, 0, -2 ],
                size: [ 4, 12, 4 ],
                pivot: [ 1.9, 12, 0 ],
                rotation: [ -10, 0, -2 ]
            }
        ],
        groups: [
            {
                pivot: [ 0, 24, 0 ],
                rotation: [ 0, 0, 0 ],
                cubes: [],
                groups: [
                    {
                        pivot: [ -1, -5, 1.85 ],
                        rotation: [ -2.5, 0, -32.5 ],
                        cubes: [
                            {
                                origin: [ -1, -21, 1.85 ],
                                size: [ 1, 31, 1 ],
                                pivot: [ 0, 0, 0 ],
                                rotation: [ 0, 0, 0 ]
                            },
                            {
                                origin: [ -1, -22, 1.85 ],
                                size: [ 1, 1, 1 ],
                                pivot: [ 0, 0, 0 ],
                                rotation: [ 0, 0, 0 ]
                            },
                            {
                                origin: [ -1, -11, 1.85 ],
                                size: [ 1, 1, 1 ],
                                pivot: [ 0, 0, 0 ],
                                rotation: [ 0, 0, 0 ]
                            },
                            {
                                origin: [ -1, -2, 1.85 ],
                                size: [ 1, 1, 1 ],
                                pivot: [ 0, 0, 0 ],
                                rotation: [ 0, 0, 0 ]
                            },
                            {
                                origin: [ -1, 8, 1.85 ],
                                size: [ 1, 1, 1 ],
                                pivot: [ 0, 0, 0 ],
                                rotation: [ 0, 0, 0 ]
                            },
                            {
                                origin: [ -2, 7, 2.35 ],
                                size: [ 3, 8, 0 ],
                                pivot: [ 0, 0, 0 ],
                                rotation: [ 0, 0, 0 ]
                            }
                        ],
                        groups: []
                    }
                ]
            }
        ]
    }
]

addGroups(scene, player)

function addGroups(parent, childs) {
    let childs_group = new THREE.Group();

    childs.forEach(child => {
        let pivot = child.pivot;
        let rotation = child.rotation;
        let cubes = child.cubes;
        let groups = child.groups;
    
        const group = new THREE.Group();
        group.position.set( pivot[0], pivot[1], pivot[2] );
        group.rotation.set( -toRad(rotation[0]), -toRad(rotation[1]), -toRad(rotation[2]) );
        
        addCubes(group, cubes);
        addGroups(group, groups);
        childs_group.add( group );
    });
    
    parent.add( childs_group );
    return childs_group;
}

function addCubes(parent, childs) {
    var childs_group = new THREE.Group();

    childs.forEach(child => {
        let size = child.size;
        let origin = [ child.origin[0] + size[0]/2, child.origin[1] + size[1]/2, child.origin[2] + size[2]/2 ];
        let rotation = child.rotation;
        let pivot = child.pivot;

        const geometry = new THREE.BoxGeometry( size[0], size[1], size[2] );
        const material = new THREE.MeshLambertMaterial({ color: 0x8b272b });
        const cube = new THREE.Mesh( geometry, material );
        
        // Rotate around a pivot
        const group = new THREE.Group();
        group.add( cube );
        group.position.set( pivot[0], pivot[1], pivot[2] );
        cube.position.set( -pivot[0] + origin[0], -pivot[1] + origin[1], -pivot[2] + origin[2] );
        group.rotation.set( -toRad(rotation[0]), -toRad(rotation[1]), -toRad(rotation[2]) );

        childs_group.add( group );
    });

    parent.add( childs_group );
    return childs_group
}


// function addCube(scene, object) {
//     let size = object.size;
//     let origin = [ object.origin[0] + size[0]/2, object.origin[1] + size[1]/2, object.origin[2] + size[2]/2 ];
//     let rotation = object.rotation;
//     let pivot = object.pivot;

//     const geometry = new THREE.BoxGeometry( size[0], size[1], size[2] );
//     const material = new THREE.MeshLambertMaterial({ color: object.color });
//     const cube = new THREE.Mesh( geometry, material );
//     const group = new THREE.Group();
    
//     // Rotate around a pivot
//     group.add( cube );
//     group.position.set( pivot[0], pivot[1], pivot[2] );
//     cube.position.set( -pivot[0] + origin[0], -pivot[1] + origin[1], -pivot[2] + origin[2] );
//     group.rotation.set( toRad(rotation[0]), -toRad(rotation[1]), -toRad(rotation[2]) );

//     scene.add( group );
    
//     return group;
// };

// // Adding base model
// const g_head = addCube(scene, head);
// const g_body = addCube(scene, body);
// const g_right_arm = addCube(scene, right_arm);
// const g_left_arm = addCube(scene, left_arm);
// const g_right_leg = addCube(scene, right_leg);
// const g_left_leg = addCube(scene, left_leg);

// // Adding part model
// g_body.add( addCube(scene, part) );

// Adding axes
scene.add( new THREE.AxesHelper(20) );

// Setting camera position
const c_rad = 32;
const c_height = 22;
let c_angle = -0.65 * Math.PI;
let pos = rotateDeg([0, 0], c_rad, c_angle);

camera.position.set(pos[0], c_rad, pos[1]);
camera.lookAt(0, c_height, 0);

// Adding lights
const ambientLight = new THREE.AmbientLight( 0xffffff, 0.6 );
scene.add( ambientLight );

const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.6 );
directionalLight.position.set(pos[0], c_rad+8, pos[1]);
scene.add( directionalLight );


function animate() {
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
}
animate();

// function onWindowResize() {
//     let element = document.getElementById('render_container');
//     camera.aspect = element.innerWidth / element.innerHeight;
//     camera.updateProjectionMatrix();
//     renderer.setSize( element.innerWidth, element.innerHeight );
// }
// window.addEventListener( 'resize', onWindowResize, false );

// Rotate the camera on button click
document.getElementById('rot_right').addEventListener('click', function () {
    rotateCam(1/4 * Math.PI)
});
document.getElementById('rot_left').addEventListener('click', function () {
    rotateCam(-1/4 * Math.PI)
});

// Helper functions
function toRad(angle) {
    return angle * (Math.PI / 180);
}

function rotateDeg(origin, radius, angle) {
    return [
        origin[0] + radius * Math.cos(angle),
        origin[1] + radius * Math.sin(angle)
    ];
}

function rotateCam(angle) {
    c_angle += angle;
    pos = rotateDeg([ 0, 0 ], c_rad, c_angle);

    camera.position.set(pos[0], c_rad, pos[1]);
    directionalLight.position.set(pos[0], c_rad+8, pos[1])
    camera.lookAt(0, c_height, 0);
}