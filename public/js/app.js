/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@studio-freight/lenis/dist/lenis.mjs":
/*!***********************************************************!*\
  !*** ./node_modules/@studio-freight/lenis/dist/lenis.mjs ***!
  \***********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Lenis)
/* harmony export */ });
function t(t,e,i){return Math.max(t,Math.min(e,i))}class Animate{advance(e){if(!this.isRunning)return;let i=!1;if(this.lerp)this.value=(s=this.value,o=this.to,n=60*this.lerp,r=e,function(t,e,i){return(1-i)*t+i*e}(s,o,1-Math.exp(-n*r))),Math.round(this.value)===this.to&&(this.value=this.to,i=!0);else{this.currentTime+=e;const s=t(0,this.currentTime/this.duration,1);i=s>=1;const o=i?1:this.easing(s);this.value=this.from+(this.to-this.from)*o}var s,o,n,r;this.onUpdate?.(this.value,i),i&&this.stop()}stop(){this.isRunning=!1}fromTo(t,e,{lerp:i=.1,duration:s=1,easing:o=(t=>t),onStart:n,onUpdate:r}){this.from=this.value=t,this.to=e,this.lerp=i,this.duration=s,this.easing=o,this.currentTime=0,this.isRunning=!0,n?.(),this.onUpdate=r}}class Dimensions{constructor({wrapper:t,content:e,autoResize:i=!0,debounce:s=250}={}){this.wrapper=t,this.content=e,i&&(this.debouncedResize=function(t,e){let i;return function(){let s=arguments,o=this;clearTimeout(i),i=setTimeout((function(){t.apply(o,s)}),e)}}(this.resize,s),this.wrapper===window?window.addEventListener("resize",this.debouncedResize,!1):(this.wrapperResizeObserver=new ResizeObserver(this.debouncedResize),this.wrapperResizeObserver.observe(this.wrapper)),this.contentResizeObserver=new ResizeObserver(this.debouncedResize),this.contentResizeObserver.observe(this.content)),this.resize()}destroy(){this.wrapperResizeObserver?.disconnect(),this.contentResizeObserver?.disconnect(),window.removeEventListener("resize",this.debouncedResize,!1)}resize=()=>{this.onWrapperResize(),this.onContentResize()};onWrapperResize=()=>{this.wrapper===window?(this.width=window.innerWidth,this.height=window.innerHeight):(this.width=this.wrapper.clientWidth,this.height=this.wrapper.clientHeight)};onContentResize=()=>{this.wrapper===window?(this.scrollHeight=this.content.scrollHeight,this.scrollWidth=this.content.scrollWidth):(this.scrollHeight=this.wrapper.scrollHeight,this.scrollWidth=this.wrapper.scrollWidth)};get limit(){return{x:this.scrollWidth-this.width,y:this.scrollHeight-this.height}}}class Emitter{constructor(){this.events={}}emit(t,...e){let i=this.events[t]||[];for(let t=0,s=i.length;t<s;t++)i[t](...e)}on(t,e){return this.events[t]?.push(e)||(this.events[t]=[e]),()=>{this.events[t]=this.events[t]?.filter((t=>e!==t))}}off(t,e){this.events[t]=this.events[t]?.filter((t=>e!==t))}destroy(){this.events={}}}const e=100/6;class VirtualScroll{constructor(t,{wheelMultiplier:e=1,touchMultiplier:i=1}){this.element=t,this.wheelMultiplier=e,this.touchMultiplier=i,this.touchStart={x:null,y:null},this.emitter=new Emitter,window.addEventListener("resize",this.onWindowResize,!1),this.onWindowResize(),this.element.addEventListener("wheel",this.onWheel,{passive:!1}),this.element.addEventListener("touchstart",this.onTouchStart,{passive:!1}),this.element.addEventListener("touchmove",this.onTouchMove,{passive:!1}),this.element.addEventListener("touchend",this.onTouchEnd,{passive:!1})}on(t,e){return this.emitter.on(t,e)}destroy(){this.emitter.destroy(),window.removeEventListener("resize",this.onWindowResize,!1),this.element.removeEventListener("wheel",this.onWheel,{passive:!1}),this.element.removeEventListener("touchstart",this.onTouchStart,{passive:!1}),this.element.removeEventListener("touchmove",this.onTouchMove,{passive:!1}),this.element.removeEventListener("touchend",this.onTouchEnd,{passive:!1})}onTouchStart=t=>{const{clientX:e,clientY:i}=t.targetTouches?t.targetTouches[0]:t;this.touchStart.x=e,this.touchStart.y=i,this.lastDelta={x:0,y:0},this.emitter.emit("scroll",{deltaX:0,deltaY:0,event:t})};onTouchMove=t=>{const{clientX:e,clientY:i}=t.targetTouches?t.targetTouches[0]:t,s=-(e-this.touchStart.x)*this.touchMultiplier,o=-(i-this.touchStart.y)*this.touchMultiplier;this.touchStart.x=e,this.touchStart.y=i,this.lastDelta={x:s,y:o},this.emitter.emit("scroll",{deltaX:s,deltaY:o,event:t})};onTouchEnd=t=>{this.emitter.emit("scroll",{deltaX:this.lastDelta.x,deltaY:this.lastDelta.y,event:t})};onWheel=t=>{let{deltaX:i,deltaY:s,deltaMode:o}=t;i*=1===o?e:2===o?this.windowWidth:1,s*=1===o?e:2===o?this.windowHeight:1,i*=this.wheelMultiplier,s*=this.wheelMultiplier,this.emitter.emit("scroll",{deltaX:i,deltaY:s,event:t})};onWindowResize=()=>{this.windowWidth=window.innerWidth,this.windowHeight=window.innerHeight}}class Lenis{constructor({wrapper:t=window,content:e=document.documentElement,wheelEventsTarget:i=t,eventsTarget:s=i,smoothWheel:o=!0,syncTouch:n=!1,syncTouchLerp:r=.075,touchInertiaMultiplier:l=35,duration:h,easing:a=(t=>Math.min(1,1.001-Math.pow(2,-10*t))),lerp:c=!h&&.1,infinite:d=!1,orientation:p="vertical",gestureOrientation:u="vertical",touchMultiplier:m=1,wheelMultiplier:v=1,autoResize:g=!0,__experimental__naiveDimensions:S=!1}={}){this.__isSmooth=!1,this.__isScrolling=!1,this.__isStopped=!1,this.__isLocked=!1,this.onVirtualScroll=({deltaX:t,deltaY:e,event:i})=>{if(i.ctrlKey)return;const s=i.type.includes("touch"),o=i.type.includes("wheel");if(this.options.syncTouch&&s&&"touchstart"===i.type&&!this.isStopped&&!this.isLocked)return void this.reset();const n=0===t&&0===e,r="vertical"===this.options.gestureOrientation&&0===e||"horizontal"===this.options.gestureOrientation&&0===t;if(n||r)return;let l=i.composedPath();if(l=l.slice(0,l.indexOf(this.rootElement)),l.find((t=>{var e,i,n,r,l;return(null===(e=t.hasAttribute)||void 0===e?void 0:e.call(t,"data-lenis-prevent"))||s&&(null===(i=t.hasAttribute)||void 0===i?void 0:i.call(t,"data-lenis-prevent-touch"))||o&&(null===(n=t.hasAttribute)||void 0===n?void 0:n.call(t,"data-lenis-prevent-wheel"))||(null===(r=t.classList)||void 0===r?void 0:r.contains("lenis"))&&!(null===(l=t.classList)||void 0===l?void 0:l.contains("lenis-stopped"))})))return;if(this.isStopped||this.isLocked)return void i.preventDefault();if(this.isSmooth=this.options.syncTouch&&s||this.options.smoothWheel&&o,!this.isSmooth)return this.isScrolling=!1,void this.animate.stop();i.preventDefault();let h=e;"both"===this.options.gestureOrientation?h=Math.abs(e)>Math.abs(t)?e:t:"horizontal"===this.options.gestureOrientation&&(h=t);const a=s&&this.options.syncTouch,c=s&&"touchend"===i.type&&Math.abs(h)>5;c&&(h=this.velocity*this.options.touchInertiaMultiplier),this.scrollTo(this.targetScroll+h,Object.assign({programmatic:!1},a?{lerp:c?this.options.syncTouchLerp:1}:{lerp:this.options.lerp,duration:this.options.duration,easing:this.options.easing}))},this.onNativeScroll=()=>{if(!this.__preventNextScrollEvent&&!this.isScrolling){const t=this.animatedScroll;this.animatedScroll=this.targetScroll=this.actualScroll,this.velocity=0,this.direction=Math.sign(this.animatedScroll-t),this.emit()}},window.lenisVersion="1.0.42",t!==document.documentElement&&t!==document.body||(t=window),this.options={wrapper:t,content:e,wheelEventsTarget:i,eventsTarget:s,smoothWheel:o,syncTouch:n,syncTouchLerp:r,touchInertiaMultiplier:l,duration:h,easing:a,lerp:c,infinite:d,gestureOrientation:u,orientation:p,touchMultiplier:m,wheelMultiplier:v,autoResize:g,__experimental__naiveDimensions:S},this.animate=new Animate,this.emitter=new Emitter,this.dimensions=new Dimensions({wrapper:t,content:e,autoResize:g}),this.toggleClassName("lenis",!0),this.velocity=0,this.isLocked=!1,this.isStopped=!1,this.isSmooth=n||o,this.isScrolling=!1,this.targetScroll=this.animatedScroll=this.actualScroll,this.options.wrapper.addEventListener("scroll",this.onNativeScroll,!1),this.virtualScroll=new VirtualScroll(s,{touchMultiplier:m,wheelMultiplier:v}),this.virtualScroll.on("scroll",this.onVirtualScroll)}destroy(){this.emitter.destroy(),this.options.wrapper.removeEventListener("scroll",this.onNativeScroll,!1),this.virtualScroll.destroy(),this.dimensions.destroy(),this.toggleClassName("lenis",!1),this.toggleClassName("lenis-smooth",!1),this.toggleClassName("lenis-scrolling",!1),this.toggleClassName("lenis-stopped",!1),this.toggleClassName("lenis-locked",!1)}on(t,e){return this.emitter.on(t,e)}off(t,e){return this.emitter.off(t,e)}setScroll(t){this.isHorizontal?this.rootElement.scrollLeft=t:this.rootElement.scrollTop=t}resize(){this.dimensions.resize()}emit(){this.emitter.emit("scroll",this)}reset(){this.isLocked=!1,this.isScrolling=!1,this.animatedScroll=this.targetScroll=this.actualScroll,this.velocity=0,this.animate.stop()}start(){this.isStopped&&(this.isStopped=!1,this.reset())}stop(){this.isStopped||(this.isStopped=!0,this.animate.stop(),this.reset())}raf(t){const e=t-(this.time||t);this.time=t,this.animate.advance(.001*e)}scrollTo(e,{offset:i=0,immediate:s=!1,lock:o=!1,duration:n=this.options.duration,easing:r=this.options.easing,lerp:l=!n&&this.options.lerp,onComplete:h,force:a=!1,programmatic:c=!0}={}){if(!this.isStopped&&!this.isLocked||a){if(["top","left","start"].includes(e))e=0;else if(["bottom","right","end"].includes(e))e=this.limit;else{let t;if("string"==typeof e?t=document.querySelector(e):(null==e?void 0:e.nodeType)&&(t=e),t){if(this.options.wrapper!==window){const t=this.options.wrapper.getBoundingClientRect();i-=this.isHorizontal?t.left:t.top}const s=t.getBoundingClientRect();e=(this.isHorizontal?s.left:s.top)+this.animatedScroll}}if("number"==typeof e){if(e+=i,e=Math.round(e),this.options.infinite?c&&(this.targetScroll=this.animatedScroll=this.scroll):e=t(0,e,this.limit),s)return this.animatedScroll=this.targetScroll=e,this.setScroll(this.scroll),this.reset(),void(null==h||h(this));if(!c){if(e===this.targetScroll)return;this.targetScroll=e}this.animate.fromTo(this.animatedScroll,e,{duration:n,easing:r,lerp:l,onStart:()=>{o&&(this.isLocked=!0),this.isScrolling=!0},onUpdate:(t,e)=>{this.isScrolling=!0,this.velocity=t-this.animatedScroll,this.direction=Math.sign(this.velocity),this.animatedScroll=t,this.setScroll(this.scroll),c&&(this.targetScroll=t),e||this.emit(),e&&(this.reset(),this.emit(),null==h||h(this),this.__preventNextScrollEvent=!0,requestAnimationFrame((()=>{delete this.__preventNextScrollEvent})))}})}}}get rootElement(){return this.options.wrapper===window?document.documentElement:this.options.wrapper}get limit(){return this.options.__experimental__naiveDimensions?this.isHorizontal?this.rootElement.scrollWidth-this.rootElement.clientWidth:this.rootElement.scrollHeight-this.rootElement.clientHeight:this.dimensions.limit[this.isHorizontal?"x":"y"]}get isHorizontal(){return"horizontal"===this.options.orientation}get actualScroll(){return this.isHorizontal?this.rootElement.scrollLeft:this.rootElement.scrollTop}get scroll(){return this.options.infinite?(t=this.animatedScroll,e=this.limit,(t%e+e)%e):this.animatedScroll;// removed by dead control flow
 var t, e; }get progress(){return 0===this.limit?1:this.scroll/this.limit}get isSmooth(){return this.__isSmooth}set isSmooth(t){this.__isSmooth!==t&&(this.__isSmooth=t,this.toggleClassName("lenis-smooth",t))}get isScrolling(){return this.__isScrolling}set isScrolling(t){this.__isScrolling!==t&&(this.__isScrolling=t,this.toggleClassName("lenis-scrolling",t))}get isStopped(){return this.__isStopped}set isStopped(t){this.__isStopped!==t&&(this.__isStopped=t,this.toggleClassName("lenis-stopped",t))}get isLocked(){return this.__isLocked}set isLocked(t){this.__isLocked!==t&&(this.__isLocked=t,this.toggleClassName("lenis-locked",t))}get className(){let t="lenis";return this.isStopped&&(t+=" lenis-stopped"),this.isLocked&&(t+=" lenis-locked"),this.isScrolling&&(t+=" lenis-scrolling"),this.isSmooth&&(t+=" lenis-smooth"),t}toggleClassName(t,e){this.rootElement.classList.toggle(t,e),this.emitter.emit("className change",this)}}
