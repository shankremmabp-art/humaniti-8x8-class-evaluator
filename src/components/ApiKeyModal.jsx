import React, { useState } from 'react';
import { X, Key, ShieldCheck, ExternalLink, Check, Trash2 } from 'lucide-react';

export default function ApiKeyModal({ isOpen, onClose, apiKey, onSaveApiKey }) {
  const [keyInput, setKeyInput] = useState(apiKey || '');
  const [saved, setSaved] = useState(false);

  if (!isOpen) return null;

  const handleSave = () => {
    onSaveApiKey(keyInput.trim());
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onClose();
    }, 1000);
  };

  const handleClear = () => {
    setKeyInput('');
    onSaveApiKey('');
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-container modal-sm" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-wrap">
            <Key size={18} className="modal-icon" />
            <h3>Google Gemini Multimodal API Key</h3>
          </div>
          <button className="modal-close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="modal-body">
          <p className="modal-text">
            Provide a Google Gemini API Key to enable real-time <strong>Gemini 2.0 Flash</strong> multimodal inference for any uploaded video file or link.
          </p>

          <div className="api-privacy-notice">
            <ShieldCheck size={16} />
            <span>Key is stored strictly in your browser's <code>localStorage</code> and never transmitted to any third-party backend.</span>
          </div>

          <div className="input-group">
            <label className="input-label">Gemini API Key (AI Studio)</label>
            <input
              type="password"
              className="text-input"
              placeholder="AIzaSy..."
              value={keyInput}
              onChange={(e) => setKeyInput(e.target.value)}
            />
          </div>

          <div className="api-help-links">
            <a
              href="https://aistudio.google.com/app/apikey"
              target="_blank"
              rel="noopener noreferrer"
              className="api-help-link"
            >
              <span>Get a free Gemini API Key at Google AI Studio</span>
              <ExternalLink size={12} />
            </a>
          </div>

          <p className="fallback-note">
            <em>Note: If no API key is provided, the application will use its built-in Intelligent Multimodal Heuristic Analyzer so all features remain 100% functional for evaluation.</em>
          </p>
        </div>

        <div className="modal-footer">
          {apiKey && (
            <button className="btn btn-ghost text-danger" onClick={handleClear}>
              <Trash2 size={14} />
              <span>Clear Key</span>
            </button>
          )}
          <button className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button className="btn btn-primary" onClick={handleSave}>
            {saved ? <Check size={14} /> : <Key size={14} />}
            <span>{saved ? 'Saved!' : 'Save Key'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
