"use client";

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { ShieldAlert, Activity, ChevronRight, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ExplainabilityEngine() {
  const [selectedDetection, setSelectedDetection] = useState("DOS_SLOWLORIS_8992");

  const featureImportance = [
    { name: "Flow Duration", value: 0.85, type: "positive" },
    { name: "Connection Frequency", value: 0.72, type: "positive" },
    { name: "Packet Rate", value: 0.65, type: "positive" },
    { name: "Idle Time Behavior", value: 0.58, type: "positive" },
    { name: "Payload Size Variance", value: -0.12, type: "negative" }
  ];

  return (
    <div className="min-h-screen bg-background text-text-primary p-6">
      <header className="mb-8 pb-4 border-b border-brand-primary/20">
        <h1 className="font-black-ops text-3xl text-brand-neutral tracking-wider flex items-center gap-3">
          <Activity className="text-brand-primary" />
          EXPLAINABILITY ENGINE
        </h1>
        <p className="text-text-secondary mt-1">SHAP-based transparent feature attribution for predictions</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Detection History Sidebar */}
        <div className="lg:col-span-1">
          <Card title="RECENT DETECTIONS">
            <div className="flex flex-col gap-2">
              <button className="text-left p-3 bg-brand-primary/20 border-l-4 border-brand-primary rounded-r">
                <div className="font-bold text-brand-accent text-sm">DoS / Slowloris</div>
                <div className="text-xs text-text-secondary flex justify-between mt-1">
                  <span>ID: DOS_8992</span>
                  <span>93% Conf</span>
                </div>
              </button>
              <button className="text-left p-3 hover:bg-surface-hover border-l-4 border-transparent hover:border-surface-hover transition-colors rounded-r">
                <div className="font-bold text-brand-alert text-sm">UNKNOWN BEHAVIOR</div>
                <div className="text-xs text-text-secondary flex justify-between mt-1">
                  <span>ID: UNK_1024</span>
                  <span>61% Conf</span>
                </div>
              </button>
            </div>
          </Card>
        </div>

        {/* Main Explanation Area */}
        <div className="lg:col-span-2">
          <Card title="THREAT DETECTED" className="mb-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 pb-6 border-b border-surface-hover">
              <div>
                <div className="text-xs text-text-secondary uppercase">Classification</div>
                <div className="font-bold text-brand-accent text-xl">DoS / Slowloris</div>
              </div>
              <div>
                <div className="text-xs text-text-secondary uppercase">Confidence</div>
                <div className="font-bold text-brand-primary text-xl">93.0%</div>
              </div>
              <div>
                <div className="text-xs text-text-secondary uppercase">Risk Level</div>
                <div className="font-bold text-brand-alert flex items-center gap-1 text-xl">
                  <AlertTriangle size={18} /> HIGH
                </div>
              </div>
              <div>
                <div className="text-xs text-text-secondary uppercase">Model Uncertainty</div>
                <div className="font-bold text-green-400 text-xl">LOW</div>
              </div>
            </div>

            <div>
              <h3 className="font-black-ops text-xl text-brand-neutral mb-4">WHY? (Feature Attribution)</h3>
              
              <div className="space-y-4">
                {featureImportance.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-4">
                    <div className="w-48 text-sm font-medium text-text-secondary text-right">
                      {feat.name}
                    </div>
                    <div className="flex-1 flex items-center gap-2">
                      <div className="w-12 text-xs font-mono text-right">
                        {feat.value > 0 ? '+' : ''}{feat.value.toFixed(2)}
                      </div>
                      <div className="flex-1 h-3 bg-surface-hover rounded relative overflow-hidden">
                        {feat.value > 0 ? (
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${Math.abs(feat.value) * 100}%` }}
                            className="absolute top-0 left-1/2 h-full bg-brand-primary rounded-r"
                          />
                        ) : (
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${Math.abs(feat.value) * 100}%` }}
                            className="absolute top-0 right-1/2 h-full bg-blue-500 rounded-l"
                          />
                        )}
                        {/* Center line */}
                        <div className="absolute top-0 left-1/2 w-px h-full bg-text-secondary/50" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-4 border-t border-surface-hover flex justify-between items-center text-sm">
                 <div className="flex items-center gap-4">
                   <div className="flex items-center gap-1"><span className="w-3 h-3 bg-brand-primary rounded-sm inline-block"></span> Supports prediction</div>
                   <div className="flex items-center gap-1"><span className="w-3 h-3 bg-blue-500 rounded-sm inline-block"></span> Contradicts prediction</div>
                 </div>
                 <button className="px-4 py-2 bg-brand-primary/20 text-brand-accent hover:bg-brand-primary hover:text-white transition-colors rounded font-bold border border-brand-primary/50 text-xs">
                   EXPORT EVIDENCE
                 </button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
