import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import { gsap } from "gsap"
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';

const scene = new THREE.Scene();

scene.fog = new THREE.Fog(0xb8e2f2, 20,80)


// const axes = new THREE.AxesHelper(5)
// scene.add(axes)

const floor_pattern = new THREE.TextureLoader().load("./img/kitchenfloor.png")
floor_pattern.wrapS = floor_pattern.wrapT = THREE.RepeatWrapping;
floor_pattern.repeat.set( 3, 3 );

const wallplanegeometry =  new THREE.BoxGeometry(14,14, 0.2)
const material = new THREE.MeshStandardMaterial(
    {color: 0xffffff, side: THREE.DoubleSide, roughness: 0.5,
    metalness: 0}
)
const mesh = new THREE.Mesh(wallplanegeometry, material)
mesh.position.y=7
mesh.position.z=-7

//monolith

const mono_geom = new THREE.BoxGeometry(14, 50, 14)
const mono_material = new THREE.MeshLambertMaterial(
    {color:0xb8e2f2, emissive:0xb8e2f2, emissiveIntensity:0.5}
)

const mono_mesh = new THREE.Mesh(mono_geom, mono_material)
mono_mesh.position.y = -25.01
scene.add(mono_mesh)

//vase geometry

const points = []
for(let i=0; i<10; i++){
    points.push(new THREE.Vector2(Math.sin(i*0.2)*1, (i-5)*0.5))
}


const vase_geo = new THREE.LatheGeometry(points)
const vase_mat = new THREE.MeshStandardMaterial({
    color:0xe3735e, metalness:0.9, clearcoat:5, side:THREE.DoubleSide, roughness:0
})

const vase = new THREE.Mesh(vase_geo, vase_mat)
vase.position.set(6, 0 , -5.8)
scene.add(vase)

//soil geometry

const soil_geo = new THREE.CircleGeometry(0.9, 64, 0, Math.PI*2)
const soil_mat = new THREE.MeshStandardMaterial({
    color:0x000000, roughness:1
})

const soil = new THREE.Mesh(soil_geo, soil_mat)

soil.position.set(6, 1.8, -5.8)
soil.rotateX(-Math.PI/2)
scene.add(soil)

//plant geometry:

// Create leaves geometry
const leafGeometry = new THREE.BoxGeometry(0.3,0.05 ,0.3);
const stalk_geometry = new THREE.BoxGeometry(0.1, 3, 0.1)
const leafMaterial = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
const stalkMesh1 = new THREE.Mesh(stalk_geometry, leafMaterial);
const leafMesh2 = new THREE.Mesh(leafGeometry, leafMaterial);
stalkMesh1.position.set(6, 1.8, -5.8); // Adjust position of leaves
leafMesh2.position.set(5.9, 2.2, -5.8);
leafMesh2.rotateZ(0.4)

const leafMesh3 = new THREE.Mesh(leafGeometry, leafMaterial);
const leafMesh4 = new THREE.Mesh(leafGeometry, leafMaterial);
leafMesh3.position.set(6.1, 2.5, -5.7);
leafMesh4.position.set(5.9, 2.8, -5.8);
leafMesh3.rotateY(0.9)
leafMesh4.rotateY(1.2)
scene.add(stalkMesh1);

scene.add(leafMesh2);
scene.add(leafMesh3)
scene.add(leafMesh4)
 

//flower geometry:

const petalGeometry = new THREE.SphereGeometry(0.3, 32, 32); // Adjust size of petal
const petalMaterial = new THREE.MeshStandardMaterial({ color: 0xffd700 });
const petalMesh1 = new THREE.Mesh(petalGeometry, petalMaterial);
const petalMesh2 = new THREE.Mesh(petalGeometry, petalMaterial);
petalMesh1.position.set(5.9, 3.2, -5.8); // Adjust position of petal
petalMesh2.position.set(6.1, 3.2, -5.8); // Adjust position of petal

