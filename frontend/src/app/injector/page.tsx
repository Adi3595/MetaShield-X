"use client";

import React, { useState } from 'react';
import { Terminal, Send, Activity, Crosshair } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AttackInjector() {
  const [sourceIp, setSourceIp] = useState('192.168.1.105');
  const [targetIp, setTargetIp] = useState('10.0.1.4');
  const [protocol, setProtocol] = useState('TCP');
  const [isFiring, setIsFiring] = useState(false);
  const [logs, setLogs] = useState<string[]>(['> INJECTOR TERMINAL INITIALIZED', '> AWAITING FIRING SEQUENCE...']);

  const handleFire = async () => {
    setIsFiring(true);
    setLogs(prev => [...prev, `> TARGET LOCKED: ${targetIp}`, '> INJECTING PAYLOAD...']);
    
    try {
      const res = await fetch("http://localhost:8000/api/v1/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          timestamp: new Date().toISOString(),
          source_ip: sourceIp,
          destination_ip: targetIp,
          protocol: protocol
        })
      });
      
      if (res.ok) {
        setLogs(prev => [...prev, `> SUCCESS: PAYLOAD DELIVERED`, '> AWAITING AI REACTION ON DASHBOARD...']);
      } else {
        setLogs(prev => [...prev, `> ERROR: CONNECTION FAILED`]);
      }
    } catch (e) {
      setLogs(prev => [...prev, `> ERROR: CONNECTION FAILED`]);
    } finally {
      setTimeout(() => setIsFiring(false), 500);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-8 font-space selection:bg-brand-alert selection:text-black">
      <div className="max-w-4xl mx-auto flex flex-col gap-8">
        
        <header className="flex justify-between items-end border-b border-white/20 pb-8">
           <div>
             <h1 className="text-5xl font-inter font-black uppercase tracking-tighter text-brand-alert flex items-center gap-4">
               <Crosshair size={40} /> Live Injector
             </h1>
             <p className="text-[10px] text-text-secondary uppercase tracking-[0.3em] mt-2">Manual Threat Deployment System</p>
           </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Controls */}
          <div className="border border-brand-alert/30 bg-brand-alert/5 p-8 flex flex-col gap-6 relative overflow-hidden">
             <div className="absolute top-0 right-0 p-4 opacity-10">
               <Activity size={100} />
             </div>
             
             <div className="flex flex-col gap-2 relative z-10">
               <label className="text-[10px] uppercase tracking-widest text-brand-alert font-bold">Source IP (Attacker)</label>
               <input 
                 type="text" 
                 value={sourceIp}
                 onChange={(e) => setSourceIp(e.target.value)}
                 className="bg-black border border-white/20 p-4 text-white font-space text-lg focus:border-brand-alert outline-none transition-colors"
               />
             </div>

             <div className="flex flex-col gap-2 relative z-10">
               <label className="text-[10px] uppercase tracking-widest text-brand-alert font-bold">Destination IP (Target Node)</label>
               <input 
                 type="text" 
                 value={targetIp}
                 onChange={(e) => setTargetIp(e.target.value)}
                 className="bg-black border border-white/20 p-4 text-white font-space text-lg focus:border-brand-alert outline-none transition-colors"
               />
             </div>
             
             <div className="flex flex-col gap-2 relative z-10">
               <label className="text-[10px] uppercase tracking-widest text-brand-alert font-bold">Protocol</label>
               <select 
                 value={protocol}
                 onChange={(e) => setProtocol(e.target.value)}
                 className="bg-black border border-white/20 p-4 text-white font-space text-lg focus:border-brand-alert outline-none transition-colors appearance-none"
               >
                 <option>TCP</option>
                 <option>UDP</option>
                 <option>ICMP</option>
                 <option>HTTP</option>
               </select>
             </div>

             <button 
               onClick={handleFire}
               disabled={isFiring}
               className="mt-4 w-full py-6 bg-brand-alert text-black hover:bg-white transition-all font-space text-sm font-black uppercase tracking-[0.4em] flex items-center justify-center gap-3 disabled:opacity-50"
             >
               {isFiring ? 'DEPLOYING...' : 'FIRE PAYLOAD'} <Send size={16} />
             </button>
          </div>

          {/* Terminal Logs */}
          <div className="border border-white/20 bg-black p-6 flex flex-col h-[500px]">
             <div className="flex items-center gap-3 border-b border-white/10 pb-4 mb-4">
                <Terminal size={14} className="text-text-secondary" />
                <span className="text-[10px] uppercase tracking-[0.2em] text-text-secondary font-bold">Injector Feed</span>
             </div>
             <div className="flex-1 overflow-y-auto flex flex-col gap-2 text-xs">
                {logs.map((log, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`${log.includes('SUCCESS') ? 'text-brand-accent' : log.includes('ERROR') ? 'text-brand-alert' : 'text-text-secondary'}`}
                  >
                    {log}
                  </motion.div>
                ))}
             </div>
          </div>

        </div>
      </div>
    </div>
  );
}
