"use client";

import React, { use } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { ShieldAlert, Fingerprint, Activity, Network, X } from 'lucide-react';

export default function ThreatProfile({ params }: { params: Promise<{ id: string }> }) {
  // In Next.js 15, params is a Promise. We unwrap it with use()
  const resolvedParams = use(params);
  const searchParams = useSearchParams();
  const [isTopologyOpen, setIsTopologyOpen] = React.useState(false);
  
  const threat = searchParams.get('threat') || 'UNKNOWN';
  const source = searchParams.get('source') || 'N/A';
  const dest = searchParams.get('dest') || 'N/A';
  const time = searchParams.get('time') || 'N/A';
  const risk = searchParams.get('risk') || 'UNKNOWN';
  const confidence = searchParams.get('confidence') || '0';

  const isUnknown = threat === 'UNKNOWN BEHAVIOR';

  return (
    <div className="min-h-screen bg-black text-white p-8 max-w-[1600px] mx-auto selection:bg-brand-accent selection:text-black">
      
      {/* Avant-Garde Header */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 pb-8 border-b border-white/20">
        <div>
          <h1 className="font-space text-text-secondary mb-4 text-xs uppercase tracking-[0.3em]">
            Event ID: {resolvedParams.id}
          </h1>
          <h1 className={`font-inter font-black uppercase text-5xl md:text-7xl tracking-tighter ${isUnknown ? 'text-brand-alert' : 'text-white'}`}>
            {threat}
          </h1>
        </div>
        <div className="flex gap-8 mt-8 md:mt-0 font-space text-[10px] uppercase tracking-[0.3em]">
          <Link href="/dashboard" className="border-b border-white hover:text-brand-accent hover:border-brand-accent transition-colors pb-1">
            &larr; Return to Ledger
          </Link>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Main Details Panel */}
        <div className="lg:col-span-8 flex flex-col gap-8">
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-0 border-t border-l border-white/20">
            <div className="p-6 border-b border-r border-white/20 flex flex-col gap-4 hover:bg-white/[0.02] transition-colors">
              <span className="font-space text-text-secondary text-[10px] font-bold uppercase tracking-[0.2em]">Risk Level</span>
              <span className={`status-badge w-fit ${
                 risk === 'CRITICAL' ? 'critical' : 
                 risk === 'HIGH' ? 'high' : 
                 risk === 'MEDIUM' ? 'medium' : 'low'
               }`}>
                 {risk}
              </span>
            </div>
            <div className="p-6 border-b border-r border-white/20 flex flex-col gap-4 hover:bg-white/[0.02] transition-colors">
              <span className="font-space text-text-secondary text-[10px] font-bold uppercase tracking-[0.2em]">Confidence</span>
              <span className="font-inter font-black tracking-tighter text-3xl">{confidence}%</span>
            </div>
            <div className="p-6 border-b border-r border-white/20 flex flex-col gap-4 hover:bg-white/[0.02] transition-colors">
              <span className="font-space text-text-secondary text-[10px] font-bold uppercase tracking-[0.2em]">Source Vector</span>
              <span className="font-space tracking-tighter text-lg">{source}</span>
            </div>
            <div className="p-6 border-b border-r border-white/20 flex flex-col gap-4 hover:bg-white/[0.02] transition-colors">
              <span className="font-space text-text-secondary text-[10px] font-bold uppercase tracking-[0.2em]">Target Node</span>
              <span className="font-space tracking-tighter text-lg">{dest}</span>
            </div>
          </div>

          <Card title="Intelligence Engine Reasoning" className="mt-8">
            <div className="flex flex-col md:flex-row gap-12 items-center">
               <div className="flex-1">
                 {isUnknown ? (
                   <>
                     <h3 className="font-inter font-black text-2xl mb-4 tracking-tight uppercase flex items-center gap-3">
                       <ShieldAlert className="text-brand-alert" /> Novelty Boundary Crossed
                     </h3>
                     <p className="font-playfair italic text-text-secondary text-lg leading-relaxed mb-6">
                       The active stream exhibited extreme mathematical chaos. The Shannon Entropy score of the intercepted packet severely diverged from the baseline probability distribution, triggering a Zero-Day critical isolate.
                     </p>
                     <div className="flex items-center gap-4">
                        <span className="font-space text-[10px] uppercase tracking-widest text-text-secondary">Entropy Spike:</span>
                        <div className="h-1 flex-1 bg-white/20 relative">
                           <div className="absolute top-0 left-0 h-full bg-brand-alert w-[94%]" />
                        </div>
                     </div>
                   </>
                 ) : (
                   <>
                     <h3 className="font-inter font-black text-2xl mb-4 tracking-tight uppercase flex items-center gap-3">
                       <Fingerprint className="text-brand-accent" /> Prototype Match
                     </h3>
                     <p className="font-playfair italic text-text-secondary text-lg leading-relaxed mb-6">
                       The Bayesian Few-Shot engine successfully mapped the incoming telemetry vector to an existing attack prototype. The calculated Mahalanobis distance fell well within the confidence boundary for a recognized signature.
                     </p>
                     <div className="flex items-center gap-4">
                        <span className="font-space text-[10px] uppercase tracking-widest text-text-secondary">Distribution Match:</span>
                        <div className="h-1 flex-1 bg-white/20 relative">
                           <div className="absolute top-0 left-0 h-full bg-brand-accent" style={{ width: `${confidence}%` }} />
                        </div>
                     </div>
                   </>
                 )}
               </div>
               
               <div className="w-full md:w-1/3 flex justify-center">
                 <motion.div 
                   animate={{ rotate: 360 }}
                   transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
                   className={`w-40 h-40 border-[1px] border-dashed rounded-full flex items-center justify-center ${isUnknown ? 'border-brand-alert' : 'border-brand-accent'}`}
                 >
                    <div className="w-20 h-20 border-[1px] border-white/20 rounded-full flex items-center justify-center">
                       <Activity className={isUnknown ? 'text-brand-alert' : 'text-brand-accent'} />
                    </div>
                 </motion.div>
               </div>
            </div>
          </Card>
        </div>

        {/* Telemetry Sidebar */}
        <div className="lg:col-span-4 flex flex-col gap-8">
          
          <Card title="Mathematical Execution Log">
            <div className="bg-white/[0.02] border border-white/10 p-6 font-space text-[10px] text-text-secondary overflow-x-auto flex flex-col gap-4">
               {isUnknown ? (
                 <>
                   <div className="text-brand-alert">&gt; EXECUTING SHANNON ENTROPY CALCULATION...</div>
                   <div><span className="text-white">Vector:</span> [0.12, 0.04, 0.81, 0.00, ...]</div>
                   <div><span className="text-white">Baseline Threshold:</span> 1.85 bits/sym</div>
                   <div className="text-brand-alert border-l-2 border-brand-alert pl-4 mt-2">
                     <span className="text-white">Calculated Entropy:</span> 2.14 bits/sym<br/>
                     <span className="font-bold">BOUNDARY BREACHED (P &gt; 99.9%)</span>
                   </div>
                   <div className="text-white mt-2">&gt; ISOLATION PROTOCOL ENGAGED</div>
                 </>
               ) : (
                 <>
                   <div className="text-brand-accent">&gt; EXECUTING BAYESIAN INFERENCE...</div>
                   <div><span className="text-white">Vector:</span> [0.44, 0.21, 0.11, 0.09, ...]</div>
                   <div className="border-l-2 border-brand-accent pl-4 mt-2">
                     <div className="flex justify-between"><span>Class 01 (DoS):</span><span>0.14%</span></div>
                     <div className="flex justify-between"><span>Class 02 (XSS):</span><span>0.02%</span></div>
                     <div className="flex justify-between"><span>Class 03 (SQLi):</span><span>1.01%</span></div>
                     <div className="flex justify-between text-brand-accent font-bold mt-2 border-t border-white/20 pt-2">
                       <span>Class 04 ({threat}):</span>
                       <span>{confidence}%</span>
                     </div>
                   </div>
                   <div className="text-white mt-2">&gt; PROTOTYPE MATCH CONFIRMED</div>
                 </>
               )}
            </div>
          </Card>

          <Card title="Raw Intercept Data">
            <div className="bg-white/[0.02] border border-white/10 p-6 font-space text-[10px] text-text-secondary overflow-x-auto">
              <pre className="leading-loose">
{`{
  "event_id": "${resolvedParams.id}",
  "timestamp": "${time}",
  "network": {
    "protocol": "TCP",
    "src_ip": "${source}",
    "dst_ip": "${dest}"
  },
  "inference": {
    "engine": "${isUnknown ? 'Entropy_Novelty' : 'Bayesian_FewShot'}",
    "confidence": ${Number(confidence) / 100}
  }
}`}
              </pre>
            </div>
            
            <button onClick={() => setIsTopologyOpen(true)} className="mt-8 w-full py-4 bg-white/10 text-white hover:bg-white hover:text-black transition-colors font-space text-[10px] font-bold uppercase tracking-[0.3em] flex items-center justify-center gap-2">
              <Network size={14} /> View Network Topology
            </button>
          </Card>
        </div>

      </div>

      {/* Network Topology Modal */}
      {isTopologyOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-8">
           <div className="w-full max-w-4xl h-[600px] border border-white/20 bg-black relative flex flex-col">
              <div className="flex justify-between items-center p-6 border-b border-white/20">
                 <h2 className="font-space uppercase tracking-[0.3em] text-xs">Active Topology Mapping</h2>
                 <button onClick={() => setIsTopologyOpen(false)} className="hover:text-brand-alert transition-colors"><X /></button>
              </div>
              <div className="flex-1 relative flex items-center justify-between p-24 overflow-hidden">
                 
                 {/* Attacker Node */}
                 <div className="flex flex-col items-center gap-4 z-10">
                    <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 2 }} className={`w-24 h-24 rounded-full border border-white/20 flex items-center justify-center ${isUnknown ? 'bg-brand-alert/20' : 'bg-brand-accent/20'}`}>
                       <span className="font-space text-[10px] text-white">EXTERNAL</span>
                    </motion.div>
                    <span className="font-space text-xs tracking-tighter">{source}</span>
                 </div>
                 
                 {/* Connecting Line (Vector) */}
                 <div className="absolute top-1/2 left-48 right-48 h-[1px] bg-white/20 -translate-y-1/2 overflow-hidden z-0">
                    <motion.div 
                       initial={{ x: "-100%" }}
                       animate={{ x: "200%" }}
                       transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                       className={`h-full w-1/3 ${isUnknown ? 'bg-brand-alert' : 'bg-brand-accent'}`}
                    />
                 </div>
                 
                 {/* Target Node */}
                 <div className="flex flex-col items-center gap-4 z-10">
                    <div className="w-24 h-24 rounded-full border border-white flex items-center justify-center bg-black">
                       <span className="font-space text-[10px] text-white">INTERNAL</span>
                    </div>
                    <span className="font-space text-xs tracking-tighter">{dest}</span>
                 </div>
                 
              </div>
           </div>
        </div>
      )}
    </div>
  );
}