// Create flower center
const centerGeometry = new THREE.CylinderGeometry(0.3, 0.3, 0.5, 32); // Adjust size of center
const centerMaterial = new THREE.MeshStandardMaterial({ color: 0xff69b4 });
const centerMesh = new THREE.Mesh(centerGeometry, centerMaterial);
centerMesh.position.set(6, 3.5, -5.8); // Adjust position of center

scene.add(petalMesh1)
scene.add(petalMesh2)
scene.add(centerMesh)

//canvas geometry:

// Create painting canvas geometry and material
const canvasWidth = 10; // Width of the canvas
const canvasHeight = 6; // Height of the canvas
const canvasGeometry = new THREE.BoxGeometry(canvasWidth, canvasHeight, 0.3);
const canvasMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff, metalness:0.5, emissive:0xffffff, emissiveIntensity:0.05, clearcoat:5 });

// Create painting canvas mesh
const canvasMesh = new THREE.Mesh(canvasGeometry, canvasMaterial);

// Position the canvas on the opposite wall to the window
canvasMesh.position.set(0, 7, -6.94); // Adjust position to align with the opposite wall
canvasMesh.rotation.set(0, Math.PI, 0); // Rotate the canvas to face the camera
scene.add(canvasMesh);

//canvas text: 
let textMesh; 
const fontLoader = new FontLoader();

// Load a font (you can use a different font file if needed)
fontLoader.load("https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/fonts/helvetiker_regular.typeface.json", function(font) {
    // Create text geometry
    var textGeometry = new TextGeometry('GalleriesNow', {
        font: font,
        size: 1, // Text size
        height: 0.2, // Thickness of the text
        curveSegments: 12, // Number of segments around the curves
        bevelEnabled: true, // Enable bevel
        bevelThickness: 0.03, // Bevel thickness
        bevelSize: 0.05, // Bevel size
        bevelSegments: 50,// Number of bevel segments
        
    });
    textGeometry.center()

    // Create a material
    var textMaterial = new THREE.MeshStandardMaterial({ color: 0x000000, metalness:0.9, roughness:0.2, }); // Red color

    // Create a mesh using the text geometry and material
    textMesh = new THREE.Mesh(textGeometry, textMaterial);

    // Position the text
    textMesh.position.set(0, 7, -6.9); // Example position

    scene.add(textMesh)
});



// adding window geometry: 

// Create window geometry and material
const windowGeometry = new THREE.BoxGeometry(6, 10, 0.2); // Adjust dimensions as needed
const glassMaterial = new THREE.MeshStandardMaterial({
    color: 0xffffff, // Set the color of the glass
    opacity: 0.05, // Set the opacity to control transparency
    transparent: true, // Enable transparency
    metalness: 1, // Adjust metalness for reflection
    roughness: 0, // Adjust roughness for reflection smoothness
    transmission:2, // Set transmission to control light transmission through the material
    side: THREE.DoubleSide,
    clearcoat:1 // Ensure the material is visible from both sides,
    
});

// Create window mesh with glass material
const windowMesh = new THREE.Mesh(windowGeometry, glassMaterial);
windowMesh.position.set(6.96, 7, 0); // Position the window to match the spotlight source
windowMesh.rotation.set(0, -Math.PI / 2, 0); // Rotate the window to align with the wall
scene.add(windowMesh);

// outdoors

const outdoorGeometry= new THREE.BoxGeometry(6, 10, 0.15)
const outdoormat = new THREE.MeshStandardMaterial(
    {color:0xffffff, 
    emissive: 0x77c3ec,
emissiveIntensity:3}
)


const outdoor_mesh = new THREE.Mesh(outdoorGeometry, outdoormat)
outdoor_mesh.position.set(6.965, 7,0)
outdoor_mesh.rotation.set(0, -Math.PI/2, 0)
scene.add(outdoor_mesh)
// window frames:

const frameMaterial = new THREE.MeshStandardMaterial({
    color: 0xffffff, // Set the color of the frame
    metalness: 0.8, // Adjust metalness for reflection
    roughness: 0.1,
    emissive:0xffffff,
    emissiveIntensity:0.2 // Adjust roughness for reflection smoothness
});

