var clock = new THREE.Clock();
var delta = clock.getDelta(); // seconds.
var rotateAngle = Math.PI / 2 * delta;   // pi/2 radians (90 degrees) per second
var container, stats;

var camera, scene, renderer,effect;
var row_geom, stand_geom, modelGroup;

var mouseX = 0, mouseY = 0;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;


init();
animate();


function init() {

  var toonMaterial;
/*  var imgTexture = new THREE.TextureLoader().load( "https://github.com/mrdoob/three.js/tree/dev/examples/textures/planets/moon_1024.jpg" );
				imgTexture.wrapS = imgTexture.wrapT = THREE.RepeatWrapping;
				imgTexture.anisotropy = 16;
				imgTexture = null;
*/
  var toonMaterial = new THREE.MeshToonMaterial( {
								// map: imgTexture,
								//bumpMap: imgTexture,
								//bumpScale: 1,
								color: 0x4087ef,
								specular: 0x333333,
								reflectivity: 0.025,
								shininess: 1
								// envMap: 20
							} );
  container = document.createElement( 'div' );
  document.body.appendChild( container );

  camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 2000 );
  camera.position.z = 100;

  // scene

  scene = new THREE.Scene();

  // var ambient = new THREE.AmbientLight( 0x101030 );
  // scene.add( ambient );

  var directionalLight = new THREE.DirectionalLight( 0xffddee );
  directionalLight.position.set( 0, 0, 1 );
  scene.add( directionalLight );

  // texture

  var manager = new THREE.LoadingManager();
  manager.onProgress = function ( item, loaded, total ) {

    console.log( item, loaded, total );

  };

  modelGroup = new THREE.Object3D();

  // model
  var loader = new THREE.OBJLoader( manager );
  loader.load( 'assets/Stand.obj', function ( object ) {

    object.traverse( function ( child ) {

      if ( child instanceof THREE.Mesh ) {

        //child.material.map = texture;
        stand_geom = child.geometry;
        // var material = new THREE.MeshBasicMaterial( { color: 0x000000, wireframe: false } );
        stand = new THREE.Mesh(stand_geom,toonMaterial);
        stand.position.y = 7;
        modelGroup.add(stand);


      }

    } );
    } );
  loader.load( 'assets/Cubes.obj', function ( object ) {

    object.traverse( function ( child ) {

      if ( child instanceof THREE.Mesh ) {

        //child.material.map = texture;
        row_geom = child.geometry;
        // var material = new THREE.MeshBasicMaterial( { color: 0x000000, wireframe: false } );
        var r1 = new THREE.Mesh( row_geom, toonMaterial );
        var r2 = new THREE.Mesh( row_geom, toonMaterial );
        var r3 = new THREE.Mesh( row_geom, toonMaterial );
        r2.position.y = 7;
        r3.position.y = 14;
        modelGroup.add(r1);
        modelGroup.add(r2);
        modelGroup.add(r3);
        modelGroup.position.y = -45;
        scene.add(modelGroup);

      }

    } );

  } );

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize( window.innerWidth, window.innerHeight );

  renderer.setClearColor (0xefb31c, 1);
  container.appendChild( renderer.domElement );

  effect = new THREE.OutlineEffect( renderer );

  document.addEventListener( 'mousemove', onDocumentMouseMove, false );

  window.addEventListener( 'resize', onWindowResize, false );

}

function onWindowResize() {
  windowHalfX = window.innerWidth / 2;
  windowHalfY = window.innerHeight / 2;

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize( window.innerWidth, window.innerHeight );
}

function onDocumentMouseMove( event ) {
  mouseX = ( event.clientX - windowHalfX ) / 2;
  mouseY = ( event.clientY - windowHalfY ) / 2;
}

function animate() {
  requestAnimationFrame( animate );

  render();
}

function render() {
          // obj.rotation.x += (0.2*(Math.PI / 180));
          // obj.rotation.x %=360;

  if(modelGroup.children[1] && modelGroup.children[2] && modelGroup.children[3]){
  modelGroup.children[1].rotation.y+= 0.040 * mouseX/100;
  modelGroup.children[2].rotation.y+= 0.065 * mouseX/100;
  modelGroup.children[3].rotation.y+= 0.035 * mouseX/100;
  }
  camera.position.x += ( mouseX - camera.position.x ) * .005;
  camera.position.y += ( - mouseY - camera.position.y ) * .005;

  camera.lookAt( scene.position );

  // renderer.render( scene, camera );
  effect.render( scene, camera );
}
