"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { PerspectiveCamera, OrbitControls } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { useRef, useMemo } from "react";
import * as THREE from "three";

function DigitalGlobe() {
    const points = useMemo(() => {
        const p = new Float32Array(3000 * 3);
        for (let i = 0; i < 3000; i++) {
            const theta = THREE.MathUtils.randFloatSpread(360);
            const phi = THREE.MathUtils.randFloatSpread(360);

            const x = 4 * Math.sin(theta) * Math.cos(phi);
            const y = 4 * Math.sin(theta) * Math.sin(phi);
            const z = 4 * Math.cos(theta);

            p[i * 3] = x;
            p[i * 3 + 1] = y;
            p[i * 3 + 2] = z;
        }
        return p;
    }, []);

    const ref = useRef<THREE.Points>(null);

    useFrame((state) => {
        if (ref.current) {
            ref.current.rotation.y = state.clock.getElapsedTime() * 0.1;
            ref.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.2) * 0.1;
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
                size={0.05}
                color="#00ffff"
                transparent
                opacity={0.6}
                sizeAttenuation
            />
        </points>
    );
}

function CameraController() {
    useFrame((state) => {
        // Subtle camera orbit
        const t = state.clock.getElapsedTime();
        state.camera.position.x = Math.sin(t * 0.1) * 2;
        state.camera.lookAt(0, 0, -10);
    });
    return null;
}

export default function Scene() {
    return (
        <div className="fixed inset-0 z-0">
            <Canvas gl={{ antialias: false }}>
                <color attach="background" args={["#050505"]} />
                <fog attach="fog" args={["#050505", 5, 40]} />

                <PerspectiveCamera makeDefault position={[0, 1, 8]} fov={60} />
                <CameraController />

                <DigitalGlobe />

                <ambientLight intensity={0.2} />
                <pointLight position={[10, 10, 10]} intensity={1} color="#00ffff" />

                <EffectComposer>
                    <Bloom
                        luminanceThreshold={0}
                        mipmapBlur
                        intensity={1.2}
                        radius={0.5}
                    />
                </EffectComposer>
            </Canvas>
        </div>
    );
}
