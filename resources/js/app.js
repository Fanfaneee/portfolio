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
let scene, camera, renderer, planet, particles, rings, orbitingPlanets = [];
let mouse = { x: 0, y: 0 };
let targetRotation = { x: 0, y: 0 };
let clock = new THREE.Clock();
let scrollY = 0;
let planetSystemGroup;
let initialPlanetPosition = { x: 2, y: 0, z: 0 };

// Custom cursor
const cursor = document.querySelector('.custom-cursor');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX - 10 + 'px';
    cursor.style.top = e.clientY - 10 + 'px';
    
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    
    cursor.classList.add('hover');
    setTimeout(() => cursor.classList.remove('hover'), 100);
});

// Gestion du scroll avec effet zoom-out
window.addEventListener('scroll', () => {
    scrollY = window.pageYOffset;
    const scrollProgress = Math.min(scrollY / window.innerHeight, 1);
    
    // Animation du texte de la section about
    const aboutContainer = document.querySelector('.about-container');
    if (scrollProgress > 0.3) {
        aboutContainer.classList.add('visible');
    }

    // Animation du texte hero
    const introSection = document.querySelector('.intro-section');
    introSection.style.transform = `translateY(${scrollProgress * -100}px) scale(${1 - scrollProgress * 0.2})`;
    introSection.style.opacity = 1 - scrollProgress;
    
    if (planetSystemGroup) {
        applyZoomOutEffect(scrollProgress);
    }
});

