"use client";

import { motion } from "framer-motion";
import { Github, Twitter, Linkedin, Mail, Terminal, Shield, Globe, Cpu } from "lucide-react";

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
    hidden: { opacity: 0, x: -50 },
    show: { opacity: 1, x: 0 },
};

export default function Overlay() {
    return (
        <main className="relative z-10 flex min-h-screen flex-col items-start justify-center p-8 md:p-24 pointer-events-none">
            <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="pointer-events-auto max-w-4xl"
            >
                {/* Header / Status - REMOVED */}

                {/* Name */}
                <motion.h1
                    variants={item}
                    className="mb-2 font-mono text-6xl font-black uppercase tracking-tighter text-white md:text-8xl drop-shadow-[0_0_15px_rgba(0,255,255,0.5)]"
                >
                    Gareth Grindal
                </motion.h1>

                {/* Role */}
                <motion.h2 variants={item} className="mb-12 font-mono text-2xl text-cyan-300 md:text-3xl tracking-widest">
                    // NATIONAL THREAT HUNTING & STRATEGY
                </motion.h2>

                {/* Credentials List - The "Wow" Factor */}
                <motion.div variants={item} className="mb-16 space-y-8">
                    <CredentialItem
                        icon={<Globe className="text-purple-400" size={32} />}
                        title="GOOGLE / MANDIANT"
                        subtitle="THREAT HUNTING PROGRAM DEVELOPMENT"
                        years="SINCE 2018"
                    />
                    <CredentialItem
                        icon={<Shield className="text-cyan-400" size={32} />}
                        title="UK INTELLIGENCE"
                        subtitle="CYBER DEFENSE OPERATIONS"
                        years="10 YEARS"
                    />
                    <CredentialItem
                        icon={<Cpu className="text-emerald-400" size={32} />}
                        title="STRATEGIC ARCHITECTURE"
                        subtitle="CYBER DEFENSE STRATEGY & OPS"
                        years="EXPERT"
                    />
                </motion.div>

                {/* Socials */}
                <motion.div variants={item} className="flex gap-8">
                    <SocialLink href="https://github.com" icon={<Github />} label="GitHub" />
                    <SocialLink href="https://twitter.com" icon={<Twitter />} label="Twitter" />
                    <SocialLink href="https://linkedin.com" icon={<Linkedin />} label="LinkedIn" />
                    <SocialLink href="mailto:hello@example.com" icon={<Mail />} label="Email" />
                </motion.div>
            </motion.div>

            {/* Decorative HUD Elements - Corners */}
            <div className="absolute top-0 left-0 p-8 opacity-50">
                <div className="h-32 w-1 bg-cyan-500/20"></div>
                <div className="h-1 w-32 bg-cyan-500/20"></div>
            </div>
            <div className="absolute bottom-0 right-0 p-8 opacity-50 rotate-180">
                <div className="h-32 w-1 bg-cyan-500/20"></div>
                <div className="h-1 w-32 bg-cyan-500/20"></div>
            </div>
        </main>
    );
}

function CredentialItem({ icon, title, subtitle, years }: { icon: React.ReactNode, title: string, subtitle: string, years: string }) {
    return (
        <div className="group flex items-center gap-6 p-4 transition-all hover:bg-white/5 hover:pl-8 border-l-2 border-transparent hover:border-cyan-400">
            <div className="opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all">
                {icon}
            </div>
            <div>
                <h3 className="font-mono text-3xl font-bold text-white tracking-tight group-hover:text-cyan-300 transition-colors">
                    {title}
                </h3>
                <div className="flex items-center gap-4 text-gray-400 font-mono text-sm">
                    <span className="text-cyan-500/80">[{years}]</span>
                    <span>{subtitle}</span>
                </div>
            </div>
        </div>
    );
}

function SocialLink({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-cyan-400 transition-colors hover:scale-110"
            aria-label={label}
        >
            <span className="h-8 w-8">{icon}</span>
        </a>
    );
}
