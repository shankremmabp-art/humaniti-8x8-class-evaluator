import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import InputSection from './components/InputSection';
import VideoPlayer from './components/VideoPlayer';
import AssessmentDashboard from './components/AssessmentDashboard';
import MethodologyModal from './components/MethodologyModal';
import ApiKeyModal from './components/ApiKeyModal';
import { BENCHMARK_CLASSES } from './data/benchmarks';
import { evaluateClassRecording } from './services/aiService';
import './App.css';

export default function App() {
  // Default to Class A (Excellent) benchmark on initial load
  const [currentEvaluation, setCurrentEvaluation] = useState(BENCHMARK_CLASSES[0]);
  const [selectedBenchmarkId, setSelectedBenchmarkId] = useState(BENCHMARK_CLASSES[0].id);
  const [seekTime, setSeekTime] = useState(null);

  // Analysis state for custom uploads or links
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progressMessage, setProgressMessage] = useState('');
  const [progressPercent, setProgressPercent] = useState(0);

  // Modals state
  const [isMethodologyOpen, setIsMethodologyOpen] = useState(false);
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState(false);

  // API Key in localStorage
  const [apiKey, setApiKey] = useState(() => {
    return localStorage.getItem('gemini_api_key') || '';
  });

  const handleSaveApiKey = (key) => {
    setApiKey(key);
    if (key) {
      localStorage.setItem('gemini_api_key', key);
    } else {
      localStorage.removeItem('gemini_api_key');
    }
  };

  const handleSelectBenchmark = (benchmark) => {
    setSelectedBenchmarkId(benchmark.id);
    setCurrentEvaluation(benchmark);
    setSeekTime(null);
  };

  const handleAnalyzeCustom = async ({ file, videoUrl, title }) => {
    setIsAnalyzing(true);
    setProgressMessage('Initializing Multimodal Pipeline...');
    setProgressPercent(10);
    setSelectedBenchmarkId(null);

    try {
      const evaluationResult = await evaluateClassRecording({
        file,
        videoUrl,
        title,
        apiKey,
        onProgress: (msg, pct) => {
          setProgressMessage(msg);
          setProgressPercent(pct);
        }
      });

      // Attach videoUrl so the player can preview the video
      if (videoUrl) {
        evaluationResult.videoUrl = videoUrl;
      }

      setCurrentEvaluation(evaluationResult);
      setSeekTime(null);
    } catch (err) {
      console.error('Error during analysis:', err);
      alert(`Analysis error: ${err.message || 'Unknown error'}`);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSeekVideo = (seconds) => {
    setSeekTime(seconds);
    // Smooth scroll up to video player if screen is scrolled down
    const playerEl = document.querySelector('.video-player-container');
    if (playerEl) {
      playerEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  };

  return (
    <div className="app-shell">
      {/* HEADER */}
      <Header
        onOpenMethodology={() => setIsMethodologyOpen(true)}
        onOpenApiKey={() => setIsApiKeyModalOpen(true)}
        hasCustomKey={Boolean(apiKey)}
      />

      <main className="main-content">
        {/* INPUT AND RECORDING SELECTION */}
        <InputSection
          selectedBenchmarkId={selectedBenchmarkId}
          onSelectBenchmark={handleSelectBenchmark}
          onAnalyzeCustom={handleAnalyzeCustom}
          isAnalyzing={isAnalyzing}
          progressMessage={progressMessage}
          progressPercent={progressPercent}
        />

        {/* 2-COLUMN OR STACKED DISPLAY: VIDEO PLAYER & ASSESSMENT DASHBOARD */}
        <div className="evaluation-layout">
          {/* VIDEO PLAYER SECTION */}
          <section className="player-column">
            <VideoPlayer
              videoUrl={currentEvaluation?.videoUrl}
              title={currentEvaluation?.title}
              timestampedObservations={currentEvaluation?.timestampedObservations}
              seekTime={seekTime}
            />
          </section>

          {/* ASSESSMENT METRICS & OBSERVATIONS DASHBOARD */}
          <section className="dashboard-column">
            <AssessmentDashboard
              evaluation={currentEvaluation}
              onSeekVideo={handleSeekVideo}
            />
          </section>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="footer-bar">
        <div>
          Humaniti AI 24-Hour Recruitment Challenge • Evaluator Prototype for 8x8 Education
        </div>
        <div className="footer-links">
          <button className="footer-btn" onClick={() => setIsMethodologyOpen(true)}>
            Evaluation Methodology
          </button>
          <span>•</span>
          <button className="footer-btn" onClick={() => setIsApiKeyModalOpen(true)}>
            Gemini Multimodal API Settings
          </button>
        </div>
      </footer>

      {/* MODALS */}
      <MethodologyModal
        isOpen={isMethodologyOpen}
        onClose={() => setIsMethodologyOpen(false)}
      />

      <ApiKeyModal
        isOpen={isApiKeyModalOpen}
        onClose={() => setIsApiKeyModalOpen(false)}
        apiKey={apiKey}
        onSaveApiKey={handleSaveApiKey}
      />
    </div>
  );
}