function applyZoomOutEffect(progress) {
    const eased = easeOutCubic(progress);
    
    // Effet zoom out : la planète s'éloigne rapidement vers l'arrière
    planetSystemGroup.position.x = initialPlanetPosition.x;
    planetSystemGroup.position.y = initialPlanetPosition.y;
    planetSystemGroup.position.z = -eased * 20;
    planetSystemGroup.scale.setScalar(1 + eased * 2);
    planetSystemGroup.rotation.y = eased * Math.PI;
    
    // Effet de transparence
    planetSystemGroup.traverse((child) => {
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
    const geometry = new THREE.SphereGeometry(1, 64, 64);
    
    const material = new THREE.ShaderMaterial({
        uniforms: {
            time: { value: 0 },
            colorA: { value: new THREE.Color(0xff6ec7) },
            colorB: { value: new THREE.Color(0x9b59b6) },
            colorC: { value: new THREE.Color(0x3498db) },
            opacity: { value: 1.0 }
        },
        vertexShader: `
            varying vec3 vPosition;
            uniform float time;
            
            void main() {
                vPosition = position;
                
                vec3 newPosition = position;
                newPosition.x += sin(position.y * 10.0 + time) * 0.02;
                newPosition.y += cos(position.x * 10.0 + time) * 0.02;
                
                gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
            }
        `,
        fragmentShader: `
            uniform float time;
            uniform vec3 colorA;
            uniform vec3 colorB;
            uniform vec3 colorC;
            uniform float opacity;
            varying vec3 vPosition;
            
            void main() {
                float noise = sin(vPosition.x * 5.0 + time) 
                            * cos(vPosition.y * 5.0 + time * 0.5) * 0.5 + 0.5;
                
                vec3 color = mix(colorA, colorB, (vPosition.y + 1.0) / 2.0);
                color = mix(color, colorC, noise);
                
                float alpha = (0.8 + sin(time + vPosition.x * 2.0) * 0.2) * opacity;
                
                gl_FragColor = vec4(color, alpha);
            }
        `,
        transparent: true
    });
    
    planet = new THREE.Mesh(geometry, material);
    planetSystemGroup.add(planet);
}

function createParticles() {
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 1500;
    
    const positions = new Float32Array(particlesCount * 3);
    const colors = new Float32Array(particlesCount * 3);
    
    const color1 = new THREE.Color(0xff6ec7);
    const color2 = new THREE.Color(0x9b59b6);
    const color3 = new THREE.Color(0x3498db);
    
    for (let i = 0; i < particlesCount * 3; i += 3) {
        positions[i] = (Math.random() - 0.5) * 15;
        positions[i + 1] = (Math.random() - 0.5) * 15;
        positions[i + 2] = (Math.random() - 0.5) * 15;
        
        const colorChoice = Math.random();
        let color;
        if (colorChoice < 0.33) color = color1;
        else if (colorChoice < 0.66) color = color2;
        else color = color3;
        
        colors[i] = color.r;
        colors[i + 1] = color.g;
        colors[i + 2] = color.b;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
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
    
    for (let i = 0; i < 3; i++) {
        const ringGeometry = new THREE.TorusGeometry(2 + i * 0.8, 0.02, 8, 64);
        const ringMaterial = new THREE.MeshBasicMaterial({
            color: i === 0 ? 0xff6ec7 : i === 1 ? 0x9b59b6 : 0x3498db,
            transparent: true,
            opacity: 0.4
        });
        
        const ring = new THREE.Mesh(ringGeometry, ringMaterial);
        ring.rotation.x = Math.random() * Math.PI;
        ring.rotation.y = Math.random() * Math.PI;
        
        rings.add(ring);
    }
    
    planetSystemGroup.add(rings);
}

function createOrbitingPlanets() {
    const planetColors = [0xff6ec7, 0x9b59b6, 0x3498db];
    const planetSizes = [0.15, 0.12, 0.1];
    const orbitRadii = [2, 2.8, 3.6];
    
    for (let i = 0; i < 3; i++) {
        const planetGeometry = new THREE.SphereGeometry(planetSizes[i], 32, 32);
        const planetMaterial = new THREE.MeshBasicMaterial({
            color: planetColors[i],
            transparent: true,
            opacity: 0.9
        });
        
        const orbitingPlanet = new THREE.Mesh(planetGeometry, planetMaterial);
        
        const glowGeometry = new THREE.SphereGeometry(planetSizes[i] * 1.3, 32, 32);
        const glowMaterial = new THREE.MeshBasicMaterial({
            color: planetColors[i],
            transparent: true,
            opacity: 0.2,
            side: THREE.BackSide
        });
        
        const glow = new THREE.Mesh(glowGeometry, glowMaterial);
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
    const starsGeometry = new THREE.BufferGeometry();
    const starsCount = 1000;
    
    const positions = new Float32Array(starsCount * 3);
    
    for (let i = 0; i < starsCount * 3; i += 3) {
        positions[i] = (Math.random() - 0.5) * 50;
        positions[i + 1] = (Math.random() - 0.5) * 50;
        positions[i + 2] = (Math.random() - 0.5) * 50;
    }
    
    starsGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    
    const starsMaterial = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 0.02,
        transparent: true,
        opacity: 0.8
    });
    
    const stars = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(stars);
}

function animate() {
    requestAnimationFrame(animate);
    
    const elapsedTime = clock.getElapsedTime();
    
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
        rings.children.forEach((ring, index) => {
            const baseSpeed = 0.005;
            
            switch(index) {
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
            
            const floatOffset = Math.sin(elapsedTime * (0.2 + index * 0.05)) * 0.01;
            ring.position.y = floatOffset;
        });
    }
    
    // Animation des planètes orbitales
    orbitingPlanets.forEach((orbitingPlanet, index) => {
        const userData = orbitingPlanet.userData;
        const correspondingRing = rings.children[userData.ringIndex];
        
        if (correspondingRing) {
            userData.angle += userData.orbitSpeed;
            
            let x = Math.cos(userData.angle) * userData.orbitRadius;
            let y = 0;
            let z = Math.sin(userData.angle) * userData.orbitRadius;
            
            const position = new THREE.Vector3(x, y, z);
            const ringRotation = correspondingRing.rotation;
            position.applyEuler(new THREE.Euler(ringRotation.x, ringRotation.y, ringRotation.z, 'XYZ'));
            
            position.x += Math.sin(elapsedTime * 0.2) * 0.05;
            position.y += Math.sin(elapsedTime * (0.2 + userData.ringIndex * 0.05)) * 0.01;
            
            orbitingPlanet.position.copy(position);
            orbitingPlanet.rotation.y += 0.03;
            orbitingPlanet.rotation.x += 0.015;
            
            const glow = orbitingPlanet.children[0];
            if (glow) {
                const pulseScale = 1 + Math.sin(elapsedTime * 3 + index * Math.PI * 0.5) * 0.15;
                glow.scale.setScalar(pulseScale);
            }
        }
    });
    
    // Animation des particules
    if (particles) {
        particles.rotation.y += 0.0005;
        
        const positions = particles.geometry.attributes.position.array;
        for (let i = 0; i < positions.length; i += 3) {
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