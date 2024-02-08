import * as THREE from "three"; 
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import { gsap } from "gsap";
// Create a scene
const scene = new THREE.Scene();


// Create a sphere geometry
const geometry = new THREE.SphereGeometry(3, 64, 64); // Parameters: radius, widthSegments, heightSegments

// Create a standard material with a color
const material = new THREE.MeshStandardMaterial({ color: 0x00ff83,
roughness:0.3, metalness:0.6}); 

// Create a mesh by combining the geometry and material
const mesh = new THREE.Mesh(geometry, material);

// Add the mesh to the scene
scene.add(mesh);

// sizes - adjust how we want our rendering to fit the screen/viewport
// extract the height of the viewport

const sizes ={
  width:window.innerWidth,
  height:window.innerHeight
}


// Adding light to the scene
const Light = new THREE.PointLight(0xffffff, 85,  100); // White point light
// parameters: (color, intensity, distance)
Light.position.set(5, 10, 10); // Set position of the light - (10 up, 10 away )
// x-axis values only really matter if the shape is more complex or there is a inhomogeneous background 
scene.add(Light);
// adding ambient light

const light = new THREE.AmbientLight( 0x2551550, 5 ); 
scene.add( light );

// Adding a camera - the "viewpoint" of our 3D scene
const camera = new THREE.PerspectiveCamera(45, sizes.width/sizes.height); // Parameters: fieldOfView, aspectRatio, near, far
camera.position.z = 20; // Set the camera position
scene.add(camera)

// Create a renderer
const canvas = document.getElementsByClassName("webgl")[0]; 
const renderer = new THREE.WebGLRenderer({ canvas });
// Set renderer size
renderer.setSize(sizes.width, sizes.height);
// Render the scene with the camera
renderer.render(scene, camera);

// decrease pixelation of the object:
renderer.setPixelRatio(2) // default is 1


//Resizing:
// when the screen is resized - we need to account for this and make sure that the camera aspect and the renderer conform to this new sizing
window.addEventListener('resize', ()=>{
  sizes.height = window.innerHeight;
  sizes.width = window.innerWidth;

  camera.updateProjectionMatrix()
  camera.aspect = sizes.width/sizes.height
  renderer.setSize(sizes.width, sizes.height)
})
// this is a fix for it - but it will stretch and squish the scene, as it works on the basis of the 
// scene being only rendered initially to the initial screen size

// essentially we have only rendered the scene once at the start after a refresh - 
// so we need a loop to fix this, so that the re-render of the scene happens as the page is resized

// ADDING CONTROLS FOR OBJECT MOVEMENT 

// Controls

const controls =  new OrbitControls(camera, canvas)
controls.enableDamping = true // dampened movement 
controls.enablePan = false;
controls.enableZoom = false;  // these stop the user from zooming in and not seeing the nav
// stops zooming into the object

// allowing auto rotation:
controls.autoRotate = true
controls.autoRotateSpeed = 5

const loop = () =>{
  controls.update() //  ensures that animation keeps going after we let go 
  // this gives more realistic movement and is based on the speed of dragging

  renderer.render(scene, camera)
  window.requestAnimationFrame(loop)

}
loop()
// this means there is a constant re-render 


// ADDING ANIMATIONS USING GSAP: 

//TIMELINE MAGIC

const tl = gsap.timeline({defaults: {duration:1}})

// animating a change of scale for the mesh/object
tl.fromTo(mesh.scale, {z:0, x:0, y:0}, {z:1, x:1, y:1})
// paramters : (<object>, <start state>, <to state>)

// Code above -> essentially when the page first loads, the object is going to have no size 
// to having it's original size -> essentially zooming the object into view

// then make the nav come down 

tl.fromTo('nav', {y:'-100%'}, {y:'0%'})
tl.fromTo('h1', {opacity:0}, {opacity:1})

// mouse animation colour 
// change colour of mouse when you're dragging the object

let mousedown = false
let rgb = []
window.addEventListener('mousedown', ()=>{
  mousedown = true
})
window.addEventListener('mouseup', ()=>{
  mousedown = false
})

window.addEventListener('mousemove', (e)=>{
  if(mousedown){
    // this takes the position of the mouse on the page and converts it to rgb values between 0 and 256 
    rgb = [Math.round((e.pageX/sizes.width)*255),Math.round((e.pageY/sizes.height)*255), 200 ]


    let newColour = new THREE.Color(`rgb(${rgb.join(",")})`)
    gsap.to(mesh.material.color, {
      r:newColour.r,
      g:newColour.g,
      b:newColour.b
    })
  }
  
})