// Define frame dimensions
const frameWidth = 0.1; // Width of each frame piece
const frameDepth = 0.2; // Depth of each frame piece
const frameHeight = 10.2; // Height of each frame piece

// Create the parts of the window frame
const frameTop = new THREE.Mesh(new THREE.BoxGeometry(6.2, frameWidth, frameDepth), frameMaterial);
const frameBottom = new THREE.Mesh(new THREE.BoxGeometry(6.2, frameWidth, frameDepth), frameMaterial);
const frameLeft = new THREE.Mesh(new THREE.BoxGeometry(frameWidth, frameHeight, frameDepth), frameMaterial);
const frameRight = new THREE.Mesh(new THREE.BoxGeometry(frameWidth, frameHeight, frameDepth), frameMaterial);

// Position the frame parts around the window
frameTop.position.set(6.96, 7 + 5, 0); // On top of the window
frameBottom.position.set(6.96, 7 - 5, 0); // Under the window
frameLeft.position.set(6.96, 7, 3); // On the left side of the window
frameRight.position.set(6.96, 7, -3); // On the right side of the window

frameTop.rotateY(Math.PI/2)
frameBottom.rotateY(Math.PI/2)

const slat1 = new THREE.Mesh( new THREE.BoxGeometry(6.2, frameDepth, frameDepth), frameMaterial)
const slat2 = new THREE.Mesh( new THREE.BoxGeometry(6.2, frameDepth, frameDepth), frameMaterial)
const slat3 = new THREE.Mesh( new THREE.BoxGeometry(frameWidth, frameHeight, frameDepth), frameMaterial)

slat1.position.set(6.97, 8.75, 0)
slat2.position.set(6.97, 5.25, 0)
slat3.position.set(6.9, 7, 0)
slat1.rotateY(Math.PI/2)
slat2.rotateY(Math.PI/2)
scene.add(slat1)
scene.add(slat2)
scene.add(slat3)


// Add the frame parts to the scene
scene.add(frameTop);
scene.add(frameBottom);
scene.add(frameLeft);
scene.add(frameRight);


const secondwallmesh = new THREE.Mesh(wallplanegeometry, material)
secondwallmesh.position.x = 7
//secondwallmesh.position.z = 7
secondwallmesh.position.y = 7
secondwallmesh.rotateY(1.57)


const wood_pattern = new THREE.TextureLoader().load("img/beautiful-wood-texture-background.jpg")
wood_pattern.wrapS = wood_pattern.wrapT = THREE.RepeatWrapping
wood_pattern.repeat.set(0,2)
const floormaterial = new THREE.MeshLambertMaterial(
    {color: 0xffffff, side: THREE.DoubleSide, metalness:0, roughness:0.5, map:wood_pattern, metalness:1}
)
const floorgeometry = new THREE.PlaneGeometry(14,14)
const floorMesh = new THREE.Mesh(floorgeometry, floormaterial)
floorMesh.rotateX(1.57)
//floorMesh.position.z=7
floorMesh.position.x = 0

scene.add(mesh)
scene.add(secondwallmesh)
scene.add(floorMesh)

const sizes ={
    width:window.innerWidth,
    height:window.innerHeight
  }

//cloud mesh 

let clouds =[];
let cloudMaterial;
function createCloud() {
    // Create cloud geometry
    const cloudGeometry = new THREE.BoxGeometry(8, 4, 4);


     cloudMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff, transparent: true, opacity: 0.7, emissive: 0xffffff, emissiveIntensity: 4 });

 
    const cloudMesh = new THREE.Mesh(cloudGeometry, cloudMaterial);

   
    cloudMesh.position.set(
        Math.random() * 90, 
        Math.random() * 8 + 15, 
        (Math.random() * -90 -10) )
        clouds.push(cloudMesh);
    
    return cloudMesh;
}


const numClouds = 20; 

for (let i = 0; i < numClouds; i++) {
    const cloud = createCloud();
    scene.add(cloud);
}


//lighting: 

// ambient cube light : 
const cubelight = new THREE.AmbientLight(0xffffff, 0.03)
scene.add(cubelight)

