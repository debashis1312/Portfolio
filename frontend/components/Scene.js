"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";

// Fixed full-screen three.js background: wireframe torus knot + star field,
// reacting to mouse movement and page scroll.
export default function Scene() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, innerWidth / innerHeight, 0.1, 100);
    camera.position.z = 6;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    renderer.setSize(innerWidth, innerHeight);
    el.appendChild(renderer.domElement);

    const knot = new THREE.Mesh(
      new THREE.TorusKnotGeometry(1.2, 0.34, 180, 24),
      new THREE.MeshBasicMaterial({ color: 0x7c5cff, wireframe: true, transparent: true, opacity: 0.55 })
    );
    scene.add(knot);

    const N = 1800;
    const pos = new Float32Array(N * 3).map(() => (Math.random() - 0.5) * 30);
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    const stars = new THREE.Points(geo, new THREE.PointsMaterial({ size: 0.035, color: 0x37e6ff }));
    scene.add(stars);

    let mx = 0, my = 0, sy = 0, raf;
    const onMove = (e) => { mx = e.clientX / innerWidth - 0.5; my = e.clientY / innerHeight - 0.5; };
    const onScroll = () => { sy = scrollY / innerHeight; };
    const onResize = () => {
      camera.aspect = innerWidth / innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(innerWidth, innerHeight);
    };
    addEventListener("mousemove", onMove);
    addEventListener("scroll", onScroll);
    addEventListener("resize", onResize);

    const clock = new THREE.Clock();
    const loop = () => {
      const t = clock.getElapsedTime();
      knot.rotation.x = t * 0.15 + my * 1.2;
      knot.rotation.y = t * 0.22 + mx * 1.2;
      knot.position.x = Math.sin(sy * 1.4) * 2.6;
      knot.position.y = Math.cos(sy * 1.1) * 0.8;
      stars.rotation.y = t * 0.015 + sy * 0.25;
      camera.position.z = 6 + Math.min(sy, 5) * 0.4;
      renderer.render(scene, camera);
      raf = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      cancelAnimationFrame(raf);
      removeEventListener("mousemove", onMove);
      removeEventListener("scroll", onScroll);
      removeEventListener("resize", onResize);
      renderer.dispose();
      el.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={ref} className="scene" aria-hidden="true" />;
}