//# sourceMappingURL=lenis.mjs.map


/***/ }),

/***/ "./resources/css/app.css":
/*!*******************************!*\
  !*** ./resources/css/app.css ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./resources/js/app.js":
/*!*****************************!*\
  !*** ./resources/js/app.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _studio_freight_lenis__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @studio-freight/lenis */ "./node_modules/@studio-freight/lenis/dist/lenis.mjs");

var COLOR_A = 0x4da6ff; // Bleu clair glacé
var COLOR_B = 0x004aad; // Bleu nuit
var COLOR_C = 0xa020f0; // Violet mystique

// const COLOR_A = 0xff6ec7; // Bleu clair glacé
// const COLOR_B = 0x9b59b6; // Bleu nuit
// const COLOR_C = 0x3498db; // Violet mystique

// const color1 = new THREE.Color(0xff6ec7);
// // const color2 = new THREE.Color(0x9b59b6);
// // const color3 = new THREE.Color(0x3498db);

var lenis = new _studio_freight_lenis__WEBPACK_IMPORTED_MODULE_0__["default"]({
  duration: 1.2,
  // vitesse du scroll
  smooth: true // active le smooth scroll
});

// Update à chaque frame
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

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

// // Custom cursor
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
  planetSystemGroup.position.x = initialPlanetPosition.x;
  planetSystemGroup.position.y = initialPlanetPosition.y;
  planetSystemGroup.position.z = -eased * 20;
  planetSystemGroup.scale.setScalar(1 + eased * 2);
  planetSystemGroup.rotation.y = eased * Math.PI;
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
        value: new THREE.Color(COLOR_A)
      },
      colorB: {
        value: new THREE.Color(COLOR_B)
      },
      colorC: {
        value: new THREE.Color(COLOR_C)
      },
      opacity: {
        value: 1.0
      }
    },
    vertexShader: "\n      varying vec3 vPosition;\n      uniform float time;\n\n      void main() {\n          vPosition = position;\n\n          vec3 newPosition = position;\n          newPosition.x += sin(position.y * 10.0 + time) * 0.02;\n          newPosition.y += cos(position.x * 10.0 + time) * 0.02;\n\n          gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);\n      }\n    ",
    fragmentShader: "\n      uniform float time;\n      uniform vec3 colorA;\n      uniform vec3 colorB;\n      uniform vec3 colorC;\n      uniform float opacity;\n      varying vec3 vPosition;\n\n      void main() {\n          float noise = sin(vPosition.x * 5.0 + time)\n                      * cos(vPosition.y * 5.0 + time * 0.5) * 0.5 + 0.5;\n\n          vec3 color = mix(colorA, colorB, (vPosition.y + 1.0) / 2.0);\n          color = mix(color, colorC, noise);\n\n          float alpha = (0.8 + sin(time + vPosition.x * 2.0) * 0.2) * opacity;\n\n          gl_FragColor = vec4(color, alpha);\n      }\n    ",
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
  var color1 = new THREE.Color(COLOR_A);
  var color2 = new THREE.Color(COLOR_B);
  var color3 = new THREE.Color(COLOR_C);
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
      color: i === 0 ? COLOR_A : i === 1 ? COLOR_B : COLOR_C,
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
  var planetColors = [COLOR_A, COLOR_B, COLOR_C];
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

  // Planète centrale
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

  // Anneaux
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

  // Planètes orbitales
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

  // Particules
  if (particles) {
    particles.rotation.y += 0.0005;
    var positions = particles.geometry.attributes.position.array;
    for (var i = 0; i < positions.length; i += 3) {
      positions[i + 1] += Math.sin(elapsedTime + positions[i]) * 0.001;
    }
    particles.geometry.attributes.position.needsUpdate = true;
  }

  // Caméra
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
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
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