import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { gsap } from "gsap";
import { TextGeometry } from "three/addons/geometries/TextGeometry.js";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";

const scene = new THREE.Scene();

// const axes = new THREE.AxesHelper(5)
// scene.add(axes)

const floor_pattern = new THREE.TextureLoader().load("./img/kitchenfloor.png");
floor_pattern.wrapS = floor_pattern.wrapT = THREE.RepeatWrapping;
floor_pattern.repeat.set(3, 3);

const wallplanegeometry = new THREE.PlaneGeometry(14, 14);
const material = new THREE.MeshStandardMaterial({
  color: 0xffffff,
  side: THREE.DoubleSide,
  roughness: 0.5,
  metalness: 0,
  map: floor_pattern,
});
const mesh = new THREE.Mesh(wallplanegeometry, material);
mesh.position.y = 7;
mesh.position.z = -7;

// adding the wall mesh to the scene

const secondwallgeometry = new THREE.PlaneGeometry(14, 14);

const secondwallmesh = new THREE.Mesh(secondwallgeometry, material);
secondwallmesh.position.x = 7;
//secondwallmesh.position.z = 7
secondwallmesh.position.y = 7;
secondwallmesh.rotateY(1.57);

const floormaterial = new THREE.MeshStandardMaterial({
  color: 0xffffff,
  side: THREE.DoubleSide,
  map: floor_pattern,
  metalness: 0,
  roughness: 0.5,
});
const floorgeometry = new THREE.PlaneGeometry(14, 14);
const floorMesh = new THREE.Mesh(floorgeometry, floormaterial);
floorMesh.rotateX(1.57);
//floorMesh.position.z=7
floorMesh.position.x = 0;

scene.add(mesh);
scene.add(secondwallmesh);
scene.add(floorMesh);

// adding background object meshes - cubes and spheres
// 2 cubes glowing cubes and one metallic sphere

const spheregeometry = new THREE.SphereGeometry(1.5, 64, 64);
const sphere_material = new THREE.MeshStandardMaterial({
  color: 0xff00ff,
  metalness: 0.6,
  roughness: 0.2,
});
const sphere_mesh = new THREE.Mesh(spheregeometry, sphere_material);
sphere_mesh.position.x = 3;
sphere_mesh.position.z = -3;
scene.add(sphere_mesh);

const cube1geometry = new THREE.BoxGeometry(2, 2, 2);
const cube_material = new THREE.MeshStandardMaterial({
  color: 0x301934,
  emissive: 0xff00ff,
  emissiveIntensity: 1,
});

const cube1mesh = new THREE.Mesh(cube1geometry, cube_material);
cube1mesh.position.z = -6;
cube1mesh.position.y = 2;
cube1mesh.position.x = 0.5;

scene.add(cube1mesh);

const cube2mesh = new THREE.Mesh(cube1geometry, cube_material);
cube2mesh.position.z = 1.5;
cube2mesh.position.y = 2.5;
cube2mesh.position.x = 6;

scene.add(cube2mesh);

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

// paintings:
const mona_lisa = new THREE.TextureLoader().load("./img/Mona_Lisa.png");
const painting1 = new THREE.PlaneGeometry(2.5, 3);
const paintmaterial1 = new THREE.MeshStandardMaterial({
  side: THREE.DoubleSide,
  map: mona_lisa,
});
const paint1mesh = new THREE.Mesh(painting1, paintmaterial1);
paint1mesh.position.z = -6.8;
paint1mesh.position.y = 2.5;
paint1mesh.position.x = -2.5;
scene.add(paint1mesh);

const church = new THREE.TextureLoader().load("./img/churchatauvers.jpeg");
const veteran = new THREE.TextureLoader().load(
  "./img/veteraninnewfield-winslowhomer.jpeg"
);
const poppy = new THREE.TextureLoader().load("./img/monet-poppyfield.jpeg");

const painting2 = new THREE.PlaneGeometry(2.5, 3);
const paintmaterial2 = new THREE.MeshStandardMaterial({
  side: THREE.DoubleSide,
  map: church,
});
const paint2mesh = new THREE.Mesh(painting2, paintmaterial2);
paint2mesh.position.set(3.5, 2.5, -6.8);
scene.add(paint2mesh);

