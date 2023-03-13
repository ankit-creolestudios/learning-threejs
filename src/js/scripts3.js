import * as Three from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

import * as datgui from 'dat.gui';

const renderer = new Three.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);
//shadow render enable

renderer.shadowMap.enabled = true;
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
const planematerial = new Three.MeshStandardMaterial({
  color: 0xffffff,
  side: Three.DoubleSide,
});

const plane = new Three.Mesh(planeGeometry, planematerial);
scene.add(plane);
// plane overlap to grid
plane.rotation.x = -0.5 * Math.PI;
plane.receiveShadow = true;

const gridHelper = new Three.GridHelper(50);
scene.add(gridHelper);

/* sphere create start */
const sphereGeometry = new Three.SphereGeometry(4, 50, 50);
const spherematerial = new Three.MeshStandardMaterial({
  color: 0x12abff,
  wireframe: false,
});
const sphere = new Three.Mesh(sphereGeometry, spherematerial); // fusion of geometry and material
scene.add(sphere);

//sphere.position.x = -10;

sphere.position.set(-10, 10, 10);

sphere.castShadow = true;
/* sphere create end */
const ambientlight = new Three.AmbientLight(0x333333);
scene.add(ambientlight);
// const directionallight = new Three.DirectionalLight(0xffffff, 0.8);
// scene.add(directionallight);
// directionallight.castShadow = true;
// directionallight.shadow.camera.bottom = -20;
// directionallight.shadow.camera.left = -20;
// directionallight.shadow.camera.right = 20;
// directionallight.position.set(-20, 35, 0);
// const directionlightHelper = new Three.DirectionalLightHelper(
//   directionallight,
//   5
// );
// scene.add(directionlightHelper);
// const dlightshadowhelper = new Three.CameraHelper(
//   directionallight.shadow.camera
// );
// scene.add(dlightshadowhelper);
const spotlight = new Three.SpotLight(0xffffff);
scene.add(spotlight);
spotlight.position.set(-40, 50, 20);
spotlight.castShadow = true;
spotlight.angle = 0.2;
const spotlighthelper = new Three.SpotLightHelper(spotlight);
scene.add(spotlighthelper);

//scene.fog = new Three.Fog(0xffffff, 0, 200);
scene.fog = new Three.FogExp2(0xffea00, 0.01);
renderer.setClearColor(0xffea00);

const gui = new datgui.GUI();
const options = {
  sphereColor: '#ffea00',
  wireframe: false,
  speed: 0.01,
  angle: 0.2,
  penumbra: 0,
  intensity: 1,
};
gui.addColor(options, 'sphereColor').onChange(function (e) {
  sphere.material.color.set(e);
});
gui.add(options, 'wireframe').onChange(function (e) {
  sphere.material.wireframe = e;
});
gui.add(options, 'angle', 0, 0.2);
gui.add(options, 'penumbra', 0, 1);
gui.add(options, 'intensity', 0, 1);
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

  spotlight.angle = options.angle;
  spotlight.penumbra = options.penumbra;
  spotlight.intensity = options.intensity;
  renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);
