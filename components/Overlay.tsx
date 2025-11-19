"use client";

import { motion } from "framer-motion";
import { Github, Twitter, Linkedin, Mail, Terminal, Shield, Lock } from "lucide-react";

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.5,
        },
    },
};

const item = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0 },
};

export default function Overlay() {
    return (
        <main className="relative z-10 flex min-h-screen flex-col items-start justify-center p-8 md:p-24 pointer-events-none">
            <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="pointer-events-auto max-w-3xl border-l-4 border-cyan-500 bg-black/60 p-8 backdrop-blur-sm md:p-12"
            >
                <motion.div variants={item} className="mb-2 flex items-center gap-2 text-cyan-400">
                    <Terminal size={20} />
                    <span className="font-mono text-sm tracking-widest">SYSTEM_READY</span>
                </motion.div>

                <motion.h1
                    variants={item}
                    className="mb-2 font-mono text-5xl font-bold uppercase tracking-tighter text-white md:text-7xl"
                >
                    Gareth Grindal
                </motion.h1>

                <motion.h2 variants={item} className="mb-8 font-mono text-xl text-cyan-400 md:text-2xl">
                    [ Cybersecurity Professional ]
                </motion.h2>

                <motion.div variants={item} className="mb-10 max-w-xl space-y-4 text-gray-300 font-mono">
                    <p className="leading-relaxed">
                        <span className="text-cyan-500">{">"}</span> Securing digital frontiers with nearly two decades of operational experience.
                    </p>
                    <p className="leading-relaxed">
                        <span className="text-cyan-500">{">"}</span> Specializing in threat intelligence, network defense, and strategic security architecture.
                    </p>
                </motion.div>

                <motion.div variants={item} className="flex gap-6">
                    <SocialLink href="https://github.com" icon={<Github />} label="GitHub" />
                    <SocialLink href="https://twitter.com" icon={<Twitter />} label="Twitter" />
                    <SocialLink href="https://linkedin.com" icon={<Linkedin />} label="LinkedIn" />
                    <SocialLink href="mailto:hello@example.com" icon={<Mail />} label="Email" />
                </motion.div>
            </motion.div>

            {/* Decorative HUD Elements */}
            <div className="absolute top-8 left-8 text-cyan-500/50 font-mono text-xs">
                ID: 8472-ALPHA
                <br />
                SECURE_CONNECTION: ESTABLISHED
            </div>
            <div className="absolute bottom-8 right-8 text-cyan-500/50 font-mono text-xs text-right">
                SYS_STATUS: NOMINAL
                <br />
                UPTIME: 99.99%
            </div>
        </main>
    );
}

function SocialLink({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex h-12 w-12 items-center justify-center border border-cyan-500/30 bg-black/50 text-cyan-500 transition-all hover:bg-cyan-500/20 hover:border-cyan-400"
            aria-label={label}
        >
            <span className="h-5 w-5 transition-transform group-hover:scale-110">{icon}</span>
            {/* Corner accents */}
            <span className="absolute -top-1 -left-1 h-2 w-2 border-t border-l border-cyan-500 opacity-0 transition-opacity group-hover:opacity-100" />
            <span className="absolute -bottom-1 -right-1 h-2 w-2 border-b border-r border-cyan-500 opacity-0 transition-opacity group-hover:opacity-100" />
        </a>
    );
}