const pointlight = new THREE.PointLight(0xffffff, 100, 100)
const sphereSize = 1;
// const pointLightHelper = new THREE.PointLightHelper( pointlight, sphereSize );
// scene.add( pointLightHelper );

pointlight.position.x = -3
pointlight.position.y = 9
pointlight.position.z = 10

//scene.add(light)
scene.add(pointlight)

//window light 

const windowlight = new THREE.DirectionalLight(0xffffff, 1.2);
windowlight.position.set(6.9, 7, 1.5)
// const windowlighthelper = new THREE.DirectionalLightHelper(windowlight)
// scene.add(windowlighthelper)
scene.add(windowlight)

const windowlight2 = new THREE.SpotLight(0xb8e2f2, 1200, 17.3, 0.7, 0.3, 2.3)
windowlight2.position.set(6.99, 12, 2.9)
windowlight2.castShadow = true
scene.add(windowlight2)

const lightTarget = new THREE.Object3D();
// Set the position of the target where you want the light to focus
lightTarget.position.set(-3, -1, -6); // Adjust the position as needed

// Set the target for the SpotLight
windowlight2.target = lightTarget;

// Add the target to the scene (optional, but useful for visualization)
scene.add(lightTarget);


// const spotlighthelp = new THREE.SpotLightHelper(windowlight2)
// scene.add(spotlighthelp)


//camera 
const camera = new THREE.PerspectiveCamera(50, sizes.width/sizes.height);
camera.position.z = 25
camera.position.x= - 25
camera.position.y=20

scene.add(camera)

//renderer
const canvas = document.getElementsByClassName("webgl2")[0]
const renderer = new THREE.WebGLRenderer({ canvas })
renderer.setSize(sizes.width,sizes.height)

renderer.render(scene,camera)
renderer.setPixelRatio(3)
renderer.setClearColor(0xffffff, 0)

//window resizing
window.addEventListener('resize', ()=>{
    sizes.height = window.innerHeight;
    sizes.width = window.innerWidth;
  
    camera.updateProjectionMatrix()
    camera.aspect = sizes.width/sizes.height
    renderer.setSize(sizes.width, sizes.height)
  })

  //controls:

//timeline animation: 

const tl5 = gsap.timeline({defaults: {duration:1}})
tl5.fromTo('nav', {y:'-100%'}, {y:'0%'})
const tl2 = gsap.timeline({defaults:{duration:1, repeat:-1, yoyo:true}})
const tlC = gsap.timeline({defaults:{duration:5, repeat:-1, yoyo:true}})
tl5.fromTo('h1', {y:"1000%"}, {y:"0%"} )
tl5.fromTo('h3', {y:"1000%"}, {y:"0%"} )
tl2.fromTo('h3', {opacity:0}, {opacity:1})


// Function to animate clouds
function animateClouds() {
    clouds.forEach((cloud) => {
        const Duration = Math.random() * 2 +3; 
        const tl = gsap.timeline({ repeat: -1 , duration:Duration, yoyo:true, repeat:-1});

        tl.fromTo(cloud.material, { opacity: Math.random()*0.5}, {opacity: Math.random()*0.7});
        tl.fromTo(cloud.scale, { x: 1.2, y: 1.2, z: 1.2}, {x:1, y:1, z:1})
        const tl3 = gsap.timeline({defaults:{duration:4, repeat:-1, yoyo:true}})
        tl3.fromTo(cloud.position, {x:cloud.position.x, y:cloud.position.y, z:cloud.position.z}, {x:cloud.position.x + Math.random()*3, y:cloud.position.y +Math.random()*2, z:cloud.position.z + Math.random()*2})
    });
}

animateClouds();

const controls =  new OrbitControls(camera, canvas)
controls.enableDamping = true // dampened movement 
controls.enablePan = false;
controls.enableZoom = false; 
controls.target.set(0, 5, 0)
controls.autoRotate = true;
controls.autoRotateSpeed = 1;


const loop = () =>{
  controls.update() 
  renderer.render(scene, camera)

  window.requestAnimationFrame(loop)
}
loop()
