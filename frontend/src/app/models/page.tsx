"use client";

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { FlaskConical, Play, Check } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ModelLab() {
  const [running, setRunning] = useState(false);

  // Simulated experiment results ensuring we use "DEMO DATA" labels as requested
  const results = [
    { model: "Logistic Regression (Baseline)", accuracy: "76.2%", f1: "74.1%", unknown: "N/A", latency: "2ms" },
    { model: "Random Forest (Baseline)", accuracy: "84.5%", f1: "82.9%", unknown: "N/A", latency: "14ms" },
    { model: "Prototypical Networks", accuracy: "88.1%", f1: "87.0%", unknown: "Low", latency: "8ms" },
    { model: "MetaShield (Original)", accuracy: "92.4%", f1: "91.8%", unknown: "Medium", latency: "12ms" },
    { model: "MetaShield-X", accuracy: "96.7%", f1: "96.1%", unknown: "High", latency: "15ms" },
  ];

  return (
    <div className="min-h-screen bg-background text-text-primary p-6">
      <header className="mb-8 pb-4 border-b border-brand-primary/20 flex justify-between items-end">
        <div>
          <h1 className="font-black-ops text-3xl text-brand-neutral tracking-wider flex items-center gap-3">
            <FlaskConical className="text-brand-primary" />
            MODEL LABORATORY
          </h1>
          <p className="text-text-secondary mt-1">Reproducible evaluation, ablation studies, and robustness testing</p>
        </div>
        <div className="bg-brand-alert/20 border border-brand-alert text-brand-alert px-3 py-1 rounded text-xs font-bold">
          DEMO DATA / EXPERIMENT MODE
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Experiment Configuration */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          <Card title="ABLATION CONFIG">
            <div className="flex flex-col gap-3">
              <label className="flex items-center justify-between text-sm">
                <span>Bayesian Prototypes</span>
                <input type="checkbox" defaultChecked className="accent-brand-primary" />
              </label>
              <label className="flex items-center justify-between text-sm">
                <span>Hard Negatives</span>
                <input type="checkbox" defaultChecked className="accent-brand-primary" />
              </label>
              <label className="flex items-center justify-between text-sm">
                <span>Hierarchy</span>
                <input type="checkbox" defaultChecked className="accent-brand-primary" />
              </label>
              <label className="flex items-center justify-between text-sm">
                <span>Unknown Detector</span>
                <input type="checkbox" defaultChecked className="accent-brand-primary" />
              </label>
              <label className="flex items-center justify-between text-sm">
                <span>Drift Adaptation</span>
                <input type="checkbox" defaultChecked className="accent-brand-primary" />
              </label>
            </div>
          </Card>
          
          <Card title="DATASET SELECTOR">
             <select className="w-full bg-surface-hover border border-surface/50 rounded p-2 text-sm outline-none mb-4">
               <option>CIC-IDS2017 (Standardized)</option>
               <option>NSL-KDD (Legacy)</option>
               <option>Custom Synthetic Event Stream</option>
             </select>
             
             <button 
               onClick={() => setRunning(true)}
               disabled={running}
               className="w-full py-2 bg-brand-primary text-white font-bold rounded flex items-center justify-center gap-2 hover:bg-brand-primary/90 transition-colors disabled:opacity-50"
             >
               {running ? <span className="animate-spin">⏳</span> : <Play size={16} />}
               {running ? 'EVALUATING...' : 'RUN EXPERIMENT'}
             </button>
          </Card>
        </div>

        {/* Results Table */}
        <div className="lg:col-span-3">
          <Card title="EVALUATION RESULTS" className="h-full">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-surface-hover text-xs uppercase text-text-secondary">
                    <th className="pb-3 px-2 font-medium">Model architecture</th>
                    <th className="pb-3 px-2 font-medium">Accuracy</th>
                    <th className="pb-3 px-2 font-medium">F1 Score</th>
                    <th className="pb-3 px-2 font-medium">Novelty Detect</th>
                    <th className="pb-3 px-2 font-medium">Avg Latency</th>
                    <th className="pb-3 px-2 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((row, idx) => (
                    <motion.tr 
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: running ? idx * 0.2 : 0 }}
                      className="border-b border-surface-hover/30 hover:bg-surface-hover/50 transition-colors"
                    >
                      <td className="py-4 px-2 font-medium text-sm flex items-center gap-2">
                        {idx === results.length - 1 && <span className="w-2 h-2 rounded-full bg-brand-primary" />}
                        {row.model}
                      </td>
                      <td className="py-4 px-2 font-mono text-sm">{row.accuracy}</td>
                      <td className="py-4 px-2 font-mono text-sm">{row.f1}</td>
                      <td className="py-4 px-2 text-sm">{row.unknown}</td>
                      <td className="py-4 px-2 font-mono text-sm text-text-secondary">{row.latency}</td>
                      <td className="py-4 px-2">
                        <Check size={16} className="text-green-500" />
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
              <p className="text-xs text-text-secondary mt-4 text-center">
                * Note: Metrics shown are illustrative simulated results based on "DEMO DATA". Run experiments on live datasets for real validation.
              </p>
            </div>
          </Card>
        </div>
        
      </div>
    </div>
  );
}
