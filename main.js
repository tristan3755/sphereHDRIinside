import './style.css'

import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import {RGBELoader} from 'three/examples/jsm/loaders/RGBELoader'
import {FlakesTexture} from 'three/examples/jsm/textures/FlakesTexture'

const scene=new THREE.Scene()

const container=document.getElementById('divThree')

let camera=new THREE.PerspectiveCamera(50,window.innerWidth/window.innerHeight,0.1,1000)

const renderer=new THREE.WebGL1Renderer({
  canvas:container,
  alpha:true,
 antialias:true,
})

renderer.setPixelRatio(container.devicePixelRatio)
renderer.setSize(window.innerWidth,window.innerHeight)
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.25;
/*renderer.toneMapping = THREE.ReinhardToneMapping;*/
renderer.outputEncoding = THREE.sRGBEncoding;
/*renderer.autoClear = false;*/


camera.position.set(0,0,500)

const lumiere=new THREE.PointLight(0xffffff,0.5)
lumiere.position.set(50,0,150)
scene.add(lumiere)


/*construction sphere*/

let envmaploader= new THREE.PMREMGenerator(renderer)

new RGBELoader().setPath('./').load('photo_studio_loft_hall_4k.hdr',(hdrmap)=>{

  let envmap=envmaploader.fromCubemap(hdrmap)
  let textures=new THREE.CanvasTexture(new FlakesTexture())
  textures.wrapS= THREE.RepeatWrapping
  textures.wrapT= THREE.RepeatWrapping
  textures.repeat.x=10
  textures.repeat.y=6
  
  const sphereMaterials={
    clearcoat: 1,
    clearcoatRoughness:0.05,
    metalness:1,
    roughness:0.5,
    color:0x8418ca,
    normalMap:textures,
    normalScale:new THREE.Vector2(0.05,0.05),
    envMap:envmap.texture,
    transparent: true,
  }
  
  let sphereConstruct=new THREE.SphereGeometry(200,200,200)
  let sphereMaterial=new THREE.MeshPhysicalMaterial(sphereMaterials)
  let sphere= new THREE.Mesh(sphereConstruct,sphereMaterial)
  scene.add(sphere)
  
})

/*construction sphere*/
const controls=new OrbitControls(camera,renderer.domElement)

controls.autoRotate=true
controls.autoRotateSpeed=1
controls.enableDamping=true
/*controls.enableZoom=false*/

function animate(){
 
controls.update() 
renderer.render(scene,camera)
requestAnimationFrame(animate)

}
  
  animate()