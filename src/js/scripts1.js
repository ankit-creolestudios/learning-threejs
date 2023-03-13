import * as Three from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

import * as datgui from 'dat.gui';

const renderer = new Three.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

const scene = new Three.Scene();
// field of view, aspect ration, near ,far
const camera = new Three.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const orbit = new OrbitControls(camera, renderer.domElement);
const axesHelper = new Three.AxesHelper(4);
scene.add(axesHelper);

// camera.position.z = 4;
// camera.position.y = 1;
// camera.position.x = 2;

//camera.position.set(2, 1, 4);

camera.position.set(-10, 29, 29);
orbit.update();
//renderer.render(scene, camera);
/* box create start */
const boxGeometry = new Three.BoxGeometry(); //instance of box geometry class
const boxmaterial = new Three.MeshBasicMaterial({ color: 0x00ff00 });
const box = new Three.Mesh(boxGeometry, boxmaterial); // fusion of geometry and material
scene.add(box);
/* box create end */
/* plane create start */
const planeGeometry = new Three.PlaneGeometry(50, 50);
const planematerial = new Three.MeshBasicMaterial({
  color: 0xffffff,
  side: Three.DoubleSide,
});

const plane = new Three.Mesh(planeGeometry, planematerial);
scene.add(plane);
// plane overlap to grid
plane.rotation.x = -0.5 * Math.PI;
const gridHelper = new Three.GridHelper(50);
scene.add(gridHelper);

/* sphere create start */
const sphereGeometry = new Three.SphereGeometry(4, 50, 50);
const spherematerial = new Three.MeshBasicMaterial({
  color: 0x12abff,
  wireframe: false,
});
const sphere = new Three.Mesh(sphereGeometry, spherematerial); // fusion of geometry and material
scene.add(sphere);

//sphere.position.x = -10;

sphere.position.set(-10, 10, 10);
/* sphere create end */
const ambientlight = new Three.AmbientLight(0x333333);
scene.add(ambientlight);
const gui = new datgui.GUI();
const options = {
  sphereColor: '#ffea00',
  wireframe: false,
  speed: 0.01,
};
gui.addColor(options, 'sphereColor').onChange(function (e) {
  sphere.material.color.set(e);
});
gui.add(options, 'wireframe').onChange(function (e) {
  sphere.material.wireframe = e;
});

// sphere bouncing
gui.add(options, 'speed', 0, 0.1);
let step = 0;
//let speed = 0.01;
function animate(customtim) {
  box.rotation.x = customtim / 1000;
  box.rotation.y = customtim / 1000;
  step += options.speed;
  sphere.position.x = -10 * Math.abs(Math.sin(step));
  sphere.position.y = 15 * Math.abs(Math.sin(step));
  sphere.position.z = 10 * Math.abs(Math.sin(step));

  renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);
