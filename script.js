
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

// import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'





const canvas = document.querySelector('canvas.webgl')

const sizes = {
    width:window.innerWidth,
    height: window.innerHeight
}

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)

camera.position.z = 10
scene.add(camera)
scene.background = new THREE.Color( 0xdddddd );

// const dracoLoader = new DRACOLoader()
// dracoLoader.setDecoderPath('draco/')

const gltfLoader = new GLTFLoader()
// gltfLoader.setDRACOLoader(dracoLoader)

// var spotLight = new THREE.SpotLight( 0xffffff )
// const helper = new THREE.DirectionalLightHelper(spotLight,3)

// spotLight.position.set(0,10,-10)

// console.log(spotLight)
// scene.add(spotLight ,helper)



// const light = new THREE.PointLight( 0xffffff,700 ,0,1.5 );
// light.position.set(0,20,-10)
// scene.add( light );


// const light = new THREE.AmbientLight( 0xffffff ,1 ); // soft white light
// scene.add( light );

const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
directionalLight.position.set(0,60,-10)
// directionalLight.shadow =true
const helper2 = new THREE.DirectionalLightHelper(directionalLight,3)
scene.add( directionalLight  , helper2) ;

var sl = new THREE.SpotLight(0xffffff ,100)
 sl.position.set(0,8,2)
 const helper = new THREE.DirectionalLightHelper(sl,3)
scene.add(sl ,helper)

 let car ;

 gltfLoader.load(
    'car.glb',
      async(gltf) =>{
         scene.add(gltf.scene)
        console.log('car' , gltf.scene.children[0])
        car =  gltf.scene.children[0]
        


        
    }
)

const cursor ={x:0, y:0}
window.addEventListener('mousemove', (event) =>
{
    cursor.x = event.clientX / sizes.width - 0.5
    cursor.y = -( event.clientY / sizes.width - 0.5)

    console.log('cursor.x' , cursor.x , 'cursor.y',cursor.y)
})


const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)

const controls = new OrbitControls(camera, canvas)






window.addEventListener('dblclick',() =>
{
    if(!document.fullscreenElement)
    {
        canvas.requestFullscreen()
    }
    else
    {
        document.exitFullscreen()
    }
})





window.addEventListener('resize', () => 
{
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()    

    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio,2))
})




   const  clock  = new THREE.Clock()





    
const animate = () =>
{
 
if(car){
  const time =  clock.getElapsedTime()
console.log('ok')
    car.rotation.z=time/5

}

    renderer.render(scene, camera)
    controls.update()

    window.requestAnimationFrame(animate)
    
}

animate()