const painting3 = new THREE.PlaneGeometry(2.5, 3);
const paintmaterial3 = new THREE.MeshStandardMaterial({
  side: THREE.DoubleSide,
  map: veteran,
});
const paint3mesh = new THREE.Mesh(painting3, paintmaterial3);
paint3mesh.position.set(6.7, 2.5, -3.5);
paint3mesh.rotateY(1.57);
scene.add(paint3mesh);

const painting4 = new THREE.PlaneGeometry(2.5, 3);
const paintmaterial4 = new THREE.MeshStandardMaterial({
  side: THREE.DoubleSide,
  map: poppy,
});
const paint4mesh = new THREE.Mesh(painting4, paintmaterial4);
paint4mesh.position.set(6.7, 2.5, 4.5);
paint4mesh.rotateY(1.57);
scene.add(paint4mesh);

const frame1 = new THREE.PlaneGeometry(3.5, 4);
const frame_material1 = new THREE.MeshStandardMaterial({
  side: THREE.DoubleSide,
  metalness: 1,
  roughness: 0.2,
  color: 0xd4af37,
});
const frame_mesh1 = new THREE.Mesh(frame1, frame_material1);
frame_mesh1.position.set(-2.5, 2.5, -6.9);
scene.add(frame_mesh1);

const frame2 = new THREE.PlaneGeometry(3.5, 4);
const frame_material2 = new THREE.MeshStandardMaterial({
  side: THREE.DoubleSide,
  metalness: 1,
  roughness: 0.2,
  color: 0xd4af37,
});
const frame_mesh2 = new THREE.Mesh(frame2, frame_material2);
frame_mesh2.position.set(3.5, 2.5, -6.9);
scene.add(frame_mesh2);

const frame3 = new THREE.PlaneGeometry(3.5, 4);
const frame_material3 = new THREE.MeshStandardMaterial({
  side: THREE.DoubleSide,
  metalness: 1,
  roughness: 0.2,
  color: 0xd4af37,
});
const frame_mesh3 = new THREE.Mesh(frame3, frame_material3);
frame_mesh3.position.set(6.8, 2.5, -3.5);
frame_mesh3.rotateY(1.57);
scene.add(frame_mesh3);

const frame4 = new THREE.PlaneGeometry(3.05, 4);
const frame_material4 = new THREE.MeshStandardMaterial({
  side: THREE.DoubleSide,
  metalness: 1,
  roughness: 0.2,
  color: 0xd4af37,
});
const frame_mesh4 = new THREE.Mesh(frame4, frame_material4);
frame_mesh4.position.set(6.8, 2.5, 4.5);
frame_mesh4.rotateY(1.57);
scene.add(frame_mesh4);

// adding welcome text:
let textMesh;
const fontLoader = new FontLoader();

// Load a font (you can use a different font file if needed)
fontLoader.load(
  "https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/fonts/helvetiker_regular.typeface.json",
  function (font) {
    // Create text geometry
    var textGeometry = new TextGeometry("Welcome", {
      font: font,
      size: 1, // Text size
      height: 0.1, // Thickness of the text
      curveSegments: 12, // Number of segments around the curves
      bevelEnabled: true, // Enable bevel
      bevelThickness: 0.03, // Bevel thickness
      bevelSize: 0.05, // Bevel size
      bevelSegments: 50, // Number of bevel segments
    });
    textGeometry.center();

    // Create a material
    var textMaterial = new THREE.MeshStandardMaterial({
      color: 0xff00ff,
      metalness: 0.9,
      roughness: 0.2,
    }); // Red color

    // Create a mesh using the text geometry and material
    textMesh = new THREE.Mesh(textGeometry, textMaterial);

    // Position the text
    textMesh.position.set(-1, 2, 1); // Example position
    textMesh.rotateY(-0.78);
    textMesh.rotateX(-1.57);
    textMesh.rotateZ(-1.57);

    // Add the text mesh to the scene
    scene.add(textMesh);

    const tl4 = gsap.timeline({
      defaults: { duration: 2.5, repeat: -1, yoyo: true },
    });
    const startRotation = { x: -0.1, y: -1, z: -0.1 };
    const endRotation = { x: 0.1, y: -0.58, z: 0.1 };

    tl4.fromTo(
      textMesh.rotation,
      { x: startRotation.x, y: startRotation.y, z: startRotation.z },
      { x: endRotation.x, y: endRotation.y, z: endRotation.z }
    );
  }
);

