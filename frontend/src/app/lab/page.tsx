"use client";

import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import { Database, Zap, Shield, ChevronRight, Activity, Crosshair, BarChart2 } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function FewShotLab() {
  const [activeTab, setActiveTab] = useState('dataset');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  
  // Animation state for episodes
  const [episodeProgress, setEpisodeProgress] = useState(0);
  
  const handleInitialize = () => {
    setIsGenerating(true);
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setEpisodeProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setIsGenerating(false);
        setIsComplete(true);
        setActiveTab('prototype');
      }
    }, 200);
  };
  
  const tabs = [
    { id: 'dataset', label: 'Dataset' },
    { id: 'episodes', label: 'Episodes' },
    { id: 'support', label: 'Support Set' },
    { id: 'prototype', label: 'Prototype' },
    { id: 'evaluation', label: 'Evaluation' }
  ];

  return (
    <div className="min-h-screen bg-black text-white p-8 max-w-[1600px] mx-auto selection:bg-brand-accent selection:text-black">
      
      {/* Avant-Garde Header */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 pb-8 border-b border-white/20">
        <div>
          <h1 className="font-inter font-black uppercase text-4xl tracking-tighter flex items-center gap-4">
            <Database className="text-brand-accent" size={32} />
            Adaptation Lab.
          </h1>
          <p className="font-space text-text-secondary mt-2 text-xs uppercase tracking-[0.2em]">Train probabilistic prototypes</p>
        </div>
        <div className="flex gap-8 mt-4 md:mt-0 font-space text-[10px] uppercase tracking-[0.3em]">
          <Link href="/dashboard" className="border-b border-white hover:text-brand-accent hover:border-brand-accent transition-colors pb-1">
            &larr; Return to Ledger
          </Link>
        </div>
      </header>

      {/* Tabs Navigation */}
      <div className="flex gap-4 mb-8 border-b border-white/10 overflow-x-auto pb-4">
        {tabs.map(tab => (
          <button 
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 font-space text-xs uppercase tracking-widest transition-colors ${
              activeTab === tab.id 
                ? 'text-brand-accent border-b border-brand-accent' 
                : 'text-text-secondary hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content Area */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        <div className="xl:col-span-8 flex flex-col gap-8">
          
          {/* DATASET TAB */}
          {activeTab === 'dataset' && (
            <Card title="Dataset Configuration" className="min-h-[400px]">
              <div className="flex flex-col gap-10">
                 <div>
                   <h4 className="font-space text-[10px] text-text-secondary uppercase tracking-[0.2em] mb-4">Select Vector Family</h4>
                   <select className="w-full bg-white/[0.02] border border-white/20 p-4 text-white font-space text-sm outline-none hover:border-white/40 transition-colors cursor-pointer appearance-none">
                     <option className="bg-black text-white">Novelty Cluster #89A2 (Unlabeled Zero-Day)</option>
                     <option className="bg-black text-white">DoS / SlowHTTPTest</option>
                     <option className="bg-black text-white">Recon / PortScan-Advanced</option>
                   </select>
                 </div>
                 
                 <div>
                   <h4 className="font-space text-[10px] text-text-secondary uppercase tracking-[0.2em] mb-4">Support Size (K-Shot)</h4>
                   <div className="flex gap-4">
                     {[1, 3, 5, 10].map(k => (
                       <button key={k} className="flex-1 py-4 bg-white/[0.02] border border-white/20 hover:border-brand-accent rounded-none text-center transition-colors group focus:border-brand-accent focus:bg-brand-accent/10">
                         <span className="font-inter font-black text-2xl text-text-secondary group-hover:text-brand-accent transition-colors">K={k}</span>
                       </button>
                     ))}
                   </div>
                 </div>
                 
                 <div className="pt-8 border-t border-white/10">
                   <button 
                     onClick={handleInitialize}
                     disabled={isGenerating}
                     className="w-full py-5 bg-brand-accent text-black hover:bg-white transition-colors font-space text-xs font-bold uppercase tracking-[0.3em] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-4"
                   >
                     {isGenerating ? <motion.span animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}><Zap size={14} /></motion.span> : null}
                     {isGenerating ? `TRAINING EPISODES: ${episodeProgress}%` : "Initialize Support Set"}
                   </button>
                 </div>
              </div>
            </Card>
          )}

          {/* EPISODES TAB */}
          {activeTab === 'episodes' && (
            <Card title="Training Episodes" className="min-h-[400px]">
              <div className="flex flex-col gap-8 h-full relative">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <Activity size={100} />
                </div>
                
                <div>
                  <h3 className="text-xl font-inter uppercase font-black tracking-tight mb-2">Gradient Descent Simulator</h3>
                  <p className="font-space text-xs text-text-secondary uppercase tracking-widest">Optimizing Mahalanobis Boundary</p>
                </div>
                
                <div className="flex-1 border border-white/10 bg-white/[0.02] p-6 flex items-end relative overflow-hidden gap-1">
                   {/* Fake bar chart for loss */}
                   {Array.from({length: 40}).map((_, i) => (
                     <motion.div 
                       key={i}
                       initial={{ height: '100%' }}
                       animate={{ height: `${Math.max(10, 100 - (i * 2.5) + (Math.random() * 10))}%` }}
                       transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
                       className="flex-1 bg-brand-accent/50 bottom-0"
                     />
                   ))}
                   <div className="absolute top-4 left-4 font-space text-xs uppercase tracking-widest text-brand-accent">
                     Loss: 0.0412
                   </div>
                </div>
              </div>
            </Card>
          )}

          {/* SUPPORT SET TAB */}
          {activeTab === 'support' && (
            <Card title="Support Set Vectors" className="min-h-[400px]">
              <div className="flex flex-col gap-4">
                <div className="grid grid-cols-4 font-space text-[10px] text-text-secondary uppercase tracking-[0.2em] pb-4 mb-4 border-b border-white/20">
                  <span>Vector ID</span>
                  <span>Entropy</span>
                  <span>Norm</span>
                  <span>Label</span>
                </div>
                {[1,2,3,4,5].map(i => (
                  <div key={i} className="grid grid-cols-4 py-3 border-b border-white/5 font-space text-xs items-center">
                    <span className="text-white">VEC_{Math.floor(Math.random()*10000)}</span>
                    <span className="text-text-secondary">{(Math.random()*2 + 1).toFixed(4)}</span>
                    <span className="text-text-secondary">{(Math.random()*10 + 20).toFixed(2)}</span>
                    <span className="text-brand-accent uppercase font-bold tracking-widest">Selected</span>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* PROTOTYPE TAB */}
          {activeTab === 'prototype' && (
            <Card title="Prototype" className="min-h-[400px] flex items-center justify-center relative overflow-hidden">
              {isComplete ? (
                <div className="absolute inset-0 flex items-center justify-center p-8">
                   <div className="w-full h-full border border-white/20 p-8 flex flex-col items-center justify-center gap-6 relative">
                      <div className="absolute top-4 right-4 opacity-20"><Crosshair size={64} /></div>
                      
                      <motion.div 
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="w-48 h-48 rounded-full border border-brand-accent flex items-center justify-center relative shadow-[0_0_50px_rgba(212,255,0,0.1)]"
                      >
                         <div className="w-32 h-32 rounded-full border border-brand-accent/50 absolute animate-pulse" />
                         <div className="w-16 h-16 rounded-full bg-brand-accent/20 absolute" />
                         <Database className="text-brand-accent relative z-10" size={32} />
                      </motion.div>
                      <h2 className="font-inter font-black text-3xl uppercase tracking-tighter text-white z-10">Prototype Generated</h2>
                      <p className="font-space text-xs text-brand-accent uppercase tracking-[0.2em] font-bold z-10">Mahalanobis Boundary Active</p>
                   </div>
                </div>
              ) : (
                <div className="text-center text-text-secondary">
                  <Shield size={48} className="mx-auto mb-6 opacity-20 text-white" />
                  <p className="font-playfair italic text-xl">Prototype requires initialization.</p>
                  <p className="font-space text-[10px] uppercase tracking-widest mt-4">Go to Dataset tab to begin</p>
                </div>
              )}
            </Card>
          )}

          {/* EVALUATION TAB */}
          {activeTab === 'evaluation' && (
            <Card title="Evaluation Matrix" className="min-h-[400px]">
               <div className="flex flex-col h-full gap-8">
                  <div className="grid grid-cols-2 gap-8">
                    <div className="border border-white/20 p-6 flex items-center justify-center flex-col gap-2">
                       <span className="font-space text-[10px] uppercase tracking-widest text-text-secondary">Precision</span>
                       <span className="font-inter text-5xl font-black text-brand-accent">99.2%</span>
                    </div>
                    <div className="border border-white/20 p-6 flex items-center justify-center flex-col gap-2">
                       <span className="font-space text-[10px] uppercase tracking-widest text-text-secondary">Recall</span>
                       <span className="font-inter text-5xl font-black text-white">97.8%</span>
                    </div>
                  </div>
                  
                  <div className="flex-1 border border-white/20 p-8 relative overflow-hidden bg-white/[0.01]">
                     <div className="absolute right-0 bottom-0 opacity-10 p-4"><BarChart2 size={120} /></div>
                     <h3 className="font-inter font-black uppercase tracking-tight text-xl mb-4">Confusion Matrix</h3>
                     <div className="grid grid-cols-2 gap-4 max-w-sm">
                       <div className="bg-brand-accent/20 border border-brand-accent p-4 text-center">
                         <div className="font-space text-2xl font-bold text-brand-accent">1,204</div>
                         <div className="font-space text-[10px] uppercase tracking-widest mt-1">True Pos</div>
                       </div>
                       <div className="bg-brand-alert/10 border border-brand-alert p-4 text-center">
                         <div className="font-space text-2xl font-bold text-brand-alert">3</div>
                         <div className="font-space text-[10px] uppercase tracking-widest mt-1">False Pos</div>
                       </div>
                       <div className="bg-brand-alert/10 border border-brand-alert p-4 text-center">
                         <div className="font-space text-2xl font-bold text-brand-alert">14</div>
                         <div className="font-space text-[10px] uppercase tracking-widest mt-1">False Neg</div>
                       </div>
                       <div className="bg-white/10 border border-white/20 p-4 text-center">
                         <div className="font-space text-2xl font-bold text-white">45,992</div>
                         <div className="font-space text-[10px] uppercase tracking-widest mt-1">True Neg</div>
                       </div>
                     </div>
                  </div>
               </div>
            </Card>
          )}

        </div>

        {/* Real-time Status Panel */}
        <div className="xl:col-span-4 flex flex-col gap-8">
          <Card title="Adaptation Status">
            <div className="space-y-6">
              <div className="flex justify-between items-center pb-4 border-b border-white/10">
                <span className="font-space text-xs text-text-secondary uppercase tracking-widest">Dim</span>
                <span className="font-inter font-bold text-brand-accent text-lg">64</span>
              </div>
              <div className="flex justify-between items-center pb-4 border-b border-white/10">
                <span className="font-space text-xs text-text-secondary uppercase tracking-widest">Metric</span>
                <span className="font-inter font-bold text-white text-lg">Mahalanobis</span>
              </div>
              <div className="flex justify-between items-center pb-4 border-b border-white/10">
                <span className="font-space text-xs text-text-secondary uppercase tracking-widest">Prior</span>
                <span className="font-inter font-bold text-brand-alert text-lg">Novel</span>
              </div>
              
              <div className="mt-8 pt-4">
                <h4 className="font-space text-[10px] text-text-secondary mb-6 uppercase tracking-[0.3em]">Workflow Sequence</h4>
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3 font-space text-xs uppercase tracking-widest text-brand-accent">
                    <Zap size={14} /> Embeddings Extracted
                  </div>
                  <div className={`flex items-center gap-3 font-space text-xs uppercase tracking-widest transition-colors ${isGenerating || isComplete ? 'text-brand-accent' : 'text-white'}`}>
                    <ChevronRight size={14} /> {isComplete ? "Calculation Complete" : "Awaiting Calc."}
                  </div>
                  <div className={`flex items-center gap-3 font-space text-xs uppercase tracking-widest transition-colors ${isComplete ? 'text-brand-accent' : 'text-text-secondary opacity-30'}`}>
                    <ChevronRight size={14} /> Validation Complete
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
