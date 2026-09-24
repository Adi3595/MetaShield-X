"use client";

import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import { MetricBox } from '@/components/ui/MetricBox';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

type ThreatEvent = {
  id: string;
  time: string;
  source: string;
  dest: string;
  threat: string;
  risk: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  confidence: number;
};

export default function Dashboard() {
  const [stream, setStream] = useState<ThreatEvent[]>([]);
  const [isInferring, setIsInferring] = useState(false);
  const [driftLevel, setDriftLevel] = useState(14);

  const fetchEvent = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/v1/events", {
        method: "GET",
      });
      
      if (res.ok) {
        const data = await res.json();
        
        if (data && data.length > 0) {
          const newEvents = data.map((d: any) => ({
            id: d.id,
            time: new Date(d.timestamp).toLocaleTimeString('en-US', { hour12: false }),
            source: d.source_ip,
            dest: d.destination_ip,
            threat: d.predicted_class || (d.status === 'UNKNOWN' ? "UNKNOWN BEHAVIOR" : d.status),
            risk: d.risk_score || "MEDIUM",
            confidence: Math.round((d.confidence || 0) * 100),
          }));
          
          setStream(prev => {
            // Trigger animation if there's a new event
            if (prev.length === 0 || prev[0].id !== newEvents[0].id) {
              setIsInferring(true);
              setTimeout(() => setIsInferring(false), 800);
              
              // Simulate concept drift increasing as new attacks occur
              if (typeof window !== 'undefined') {
                const currentDrift = parseInt(localStorage.getItem('metashield_drift') || '14', 10);
                const newDrift = Math.min(100, currentDrift + 2);
                localStorage.setItem('metashield_drift', newDrift.toString());
              }
            }
            return newEvents.slice(0, 8);
          });
        }
      }
    } catch (e) {
      console.log("Waiting for backend connection...");
    }
  };

  useEffect(() => {
    const interval = setInterval(fetchEvent, 1000); // Poll every 1 second
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Read dynamic drift from localStorage to sync with Lab
    const handleStorageChange = () => {
      const storedDrift = localStorage.getItem('metashield_drift');
      if (storedDrift !== null) {
        setDriftLevel(parseInt(storedDrift, 10));
      }
    };
    
    // Initial check
    handleStorageChange();
    
    // Check every second in case they have it open in another tab
    const storageInterval = setInterval(handleStorageChange, 1000);
    return () => clearInterval(storageInterval);
  }, []);

  return (
    <div className="min-h-screen p-8 bg-black text-white selection:bg-brand-accent selection:text-black">
      
      {/* Avant-Garde Header */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 pb-8 border-b border-white/20">
        <div>
          <h1 className="font-inter font-black uppercase text-4xl tracking-tighter">
            System Ledger.
          </h1>
          <p className="font-space text-text-secondary mt-2 text-xs uppercase tracking-[0.2em]">Real-time threat telemetry</p>
        </div>
        <div className="flex flex-col items-end gap-6">
          <div className="flex gap-8 mt-4 md:mt-0 font-space text-[10px] uppercase tracking-[0.3em]">
            <div className={`flex items-center gap-2 transition-opacity ${!isInferring ? 'opacity-100' : 'opacity-30'}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${!isInferring ? 'bg-brand-accent animate-pulse' : 'bg-white'}`}></span>
              Telemetry
            </div>
            <div className={`flex items-center gap-2 transition-opacity ${isInferring ? 'opacity-100' : 'opacity-30'}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${isInferring ? 'bg-brand-accent animate-pulse' : 'bg-white'}`}></span>
              Inference
            </div>
          </div>
          
          {/* Injector Link */}
          <a 
            href="/injector" 
            target="_blank"
            className="border border-brand-alert text-brand-alert px-6 py-3 font-space text-[10px] uppercase tracking-[0.4em] font-bold hover:bg-brand-alert hover:text-black transition-all flex items-center gap-3"
          >
            Launch Live Injector <span className="text-lg leading-none mb-0.5">↗</span>
          </a>
        </div>
      </header>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-0 border-t border-l border-white/20 mb-16">
        <MetricBox label="Intercepts" value="1,284" />
        <MetricBox label="Anomalies" value="47" isAlert />
        <MetricBox label="Critical" value="18" isAlert />
        <MetricBox label="Accuracy" value="92.4%" />
        <MetricBox label="Drift" value={`${driftLevel}%`} />
        <MetricBox label="Latency" value="12ms" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        
        {/* Cinematic Stream */}
        <div className="xl:col-span-8 flex flex-col">
          <div className="grid grid-cols-5 font-space text-[10px] text-text-secondary uppercase tracking-[0.2em] pb-4 mb-4 border-b border-white/20">
            <span>Time</span>
            <span>Vector</span>
            <span>Signature</span>
            <span>Class</span>
            <span>Conf.</span>
          </div>
          <div className="flex-1 overflow-hidden relative min-h-[500px]">
            <AnimatePresence>
              {stream.map((event) => (
                <Link 
                  key={event.id} 
                  href={`/threat/${event.id}?threat=${encodeURIComponent(event.threat)}&source=${encodeURIComponent(event.source)}&dest=${encodeURIComponent(event.dest)}&time=${encodeURIComponent(event.time)}&risk=${event.risk}&confidence=${event.confidence}`}
                  className="block hover:bg-white/[0.02] transition-colors"
                >
                  <motion.div
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    className={`grid grid-cols-5 text-sm py-5 px-4 border-b border-white/10 items-center group cursor-pointer`}
                  >
                    <span className="font-space text-xs text-text-secondary">{event.time}</span>
                    <span className="font-space text-xs tracking-tighter">{event.source} &rarr; {event.dest}</span>
                    <span className={`font-inter font-bold tracking-tight uppercase text-xs ${event.threat === 'UNKNOWN BEHAVIOR' ? 'text-brand-alert' : 'text-white'}`}>
                      {event.threat}
                    </span>
                    
                    <div className="flex">
                       <span className={`status-badge ${
                         event.risk === 'CRITICAL' ? 'critical' : 
                         event.risk === 'HIGH' ? 'high' : 
                         event.risk === 'MEDIUM' ? 'medium' : 'low'
                       }`}>
                         {event.risk}
                       </span>
                    </div>

                    <div className="flex items-center gap-4">
                      <span className="font-space text-xs font-bold w-8">{event.confidence}%</span>
                      <div className="flex-1 h-[1px] bg-white/20 relative">
                        <div 
                          className={`absolute top-0 left-0 h-[3px] -translate-y-[1px] ${event.confidence > 80 ? 'bg-brand-accent' : 'bg-brand-alert'}`} 
                          style={{ width: `${event.confidence}%` }}
                        />
                      </div>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Intelligence Side Panel */}
        <div className="xl:col-span-4 flex flex-col gap-8">
          
          <div className="border border-white/20 p-8 relative overflow-hidden group hover:border-brand-accent transition-colors duration-500">
             <div className="text-[10px] font-space text-text-secondary uppercase tracking-[0.2em] mb-8">Concept Drift Level</div>
             <div className={`text-8xl font-playfair italic font-light tracking-tighter mb-2 transition-colors ${driftLevel > 0 ? 'text-white group-hover:text-brand-accent' : 'text-brand-accent'}`}>{driftLevel}%</div>
             <div className="font-space text-xs text-text-secondary uppercase tracking-wider border-t border-white/20 pt-4 mt-8">
               {driftLevel > 0 ? "Distribution Drifting" : "Distribution Stable - Fully Adapted"}
             </div>
          </div>
          
          <div className="border border-white/20 p-8 flex flex-col h-full justify-between bg-white/[0.02]">
             <div>
                <div className="flex justify-between items-start mb-8">
                   <span className="status-badge critical">
                     Req. Action
                   </span>
                   <span className="text-[10px] font-space text-text-secondary uppercase tracking-widest">T-2m</span>
                </div>
                <h4 className="text-3xl font-inter font-black uppercase tracking-tighter text-white mb-4">Cluster #89A2</h4>
                <p className="font-playfair text-text-secondary text-lg italic leading-relaxed">
                  High entropy boundary detected. Automatic prototype generation suspended pending manual vector analysis.
                </p>
             </div>
             <Link href="/lab" className="mt-12 w-full py-4 bg-brand-accent text-black hover:bg-white transition-colors font-space text-[10px] font-bold uppercase tracking-[0.3em] text-center block">
               Initialize Lab Analysis
             </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
