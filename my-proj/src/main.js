import './style.css'
import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 100, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );

const geometry = new THREE.BoxGeometry( 3, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff0 } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );
scene.background = new THREE.Color('white');

camera.position.z = 2;

function makeInstance(geometry, color, x, y, z) {
  const material = new THREE.MeshPhongMaterial({
    color,
    opacity: 0.5,
    transparent: true,
  });
 
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);
 
  cube.position.set(x, y, z);
  cube.rotation.x += 0.01;
	cube.rotation.y += 0.01;

	renderer.render( scene, camera );
  return cube;
}
function animate() {

	cube.rotation.x += 0.01;
	cube.rotation.y += 0.01;

	renderer.render( scene, camera );

}





function addLight(...pos) {
  const color = 0xFFFFFF;
  const intensity = 1;
  const light = new THREE.DirectionalLight(color, intensity);
  light.position.set(...pos);
  scene.add(light);
}
addLight(-1, 2, 4);
addLight( 1, -1, -2);



function hsl( h, s, l ) {

		return ( new THREE.Color() ).setHSL( h, s, l );

	}

	{

		const d = 0.8;
    makeInstance(geometry, hsl( 0 / 8, 1, .5 ), - d, - d, - d );
    makeInstance( geometry, hsl( 1 / 8, 1, .5 ),  d, - d, - d );
  }