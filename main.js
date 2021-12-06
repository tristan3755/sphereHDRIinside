import './style.css'

import * as THREE from 'three'
import {RGBELoader} from 'three/examples/jsm/loaders/RGBELoader'
import {FlakesTexture} from 'three/examples/jsm/textures/FlakesTexture'

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


/*camera.position.set(0,0,500)*/

/*const lumiere=new THREE.PointLight(0xffffff,0.01)
lumiere.position.set(550,0,550)
scene.add(lumiere)*/

/*construction sphere*/

let envmaploader= new THREE.PMREMGenerator(renderer)

new RGBELoader().setPath('./').load('abstract.hdr',(hdrmap)=>{

  let envmap=envmaploader.fromCubemap(hdrmap)
  let textures=new THREE.CanvasTexture(new FlakesTexture())
  textures.wrapS= THREE.RepeatWrapping
  textures.wrapT= THREE.RepeatWrapping
  textures.repeat.x=200
  textures.repeat.y=200
  
  const sphereMaterials={
    clearcoat: 1,
    clearcoatRoughness:1,
    metalness:1,
    roughness:1,
    color:0x1e272e,
    normalMap:textures,
    normalScale:new THREE.Vector2(0.15,0.15),
    envMap:envmap.texture,
    transparent: true,
  }
  
  let sphereConstruct=new THREE.SphereGeometry(305,200,200)
  let sphereMaterial=new THREE.MeshPhysicalMaterial(sphereMaterials)
  let sphere= new THREE.Mesh(sphereConstruct,sphereMaterial)
  scene.add(sphere)

  let orbit

document.addEventListener('mousemove',(e)=>{
let scale = -0.005
orbit.rotateY( e.movementX * scale );
orbit.rotateX( e.movementY * scale ); 
orbit.rotation.z = 0;
})

orbit = new THREE.Object3D();
orbit.rotation.order = "YXZ"; 
orbit.position.copy( sphere.position );
scene.add(orbit );

let cameraDistance = 420;
camera.position.z = cameraDistance;
orbit.add( camera );

})

/*construction sphere*/
/*const controls=new OrbitControls(camera,renderer.domElement)

controls.autoRotate=false
controls.autoRotateSpeed=1
controls.enableDamping=true*/
/*controls.enableZoom=false*/




function animate(){
   
  
  /*controls.update()*/

  renderer.render(scene,camera)
  requestAnimationFrame(animate)
  
}
  animate()