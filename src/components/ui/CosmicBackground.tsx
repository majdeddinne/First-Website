import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const CosmicBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000); // Pure black background

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    // Initialize renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Create particle geometry
    const particlesGeometry = new THREE.BufferGeometry();
    const particleCount = 500; // Reduced particle count to 500
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 20; // Increased spread on the X-axis
      positions[i + 1] = (Math.random() - 0.5) * 20; // Increased spread on the Y-axis
      positions[i + 2] = (Math.random() - 0.5) * 20; // Increased spread on the Z-axis
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    // Create particle material
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.03, // Smaller particle size for less brightness
      color: 0xffffff, // White color
      transparent: true,
      blending: THREE.AdditiveBlending, // Additive blending for glow effect
    });

    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    // Animation
    const animate = () => {
      if (!rendererRef.current) return;

      particles.rotation.y += 0.0005;
      particles.rotation.x += 0.0002;

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    // Handle resize
    const handleResize = () => {
      if (!rendererRef.current) return;

      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (rendererRef.current && containerRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement);
        rendererRef.current.dispose();
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 -z-10 pointer-events-none"
      style={{ opacity: 0.8 }}
    />
  );
};

export default CosmicBackground;