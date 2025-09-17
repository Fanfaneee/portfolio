/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./resources/css/app.css":
/*!*******************************!*\
  !*** ./resources/css/app.css ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./resources/js/app.js":
/*!*****************************!*\
  !*** ./resources/js/app.js ***!
  \*****************************/
/***/ (() => {

/*import Lenis from '@studio-freight/lenis'

const lenis = new Lenis({
  duration: 1.2,   // vitesse du scroll
  smooth: true,    // active le smooth scroll
})

// Update à chaque frame
function raf(time) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}

requestAnimationFrame(raf)

*/

// Variables globales
var scene,
  camera,
  renderer,
  planet,
  particles,
  rings,
  orbitingPlanets = [];
var mouse = {
  x: 0,
  y: 0
};
var targetRotation = {
  x: 0,
  y: 0
};
var clock = new THREE.Clock();
var scrollY = 0;
var planetSystemGroup;
var initialPlanetPosition = {
  x: 2,
  y: 0,
  z: 0
};

// Custom cursor
var cursor = document.querySelector('.custom-cursor');
document.addEventListener('mousemove', function (e) {
  cursor.style.left = e.clientX - 10 + 'px';
  cursor.style.top = e.clientY - 10 + 'px';
  mouse.x = e.clientX / window.innerWidth * 2 - 1;
  mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
  cursor.classList.add('hover');
  setTimeout(function () {
    return cursor.classList.remove('hover');
  }, 100);
});

// Gestion du scroll avec effet zoom-out
window.addEventListener('scroll', function () {
  scrollY = window.pageYOffset;
  var scrollProgress = Math.min(scrollY / window.innerHeight, 1);

  // Animation du texte de la section about
  var aboutContainer = document.querySelector('.about-container');
  if (scrollProgress > 0.3) {
    aboutContainer.classList.add('visible');
  }

  // Animation du texte hero
  var introSection = document.querySelector('.intro-section');
  introSection.style.transform = "translateY(".concat(scrollProgress * -100, "px) scale(").concat(1 - scrollProgress * 0.2, ")");
  introSection.style.opacity = 1 - scrollProgress;
  if (planetSystemGroup) {
    applyZoomOutEffect(scrollProgress);
  }
});
function applyZoomOutEffect(progress) {
  var eased = easeOutCubic(progress);

  // Effet zoom out : la planète s'éloigne rapidement vers l'arrière
  planetSystemGroup.position.x = initialPlanetPosition.x;
  planetSystemGroup.position.y = initialPlanetPosition.y;
  planetSystemGroup.position.z = -eased * 20;
  planetSystemGroup.scale.setScalar(1 + eased * 2);
  planetSystemGroup.rotation.y = eased * Math.PI;

  // Effet de transparence
  planetSystemGroup.traverse(function (child) {
    if (child.material) {
      if (child.material.uniforms && child.material.uniforms.opacity) {
        child.material.uniforms.opacity.value = 1 - eased * 0.7;
      } else if (child.material.opacity !== undefined) {
        child.material.opacity = Math.max(0.1, 1 - eased * 0.7);
      }
    }
  });
}
function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}
function init() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 5;
  renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById('three-canvas'),
    antialias: true,
    alpha: true
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x000000, 0);
  planetSystemGroup = new THREE.Group();
  planetSystemGroup.position.set(initialPlanetPosition.x, initialPlanetPosition.y, initialPlanetPosition.z);
  scene.add(planetSystemGroup);
  createPlanet();
  createParticles();
  createRings();
  createOrbitingPlanets();
  createStars();
  animate();
}
function createPlanet() {
  var geometry = new THREE.SphereGeometry(1, 64, 64);
  var material = new THREE.ShaderMaterial({
    uniforms: {
      time: {
        value: 0
      },
      colorA: {
        value: new THREE.Color(0xff6ec7)
      },
      colorB: {
        value: new THREE.Color(0x9b59b6)
      },
      colorC: {
        value: new THREE.Color(0x3498db)
      },
      opacity: {
        value: 1.0
      }
    },
    vertexShader: "\n            varying vec3 vPosition;\n            uniform float time;\n            \n            void main() {\n                vPosition = position;\n                \n                vec3 newPosition = position;\n                newPosition.x += sin(position.y * 10.0 + time) * 0.02;\n                newPosition.y += cos(position.x * 10.0 + time) * 0.02;\n                \n                gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);\n            }\n        ",
    fragmentShader: "\n            uniform float time;\n            uniform vec3 colorA;\n            uniform vec3 colorB;\n            uniform vec3 colorC;\n            uniform float opacity;\n            varying vec3 vPosition;\n            \n            void main() {\n                float noise = sin(vPosition.x * 5.0 + time) \n                            * cos(vPosition.y * 5.0 + time * 0.5) * 0.5 + 0.5;\n                \n                vec3 color = mix(colorA, colorB, (vPosition.y + 1.0) / 2.0);\n                color = mix(color, colorC, noise);\n                \n                float alpha = (0.8 + sin(time + vPosition.x * 2.0) * 0.2) * opacity;\n                \n                gl_FragColor = vec4(color, alpha);\n            }\n        ",
    transparent: true
  });
  planet = new THREE.Mesh(geometry, material);
  planetSystemGroup.add(planet);
}
function createParticles() {
  var particlesGeometry = new THREE.BufferGeometry();
  var particlesCount = 1500;
  var positions = new Float32Array(particlesCount * 3);
  var colors = new Float32Array(particlesCount * 3);
  var color1 = new THREE.Color(0xff6ec7);
  var color2 = new THREE.Color(0x9b59b6);
  var color3 = new THREE.Color(0x3498db);
  for (var i = 0; i < particlesCount * 3; i += 3) {
    positions[i] = (Math.random() - 0.5) * 15;
    positions[i + 1] = (Math.random() - 0.5) * 15;
    positions[i + 2] = (Math.random() - 0.5) * 15;
    var colorChoice = Math.random();
    var color = void 0;
    if (colorChoice < 0.33) color = color1;else if (colorChoice < 0.66) color = color2;else color = color3;
    colors[i] = color.r;
    colors[i + 1] = color.g;
    colors[i + 2] = color.b;
  }
  particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  var particlesMaterial = new THREE.PointsMaterial({
    size: 0.05,
    vertexColors: true,
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending
  });
  particles = new THREE.Points(particlesGeometry, particlesMaterial);
  planetSystemGroup.add(particles);
}
function createRings() {
  rings = new THREE.Group();
  for (var i = 0; i < 3; i++) {
    var ringGeometry = new THREE.TorusGeometry(2 + i * 0.8, 0.02, 8, 64);
    var ringMaterial = new THREE.MeshBasicMaterial({
      color: i === 0 ? 0xff6ec7 : i === 1 ? 0x9b59b6 : 0x3498db,
      transparent: true,
      opacity: 0.4
    });
    var ring = new THREE.Mesh(ringGeometry, ringMaterial);
    ring.rotation.x = Math.random() * Math.PI;
    ring.rotation.y = Math.random() * Math.PI;
    rings.add(ring);
  }
  planetSystemGroup.add(rings);
}
function createOrbitingPlanets() {
  var planetColors = [0xff6ec7, 0x9b59b6, 0x3498db];
  var planetSizes = [0.15, 0.12, 0.1];
  var orbitRadii = [2, 2.8, 3.6];
  for (var i = 0; i < 3; i++) {
    var planetGeometry = new THREE.SphereGeometry(planetSizes[i], 32, 32);
    var planetMaterial = new THREE.MeshBasicMaterial({
      color: planetColors[i],
      transparent: true,
      opacity: 0.9
    });
    var orbitingPlanet = new THREE.Mesh(planetGeometry, planetMaterial);
    var glowGeometry = new THREE.SphereGeometry(planetSizes[i] * 1.3, 32, 32);
    var glowMaterial = new THREE.MeshBasicMaterial({
      color: planetColors[i],
      transparent: true,
      opacity: 0.2,
      side: THREE.BackSide
    });
    var glow = new THREE.Mesh(glowGeometry, glowMaterial);
    orbitingPlanet.add(glow);
    orbitingPlanet.userData = {
      orbitRadius: orbitRadii[i],
      orbitSpeed: 0.01 / (i + 1),
      angle: Math.random() * Math.PI * 2,
      ringIndex: i
    };
    orbitingPlanets.push(orbitingPlanet);
    planetSystemGroup.add(orbitingPlanet);
  }
}
function createStars() {
  var starsGeometry = new THREE.BufferGeometry();
  var starsCount = 1000;
  var positions = new Float32Array(starsCount * 3);
  for (var i = 0; i < starsCount * 3; i += 3) {
    positions[i] = (Math.random() - 0.5) * 50;
    positions[i + 1] = (Math.random() - 0.5) * 50;
    positions[i + 2] = (Math.random() - 0.5) * 50;
  }
  starsGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  var starsMaterial = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 0.02,
    transparent: true,
    opacity: 0.8
  });
  var stars = new THREE.Points(starsGeometry, starsMaterial);
  scene.add(stars);
}
function animate() {
  requestAnimationFrame(animate);
  var elapsedTime = clock.getElapsedTime();

  // Animation de la planète centrale
  if (planet) {
    planet.material.uniforms.time.value = elapsedTime;
    planet.rotation.y += 0.005;
    targetRotation.x = mouse.y * 0.3;
    targetRotation.y = mouse.x * 0.3;
    planet.rotation.x += (targetRotation.x - planet.rotation.x) * 0.03;
    planet.rotation.z += (targetRotation.y - planet.rotation.z) * 0.03;
    planet.position.y = Math.sin(elapsedTime * 0.5) * 0.1 + Math.cos(elapsedTime * 0.3) * 0.05;
    planet.position.x = Math.sin(elapsedTime * 0.2) * 0.05;
  }

  // Animation des anneaux
  if (rings) {
    rings.children.forEach(function (ring, index) {
      var baseSpeed = 0.005;
      switch (index) {
        case 0:
          ring.rotation.y += baseSpeed * 1.5;
          break;
        case 1:
          ring.rotation.y += baseSpeed * 1.2;
          ring.rotation.z += baseSpeed * 0.3;
          break;
        case 2:
          ring.rotation.x += baseSpeed;
          ring.rotation.z += baseSpeed * 0.5;
          break;
      }
      ring.rotation.x += mouse.y * 0.0002 * (index + 1);
      ring.rotation.y += mouse.x * 0.0002 * (index + 1);
      var floatOffset = Math.sin(elapsedTime * (0.2 + index * 0.05)) * 0.01;
      ring.position.y = floatOffset;
    });
  }

  // Animation des planètes orbitales
  orbitingPlanets.forEach(function (orbitingPlanet, index) {
    var userData = orbitingPlanet.userData;
    var correspondingRing = rings.children[userData.ringIndex];
    if (correspondingRing) {
      userData.angle += userData.orbitSpeed;
      var x = Math.cos(userData.angle) * userData.orbitRadius;
      var y = 0;
      var z = Math.sin(userData.angle) * userData.orbitRadius;
      var position = new THREE.Vector3(x, y, z);
      var ringRotation = correspondingRing.rotation;
      position.applyEuler(new THREE.Euler(ringRotation.x, ringRotation.y, ringRotation.z, 'XYZ'));
      position.x += Math.sin(elapsedTime * 0.2) * 0.05;
      position.y += Math.sin(elapsedTime * (0.2 + userData.ringIndex * 0.05)) * 0.01;
      orbitingPlanet.position.copy(position);
      orbitingPlanet.rotation.y += 0.03;
      orbitingPlanet.rotation.x += 0.015;
      var glow = orbitingPlanet.children[0];
      if (glow) {
        var pulseScale = 1 + Math.sin(elapsedTime * 3 + index * Math.PI * 0.5) * 0.15;
        glow.scale.setScalar(pulseScale);
      }
    }
  });

  // Animation des particules
  if (particles) {
    particles.rotation.y += 0.0005;
    var positions = particles.geometry.attributes.position.array;
    for (var i = 0; i < positions.length; i += 3) {
      positions[i + 1] += Math.sin(elapsedTime + positions[i]) * 0.001;
    }
    particles.geometry.attributes.position.needsUpdate = true;
  }

  // Interaction caméra avec souris
  camera.position.x += (mouse.x * 0.5 - camera.position.x) * 0.02;
  camera.position.y += (mouse.y * 0.5 - camera.position.y) * 0.02;
  camera.lookAt(scene.position);
  renderer.render(scene, camera);
}
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener('resize', onWindowResize);

// Initialiser quand le DOM est chargé
document.addEventListener('DOMContentLoaded', init);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"/js/app": 0,
/******/ 			"css/app": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunk"] = self["webpackChunk"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	__webpack_require__.O(undefined, ["css/app"], () => (__webpack_require__("./resources/js/app.js")))
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["css/app"], () => (__webpack_require__("./resources/css/app.css")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;