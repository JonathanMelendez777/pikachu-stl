import * as THREE from '../src/three.module.js';

import Stats from '../src/stats.module.js';

import { STLLoader } from '../src/STLLoader.js';

let container, stats;

let camera, cameraTarget, scene, renderer;

init();
animate();

function init() {

    container = document.createElement('div');
    document.body.appendChild(container);

    camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 1, 15);
    camera.position.set(3, 0.15, 3);

    cameraTarget = new THREE.Vector3(0, - 0.25, 0);

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x72645b);
    scene.fog = new THREE.Fog(0x72645b, 2, 15);

    // Ground

    const plane = new THREE.Mesh(
        new THREE.PlaneGeometry(40, 40),
        new THREE.MeshPhongMaterial({ color: 0x999999, specular: 0x101010 })
    );
    plane.rotation.x = - Math.PI / 2;
    plane.position.y = - 0.5;
    scene.add(plane);

    plane.receiveShadow = true;


    // ASCII file

    const loader = new STLLoader();
    /*loader.load('../src/Pikachu_X_Kakashi.stl', function (geometry) {

        const material = new THREE.MeshPhongMaterial({ color: 0xff5533, specular: 0x111111, shininess: 200 });
        const mesh = new THREE.Mesh(geometry, material);

        mesh.position.set(0, - 0.25, 0.6);
        mesh.rotation.set(0, - Math.PI / 2, 0);
        mesh.scale.set(0.5, 0.5, 0.5);

        mesh.castShadow = true;
        mesh.receiveShadow = true;

        scene.add(mesh);

    });*/


    // Binary files

    const material = new THREE.MeshPhongMaterial({ color: 0xFFC733, specular: 0x111111, shininess: 200 });

    loader.load('../src/eva.stl', function (geometry) {

        const mesh = new THREE.Mesh(geometry, material);
        

        mesh.position.set(0, - 0.37, - 0.6);
        mesh.rotation.set(- Math.PI / 2, 0, 0);
        mesh.scale.set(0.0099, 0.0099, 0.0099);

        mesh.castShadow = true;
        mesh.receiveShadow = true;

        scene.add(mesh);

    });

    /*loader.load('../src/Pikachu_X_Kakashi.stl', function (geometry) {

        const mesh = new THREE.Mesh(geometry, material);

        mesh.position.set(0.136, - 0.37, - 0.6);
        mesh.rotation.set(- Math.PI / 2, 0.3, 0);
        mesh.scale.set(2, 2, 2);

        mesh.castShadow = true;
        mesh.receiveShadow = true;

        scene.add(mesh);

    });

    // Colored binary STL
    loader.load('../src/Pikachu_X_Kakashi.stl', function (geometry) {

        let meshMaterial = material;

        if (geometry.hasColors) {

            meshMaterial = new THREE.MeshPhongMaterial({ opacity: geometry.alpha, vertexColors: true });

        }

        const mesh = new THREE.Mesh(geometry, meshMaterial);

        mesh.position.set(0.5, 0.2, 0);
        mesh.rotation.set(- Math.PI / 2, Math.PI / 2, 0);
        mesh.scale.set(0.3, 0.3, 0.3);

        mesh.castShadow = true;
        mesh.receiveShadow = true;

        scene.add(mesh);

    });
*/

    // Lights

    scene.add(new THREE.HemisphereLight(0x443333, 0x111122));

    addShadowedLight(1, 1, 1, 0xffffff, 1.35);
    addShadowedLight(0.5, 1, - 1, 0xffaa00, 1);
    // renderer

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.outputEncoding = THREE.sRGBEncoding;

    renderer.shadowMap.enabled = true;

    container.appendChild(renderer.domElement);

    // stats

    stats = new Stats();
    container.appendChild(stats.dom);

    //

    window.addEventListener('resize', onWindowResize);

}

function addShadowedLight(x, y, z, color, intensity) {

    const directionalLight = new THREE.DirectionalLight(color, intensity);
    directionalLight.position.set(x, y, z);
    scene.add(directionalLight);

    directionalLight.castShadow = true;

    const d = 1;
    directionalLight.shadow.camera.left = - d;
    directionalLight.shadow.camera.right = d;
    directionalLight.shadow.camera.top = d;
    directionalLight.shadow.camera.bottom = - d;

    directionalLight.shadow.camera.near = 1;
    directionalLight.shadow.camera.far = 4;

    directionalLight.shadow.bias = - 0.002;

}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

}

function animate() {

    requestAnimationFrame(animate);

    render();
    stats.update();

}

function render() {

    const timer = Date.now() * 0.0005;

    camera.position.x = Math.cos(timer) * 3;
    camera.position.z = Math.sin(timer) * 3;

    camera.lookAt(cameraTarget);

    renderer.render(scene, camera);

}