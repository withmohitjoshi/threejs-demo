import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

const width = window.innerWidth,
  height = window.innerHeight;

// creating a scene with camera
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(70, width / height, 0.01, 100);
camera.position.set(0, 0, 8);

// creating renderer
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#draw"),
  antialias: true,
});
renderer.setSize(width, height);

// adding event listener for window resize
window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});

// add hdri
const rgbeLoader = new RGBELoader();
rgbeLoader.load(
  "https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/zwartkops_pit_1k.hdr",
  (texture) => {
    texture.mapping = THREE.EquirectangularReflectionMapping;
    scene.background = texture;
    scene.environment = texture;
  }
);

// creating Loader for wodden box
const loader = new GLTFLoader();
loader.load("/millitary_box.glb", function (gltf) {

  gltf.scene.rotation.y = -(Math.PI / 2);
  gltf.scene.position.y = -1;
  scene.add(gltf.scene);
});

// creating controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.dampingFactor = 0.25;
controls.enableDamping = true;
controls.enableZoom = true;

function animate() {
  window.requestAnimationFrame(animate);
  renderer.render(scene, camera);
  controls.update();
}
animate();
