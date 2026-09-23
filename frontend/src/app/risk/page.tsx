"use client";

import React from 'react';
import { Card } from '@/components/ui/Card';
import { Crosshair, AlertOctagon } from 'lucide-react';
import { motion } from 'framer-motion';

export default function RiskEngine() {
  
  // Matrix data structure for risk calculation rendering
  const impactLevels = ["Low", "Medium", "High", "Critical"];
  const likelihoodLevels = ["Low", "Medium", "High", "Critical"];
  
  const getRiskColor = (impact: number, likelihood: number) => {
    const score = impact + likelihood;
    if (score > 5) return 'bg-brand-alert/80';
    if (score > 3) return 'bg-brand-alert/40';
    if (score > 1) return 'bg-brand-primary/40';
    return 'bg-brand-primary/10';
  };

  return (
    <div className="min-h-screen bg-background text-text-primary p-6">
      <header className="mb-8 pb-4 border-b border-brand-primary/20">
        <h1 className="font-black-ops text-3xl text-brand-neutral tracking-wider flex items-center gap-3">
          <Crosshair className="text-brand-primary" />
          RISK INTELLIGENCE ENGINE
        </h1>
        <p className="text-text-secondary mt-1">Multi-factor dynamic risk scoring and policy evaluation</p>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        
        {/* Risk Policy Evaluation */}
        <div className="flex flex-col gap-6">
          <Card title="ACTIVE POLICY EVALUATION">
            <div className="bg-surface-hover border border-brand-primary/20 rounded p-6 mb-4">
               <h3 className="text-brand-neutral font-bold mb-4 flex justify-between items-center">
                 <span>CURRENT EVENT: 10.0.4.19 → 10.0.1.3</span>
                 <span className="text-xs font-mono px-2 py-1 bg-surface rounded">ID: UNK_1024</span>
               </h3>
               
               <div className="space-y-4">
                 <div className="flex justify-between items-center border-b border-surface/50 pb-2">
                    <span className="text-text-secondary">Threat Probability (Confidence)</span>
                    <span className="font-bold">61% (Medium)</span>
                 </div>
                 <div className="flex justify-between items-center border-b border-surface/50 pb-2">
                    <span className="text-text-secondary">Asset Criticality (10.0.1.3)</span>
                    <span className="font-bold text-brand-alert">CRITICAL</span>
                 </div>
                 <div className="flex justify-between items-center border-b border-surface/50 pb-2">
                    <span className="text-text-secondary">Attack Severity Base</span>
                    <span className="font-bold">Unknown Base</span>
                 </div>
                 <div className="flex justify-between items-center border-b border-surface/50 pb-2">
                    <span className="text-text-secondary">Novelty Score</span>
                    <span className="font-bold text-brand-alert">0.91 (HIGH)</span>
                 </div>
               </div>
               
               <div className="mt-6 p-4 bg-background/50 border border-brand-alert/50 rounded flex justify-between items-center">
                  <div>
                    <div className="text-xs text-text-secondary uppercase">Calculated Overall Risk</div>
                    <div className="text-2xl font-black-ops text-brand-alert">HIGH RISK</div>
                  </div>
                  <AlertOctagon size={32} className="text-brand-alert" />
               </div>
            </div>
          </Card>
          
          <Card title="RESPONSE POLICY RECOMMENDATIONS">
            <div className="flex flex-col gap-3">
              <div className="p-3 border border-green-500/20 bg-green-500/5 rounded flex justify-between items-center opacity-50">
                <span>Alert SOC Analyst</span>
                <span className="text-xs text-green-500 font-bold border border-green-500 px-2 py-1 rounded">AUTO-EXECUTED</span>
              </div>
              <div className="p-3 border border-brand-primary/50 bg-brand-primary/10 rounded flex justify-between items-center">
                <span>Increase Telemetry Logging for Source IP</span>
                <button className="text-xs text-brand-accent hover:text-white bg-surface hover:bg-brand-primary border border-brand-primary px-3 py-1 rounded transition-colors">
                  EXECUTE
                </button>
              </div>
              <div className="p-3 border border-brand-alert/50 bg-brand-alert/10 rounded flex justify-between items-center">
                <span className="font-bold text-brand-alert flex items-center gap-2">
                  <AlertOctagon size={16}/> Quarantine Source IP at Gateway
                </span>
                <button className="text-xs bg-brand-alert text-background font-bold px-3 py-1 rounded hover:bg-brand-alert/80 transition-colors">
                  APPROVE
                </button>
              </div>
            </div>
          </Card>
        </div>

        {/* Risk Matrix Visualization */}
        <Card title="ENTERPRISE RISK MATRIX" className="flex flex-col">
           <div className="flex-1 flex flex-col items-center justify-center p-4">
             
             <div className="relative w-full max-w-md aspect-square">
               {/* Y Axis Label */}
               <div className="absolute -left-12 top-1/2 -translate-y-1/2 -rotate-90 text-sm font-bold text-text-secondary uppercase tracking-widest">
                 Likelihood
               </div>
               {/* X Axis Label */}
               <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-sm font-bold text-text-secondary uppercase tracking-widest">
                 Asset Impact
               </div>
               
               <div className="w-full h-full grid grid-cols-4 grid-rows-4 gap-1">
                 {likelihoodLevels.map((like, y) => (
                   impactLevels.map((imp, x) => (
                     <motion.div 
                       key={`${x}-${y}`}
                       initial={{ opacity: 0, scale: 0.8 }}
                       animate={{ opacity: 1, scale: 1 }}
                       transition={{ delay: (x + (3-y)) * 0.05 }}
                       className={`rounded border border-background/20 ${getRiskColor(x, 3-y)} relative group hover:border-white transition-colors cursor-crosshair`}
                     >
                       {/* Simulate the current event falling in the High/Critical bucket */}
                       {x === 3 && y === 1 && (
                         <div className="absolute inset-0 flex items-center justify-center">
                           <div className="w-4 h-4 bg-white rounded-full animate-ping absolute opacity-50" />
                           <div className="w-2 h-2 bg-white rounded-full relative z-10" />
                         </div>
                       )}
                     </motion.div>
                   ))
                 ))}
               </div>
             </div>
             
           </div>
        </Card>

      </div>
    </div>
  );
}