//lighting:

// text lighting

const textlight = new THREE.PointLight(0xffffff, 2, 5);
textlight.position.set(-6, 5, 6);

scene.add(textlight);

// ambient cube light :
const cubelight = new THREE.AmbientLight(0xff00ff);
scene.add(cubelight);

const pointlight = new THREE.PointLight(0xffffff, 100, 100);
const sphereSize = 1;
// const pointLightHelper = new THREE.PointLightHelper( pointlight, sphereSize );
// scene.add( pointLightHelper );

pointlight.position.x = -3;
pointlight.position.y = 9;
pointlight.position.z = 10;

//scene.add(light)
scene.add(pointlight);

// spotlight for the sphere

const spherelight = new THREE.DirectionalLight(0xffffff, 2);
spherelight.castShadow = true;
spherelight.position.x = 3;
spherelight.position.y = 7;
spherelight.position.z = -2;

spherelight.target.position.set(3, 0, -3);
scene.add(spherelight);

// directional light to show the paintings :

const paintingframelight1 = new THREE.PointLight(0xffffff, 50, 100);
paintingframelight1.position.set(-5, 2.5, 5);
// paintingframelight.target.position.set(4, 0, -4)
scene.add(paintingframelight1);

const paintingframelight2 = new THREE.PointLight(0xffffff, 50, 100);
paintingframelight2.position.set(6, 2.5, 6);
// paintingframelight.target.position.set(4, 0, -4)
scene.add(paintingframelight2);

// const framelight_helper = new THREE.PointLightHelper(paintingframelight1, sphereSize)
// scene.add(framelight_helper)

// const spotLightHelper = new THREE.SpotLightHelper(spherelight);
// scene.add(spotLightHelper)

// const directionalLightHelper = new THREE.DirectionalLightHelper(spherelight)
// scene.add(directionalLightHelper)

//camera
const camera = new THREE.PerspectiveCamera(50, sizes.width / sizes.height);
camera.position.z = 6;
camera.position.x = -6;
camera.position.y = 5;
scene.add(camera);

//renderer
const canvas = document.getElementsByClassName("webgl2")[0];
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(sizes.width, sizes.height);

renderer.render(scene, camera);
renderer.setPixelRatio(2);

//window resizing
window.addEventListener("resize", () => {
  sizes.height = window.innerHeight;
  sizes.width = window.innerWidth;

  camera.updateProjectionMatrix();
  camera.aspect = sizes.width / sizes.height;
  renderer.setSize(sizes.width, sizes.height);
});

//controls:

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true; // dampened movement
// controls.enablePan = false;
// controls.enableZoom = false;

//adding animations using GSAP

const tl = gsap.timeline({ defaults: { duration: 1, repeat: -1, yoyo: true } });
const tl2 = gsap.timeline({
  defaults: { duration: 1, repeat: -1, yoyo: true },
});
const tl3 = gsap.timeline({
  defaults: { duration: 5, repeat: -1, yoyo: true },
});
const startValues = { emissiveIntensity: 0 };
const endValues = { emissiveIntensity: 1 };

const tl5 = gsap.timeline({ defaults: { duration: 1 } });
tl5.fromTo("nav", { y: "-100%" }, { y: "0%" });

tl5.fromTo("h1", { y: "1000%" }, { y: "0%" });
tl5.fromTo("h1", { opacity: 0 }, { opacity: 1 });

tl.fromTo(
  cube_material,
  { emissiveIntensity: startValues.emissiveIntensity },
  { emissiveIntensity: endValues.emissiveIntensity }
);
tl3.fromTo(camera.position, { x: -6, y: 5, z: 6 }, { x: -5, y: 5, z: 5 });
tl2.fromTo(cubelight, { intensity: 0 }, { intensity: 1 });

const loop = () => {
  controls.update(); //  ensures that animation keeps going after we let go
  // this gives more realistic movement and is based on the speed of dragging

  renderer.render(scene, camera);
  window.requestAnimationFrame(loop);
};
loop();
