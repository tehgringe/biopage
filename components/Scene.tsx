"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { PerspectiveCamera, Grid, Environment } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { useRef } from "react";
import * as THREE from "three";

function MovingGrid() {
    const gridRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (gridRef.current) {
            // Move the grid towards the camera to simulate forward movement
            gridRef.current.position.z = (state.clock.getElapsedTime() * 5) % 10;
        }
    });

    return (
        <group>
            {/* Main Grid */}
            <Grid
                ref={gridRef}
                position={[0, -1, 0]}
                args={[100, 100]} // Grid size
                cellSize={2}
                cellThickness={1}
                cellColor="#00ffff"
                sectionSize={10}
                sectionThickness={1.5}
                sectionColor="#00ffff"
                fadeDistance={50}
                fadeStrength={1.5}
                infiniteGrid
            />
            {/* Floor Reflection/Glow */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.1, 0]}>
                <planeGeometry args={[100, 100]} />
                <meshBasicMaterial color="#000000" />
            </mesh>
        </group>
    );
}

function Background() {
    return (
        <color attach="background" args={["#050505"]} />
    );
}

export default function Scene() {
    return (
        <div className="fixed inset-0 z-0">
            <Canvas gl={{ antialias: false }}>
                <Background />
                <fog attach="fog" args={["#050505", 5, 30]} />

                <PerspectiveCamera makeDefault position={[0, 2, 10]} fov={75} />

                <MovingGrid />

                <ambientLight intensity={0.2} />

                {/* Post Processing for the Neon Glow */}
                <EffectComposer>
                    <Bloom
                        luminanceThreshold={0}
                        mipmapBlur
                        intensity={1.5}
                        radius={0.6}
                    />
                </EffectComposer>
            </Canvas>
        </div>
    );
}
