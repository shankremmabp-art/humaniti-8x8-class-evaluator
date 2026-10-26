import React from 'react';
import { Sparkles, BrainCircuit, Key, BookOpen, ExternalLink, ShieldCheck } from 'lucide-react';

export default function Header({ onOpenMethodology, onOpenApiKey, hasCustomKey }) {
  return (
    <header className="header-container">
      <div className="header-left">
        <div className="logo-badge">
          <BrainCircuit className="logo-icon" size={26} />
        </div>
        <div>
          <div className="brand-sub">HUMANITI AI • 8x8 RECRUITMENT CHALLENGE</div>
          <h1 className="brand-title">Classroom Quality AI Evaluator</h1>
        </div>
      </div>

      <div className="header-actions">
        <button 
          className="btn btn-secondary"
          onClick={onOpenMethodology}
          title="View Rubric, Meaningful vs Misleading Signals & 300-word Report"
        >
          <BookOpen size={16} />
          <span>Methodology & Signals</span>
        </button>

        <button 
          className={`btn ${hasCustomKey ? 'btn-active' : 'btn-secondary'}`}
          onClick={onOpenApiKey}
          title="Configure Google Gemini 2.0 Multimodal API Key"
        >
          <Key size={16} />
          <span>{hasCustomKey ? 'Gemini Key Active' : 'API Key'}</span>
        </button>

        <a 
          href="https://drive.google.com/drive/folders/1Jz2GlCg8zmdbdxeJweaW8UCY27vqXHr0?usp=drive_link" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="btn btn-ghost"
          title="Open Official 8x8 Class Recordings Dataset"
        >
          <ExternalLink size={15} />
          <span>8x8 Dataset</span>
        </a>
      </div>
    </header>
  );
}
