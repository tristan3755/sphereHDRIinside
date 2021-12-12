import './style.css'

import * as THREE from 'three'
import {RGBELoader} from 'three/examples/jsm/loaders/RGBELoader'
import {FlakesTexture} from 'three/examples/jsm/textures/FlakesTexture'
import gsap from 'gsap'
import hoverEffect from 'hover-effect'
/*landingpage*/
let portfolio=document.querySelector('header p:nth-child(1)')
let titre=document.querySelector('.titre')
let sect1=document.getElementById('sect1')
let grid=document.querySelector('.portfolioGrid')
let header=document.querySelector('header')
let retourPortfolio=document.querySelector('.retour')
let cadre=document.querySelector('.cadre')
/*landingpage*/
const scene=new THREE.Scene()

const container=document.getElementById('divThree')

let camera=new THREE.PerspectiveCamera(50,window.innerWidth/window.innerHeight,0.01,1000)

const renderer=new THREE.WebGL1Renderer({
  canvas:container,
  alpha:true,
 antialias:true,
})

renderer.setPixelRatio(container.devicePixelRatio)
renderer.setSize(window.innerWidth,window.innerHeight)
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1;
/*renderer.toneMapping = THREE.ReinhardToneMapping;*/
renderer.outputEncoding = THREE.sRGBEncoding;
/*renderer.autoClear = false;*/


/*const lumiere=new THREE.PointLight(0xffffff,0.01)
lumiere.position.set(550,0,550)
scene.add(lumiere)*/

/*construction sphere*/

let envmaploader= new THREE.PMREMGenerator(renderer)
new RGBELoader().setPath('./').load('custom4.hdr',(hdrmap)=>{

  let envmap=envmaploader.fromCubemap(hdrmap)
  let textures=new THREE.CanvasTexture(new FlakesTexture())
  textures.wrapS= THREE.RepeatWrapping
  textures.wrapT= THREE.RepeatWrapping
  textures.repeat.x=0
  textures.repeat.y=0
  
  const sphereMaterials={
    clearcoat: 1,
    clearcoatRoughness:0.4,
    metalness:1,
    roughness:0.4,
    /*color:0x1e272e,*/
    normalMap:textures,
    normalScale:new THREE.Vector2(0.85,0.85),
    envMap:envmap.texture,
    transparent: true,
  }
  
  let sphereConstruct=new THREE.SphereGeometry(55,55,55)
  let sphereMaterial=new THREE.MeshPhysicalMaterial(sphereMaterials)
  let sphere= new THREE.Mesh(sphereConstruct,sphereMaterial)
  scene.add(sphere)

  let orbit

document.addEventListener('mousemove',(e)=>{
let scale = -0.003
orbit.rotateY( e.movementX * scale );
orbit.rotateX( e.movementY * scale ); 
orbit.rotation.z = 0;
})

orbit = new THREE.Object3D();
orbit.rotation.order = "YXZ"; 
orbit.position.copy( sphere.position );
scene.add(orbit );

let cameraDistance = 70;
camera.position.z = cameraDistance;
orbit.add( camera );

function fadeAwayTitre(){
  sect1.removeChild(titre)
}
function returnTitre(){
  titre.style.transform='translateY(0vh)'
}
function transitionGrid(){
  grid.style.transform='translateY(0vh)';
}
function fadeAwayGrid(){
  grid.style.display='none'
}
portfolio.addEventListener('click',()=>{
  gsap.to(camera.position,{duration:5,y:-500})
  titre.style.transform='translateY(-100vh)'
  setTimeout(fadeAwayTitre,1000)
  grid.style.display='grid'
  sect1.removeChild(header)
  sect1.removeChild(cadre)
  setTimeout(hover,500)
  setTimeout(transitionGrid,500)
})

retourPortfolio.addEventListener("click",()=>{
  gsap.to(camera.position,{duration:5,y:0})
  sect1.appendChild(titre)
  setTimeout(returnTitre,1000)
  grid.style.transform='translateY(100vh)';
  setTimeout(fadeAwayGrid,1000)
  sect1.appendChild(header)
  sect1.appendChild(cadre)
})

})


function animate(){

  renderer.render(scene,camera)
  requestAnimationFrame(animate)
  
}
  animate()


/*hover effect*/
function hover(){
  if(!document.querySelector('.image canvas')){
new hoverEffect(
  {
    parent:document.querySelector('.image'),
    intensity:0.8,
    image1:'./metis.jpg',
    image2:'./metis2.jpg',
    displacementImage:'./heightMap.png',
    imagesRatio:0.55,
  },
)

}
if(!document.querySelector('.image1 canvas')){
new hoverEffect(
  
  {
    parent:document.querySelector('.image1'),
    intensity:0.8,
    image1:'./meteo.jpg',
    image2:'./meteo2.jpg',
    displacementImage:'./fluid.jpg',
    imagesRatio:0.5,
  }
)

}

if(!document.querySelector('.image2 canvas')){
new hoverEffect(
  {
    parent:document.querySelector('.image2'),
    intensity:0.8,
    image1:'./communart.jpg',
    image2:'./communart2.jpg',
    displacementImage:'./strip.png',
    imagesRatio:0.5,
  }
)

}

if(!document.querySelector('.image3 canvas')){
new hoverEffect(
  {
    parent:document.querySelector('.image3'),
    intensity:0.8,
    image1:'./community.jpg',
    image2:'./community2.jpg',
    displacementImage:'./ramen.jpg',
    imagesRatio:0.5,
  }
)
}
}