import React, { useEffect, useRef } from 'react';
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls';
import ThreeGlobe from 'three-globe';

import * as THREE from 'three';

// Copyright (c) 2019 Vasco Asturiano

const GlobeVisualization: React.FC = () => {
  const globeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      window.location.reload();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Gen random data
      const N = 30;
      const arcsData = [...Array(N).keys()].map(() => ({
        startLat: (Math.random() - 0.5) * 180,
        startLng: (Math.random() - 0.5) * 360,
        endLat: (Math.random() - 0.5) * 180,
        endLng: (Math.random() - 0.5) * 360,
        color: ['red', 'white', 'orange', 'green', 'blue'][Math.round(Math.random() * 4)],
      }));

      const Globe = new ThreeGlobe()
        .globeImageUrl('//unpkg.com/three-globe/example/img/earth-night.jpg')
        .arcsData(arcsData)
        .arcColor('color')
        .arcDashLength(0.4)
        .arcDashGap(4)
        .arcDashInitialGap(() => Math.random() * 5)
        .arcDashAnimateTime(1000);

      // Setup renderer
      const renderer = new THREE.WebGLRenderer();
      renderer.setSize(window.innerWidth, window.innerHeight);
      if (globeRef.current) globeRef.current.appendChild(renderer.domElement);

      // Setup scene
      const scene = new THREE.Scene();
      scene.add(Globe);
      scene.add(new THREE.AmbientLight(0xcccccc));
      scene.add(new THREE.DirectionalLight(0xffffff, 0.6));

      // Setup camera
      const camera = new THREE.PerspectiveCamera();
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      camera.position.z = 300;

      // Add camera controls
      const tbControls = new TrackballControls(camera, renderer.domElement);
      tbControls.minDistance = 101;
      tbControls.rotateSpeed = 5;
      tbControls.zoomSpeed = 0; // Set zoomSpeed to 0 to disable zoom

      // Kick-off renderer
      const animate = () => {
        tbControls.update();
        renderer.render(scene, camera);
        requestAnimationFrame(animate);
      };

      animate();

      return () => {
        // Clean up on component unmount
        renderer.dispose();
        tbControls.dispose();
      };
    }
  }, []);

  return <div id="globeViz" ref={globeRef} />;
};

export default GlobeVisualization;
