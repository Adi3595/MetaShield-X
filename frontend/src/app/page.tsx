"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen text-text-primary bg-background overflow-hidden relative">
      
      {/* Avant-Garde Nav */}
      <nav className="fixed top-0 w-full z-50 p-8 flex justify-between items-center mix-blend-difference">
        <span className="font-space font-bold tracking-tighter text-2xl uppercase">MX.</span>
        <div className="flex gap-12 font-space text-xs uppercase tracking-[0.2em]">
          <Link href="/dashboard" className="hover:text-brand-accent transition-colors">Command Center</Link>
          <Link href="/lab" className="hover:text-brand-accent transition-colors">Adaptation</Link>
        </div>
      </nav>

      {/* Grid Background Pattern */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(var(--color-border) 1px, transparent 1px), linear-gradient(90deg, var(--color-border) 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

      <main className="h-screen flex flex-col justify-end pb-20 px-8 relative">
        
        {/* Floating Data Elements */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, delay: 0.8 }}
          className="absolute top-40 right-12 z-20 hidden lg:flex flex-col gap-6"
        >
           <div className="border border-border p-6 bg-surface backdrop-blur-md w-72">
             <div className="flex justify-between items-center mb-4">
               <span className="font-space text-[10px] text-text-secondary uppercase tracking-[0.2em]">Live Entropy</span>
               <span className="w-2 h-2 bg-brand-accent rounded-full animate-pulse"></span>
             </div>
             <div className="font-playfair text-4xl text-white mb-2 italic">0.894</div>
             <div className="h-1 bg-white/10 w-full relative">
                <div className="h-full bg-brand-accent w-[89%]" />
             </div>
           </div>
           
           <div className="border border-border p-6 bg-surface/80 backdrop-blur-md w-72">
             <span className="font-space text-[10px] text-text-secondary uppercase tracking-[0.2em] mb-4 block">Active Prototypes</span>
             <div className="font-inter font-black text-5xl text-white tracking-tighter">4,096</div>
             <div className="mt-4 font-space text-[10px] text-brand-accent tracking-widest">+12 GENERATED (1H)</div>
           </div>
        </motion.div>

        {/* Massive Cinematic Typography */}
        <div className="relative z-10 w-full">
          <div className="overflow-hidden">
            <motion.h1 
              initial={{ y: 200 }}
              animate={{ y: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-[12vw] leading-[0.75] tracking-tighter font-inter font-black uppercase text-white"
            >
              Adaptive
            </motion.h1>
          </div>
          
          <div className="overflow-hidden flex items-end gap-8 mt-4">
            <motion.h1 
              initial={{ y: 200 }}
              animate={{ y: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="text-[12vw] leading-[0.75] tracking-tighter font-playfair italic font-light text-brand-accent"
            >
              Intelligence
            </motion.h1>
          </div>
          
          <div className="overflow-hidden mt-4 flex justify-between items-end border-b border-border pb-12">
            <motion.h1 
              initial={{ y: 200 }}
              animate={{ y: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              className="text-[12vw] leading-[0.75] tracking-tighter font-inter font-black uppercase text-white"
            >
              System.
            </motion.h1>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 2, delay: 1 }}
              className="max-w-[300px] text-right"
            >
              <p className="font-space text-sm text-text-secondary leading-relaxed mb-6">
                Neutralize novel vectors in real-time with few-shot dynamic modeling. No rules. Pure inference.
              </p>
              <Link href="/dashboard" className="font-space text-xs font-bold uppercase tracking-[0.2em] border-b border-white text-white hover:text-brand-accent hover:border-brand-accent pb-1 transition-all">
                Initialize Sequence &rarr;
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Abstract Geometry Background */}
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.05 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] border-[1px] border-white rounded-full z-0 pointer-events-none"
        />
      </main>
      
      {/* Ticker Tape Bottom */}
      <div className="fixed bottom-0 left-0 w-full bg-brand-accent text-black font-space text-[10px] font-bold uppercase tracking-[0.3em] overflow-hidden whitespace-nowrap py-2 z-50">
        <motion.div 
          animate={{ x: [0, -1000] }} 
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
          className="inline-block"
        >
          <span>SYSTEM ONLINE • ACTIVE INFERENCE RUNNING • ZERO-DAY NEUTRALIZATION PROTOCOL ENGAGED • ENTHROPY LEVELS STABLE • LATENCY 12MS • </span>
          <span>SYSTEM ONLINE • ACTIVE INFERENCE RUNNING • ZERO-DAY NEUTRALIZATION PROTOCOL ENGAGED • ENTHROPY LEVELS STABLE • LATENCY 12MS • </span>
          <span>SYSTEM ONLINE • ACTIVE INFERENCE RUNNING • ZERO-DAY NEUTRALIZATION PROTOCOL ENGAGED • ENTHROPY LEVELS STABLE • LATENCY 12MS • </span>
        </motion.div>
      </div>
    </div>
  );
}
