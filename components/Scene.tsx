"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { useRef, useMemo } from "react";
import * as THREE from "three";

function ParticleField() {
    const count = 2000;
    const positions = useMemo(() => {
        const p = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            p[i * 3] = (Math.random() - 0.5) * 50; // x
            p[i * 3 + 1] = (Math.random() - 0.5) * 50; // y
            p[i * 3 + 2] = (Math.random() - 0.5) * 50; // z
        }
        return p;
    }, []);

    const ref = useRef<THREE.Points>(null);

    useFrame((state) => {
        if (ref.current) {
            // Move particles towards camera to simulate forward motion
            // We can achieve this by rotating the entire field or moving points
            // Simple rotation for "starfield" effect
            ref.current.rotation.z += 0.001;
            ref.current.rotation.x += 0.0005;
        }
    });

    return (
        <points ref={ref}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={count}
                    array={positions}
                    itemSize={3}
                    args={[positions, 3]}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.05}
                color="#00ffff"
                transparent
                opacity={0.4}
                sizeAttenuation
            />
        </points>
    );
}

function DigitalGlobe() {
    const points = useMemo(() => {
        const p = new Float32Array(4000 * 3); // Increased density
        for (let i = 0; i < 4000; i++) {
            const theta = THREE.MathUtils.randFloatSpread(360);
            const phi = THREE.MathUtils.randFloatSpread(360);

            const x = 4.5 * Math.sin(theta) * Math.cos(phi);
            const y = 4.5 * Math.sin(theta) * Math.sin(phi);
            const z = 4.5 * Math.cos(theta);

            p[i * 3] = x;
            p[i * 3 + 1] = y;
            p[i * 3 + 2] = z;
        }
        return p;
    }, []);

    const ref = useRef<THREE.Points>(null);
    const { mouse } = useThree();

    useFrame((state) => {
        if (ref.current) {
            // Auto rotation
            ref.current.rotation.y += 0.002;

            // Mouse interaction: subtle tilt based on mouse position
            // mouse.x and mouse.y are normalized (-1 to 1)
            const targetX = -mouse.y * 0.5; // Tilt up/down
            const targetY = mouse.x * 0.5;  // Turn left/right

            // Smoothly interpolate towards target
            ref.current.rotation.x = THREE.MathUtils.lerp(ref.current.rotation.x, targetX, 0.1);
            ref.current.rotation.z = THREE.MathUtils.lerp(ref.current.rotation.z, -mouse.x * 0.2, 0.1);
        }
    });

    return (
        <points ref={ref} position={[6, 0, -5]}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={points.length / 3}
                    array={points}
                    itemSize={3}
                    args={[points, 3]}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.04}
                color="#00ffff"
                transparent
                opacity={0.8}
                sizeAttenuation
            />
        </points>
    );
}

function CameraController() {
    const { mouse } = useThree();
    useFrame((state) => {
        // Parallax effect on camera
        const targetX = mouse.x * 0.5;
        const targetY = mouse.y * 0.5;

        state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, targetX, 0.05);
        state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, 1 + targetY, 0.05);
        state.camera.lookAt(0, 0, -10);
    });
    return null;
}

export default function Scene() {
    return (
        <div className="fixed inset-0 z-0">
            <Canvas gl={{ antialias: false }}>
                <color attach="background" args={["#050505"]} />
                {/* Volumetric-like fog for depth */}
                <fog attach="fog" args={["#050505", 5, 25]} />

                <PerspectiveCamera makeDefault position={[0, 1, 8]} fov={60} />
                <CameraController />

                <ParticleField />
                <DigitalGlobe />

                <ambientLight intensity={0.2} />
                <pointLight position={[10, 10, 10]} intensity={1} color="#00ffff" />

                <EffectComposer>
                    <Bloom
                        luminanceThreshold={0}
                        mipmapBlur
                        intensity={1.0}
                        radius={0.5}
                    />
                </EffectComposer>
            </Canvas>
        </div>
    );
}
