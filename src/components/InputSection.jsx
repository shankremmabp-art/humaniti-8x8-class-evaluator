import React, { useState, useRef } from 'react';
import { UploadCloud, Link as LinkIcon, Sparkles, Film, CheckCircle2, Play } from 'lucide-react';
import { BENCHMARK_CLASSES } from '../data/benchmarks';

export default function InputSection({
  selectedBenchmarkId,
  onSelectBenchmark,
  onAnalyzeCustom,
  isAnalyzing,
  progressMessage,
  progressPercent
}) {
  const [activeTab, setActiveTab] = useState('benchmarks'); // 'benchmarks' | 'upload' | 'link'
  const [uploadedFile, setUploadedFile] = useState(null);
  const [videoPreviewUrl, setVideoPreviewUrl] = useState(null);
  const [linkUrl, setLinkUrl] = useState('');
  const [customTitle, setCustomTitle] = useState('');
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      setCustomTitle(file.name.replace(/\.[^/.]+$/, ''));
      const objectUrl = URL.createObjectURL(file);
      setVideoPreviewUrl(objectUrl);
    }
  };

  const handleStartCustomAnalysis = () => {
    if (activeTab === 'upload' && uploadedFile) {
      onAnalyzeCustom({
        file: uploadedFile,
        videoUrl: videoPreviewUrl,
        title: customTitle || uploadedFile.name
      });
    } else if (activeTab === 'link' && linkUrl.trim()) {
      onAnalyzeCustom({
        file: null,
        videoUrl: linkUrl.trim(),
        title: customTitle || 'Online Class Recording'
      });
    }
  };

  return (
    <div className="input-card">
      <div className="tab-bar">
        <button
          className={`tab-btn ${activeTab === 'benchmarks' ? 'active' : ''}`}
          onClick={() => setActiveTab('benchmarks')}
        >
          <Film size={16} />
          <span>8x8 Benchmark Dataset (4 Tiers)</span>
        </button>

        <button
          className={`tab-btn ${activeTab === 'upload' ? 'active' : ''}`}
          onClick={() => setActiveTab('upload')}
        >
          <UploadCloud size={16} />
          <span>Upload Class Recording</span>
        </button>

        <button
          className={`tab-btn ${activeTab === 'link' ? 'active' : ''}`}
          onClick={() => setActiveTab('link')}
        >
          <LinkIcon size={16} />
          <span>Link (Google Drive / Video URL)</span>
        </button>
      </div>

      <div className="tab-content">
        {/* BENCHMARK DATASET TAB */}
        {activeTab === 'benchmarks' && (
          <div className="benchmarks-grid">
            {BENCHMARK_CLASSES.map((cls) => {
              const isSelected = selectedBenchmarkId === cls.id;
              return (
                <div
                  key={cls.id}
                  className={`benchmark-card ${isSelected ? 'selected' : ''}`}
                  onClick={() => onSelectBenchmark(cls)}
                >
                  <div className="card-top">
                    <span 
                      className="grade-pill" 
                      style={{ backgroundColor: `${cls.badgeColor}22`, color: cls.badgeColor, borderColor: cls.badgeColor }}
                    >
                      {cls.grade} • {cls.score}/100
                    </span>
                    <span className="duration-tag">{cls.duration}</span>
                  </div>
                  <h4 className="benchmark-title">{cls.title}</h4>
                  <p className="benchmark-snippet">{cls.summary.slice(0, 105)}...</p>
                  <div className="benchmark-footer">
                    <span className="teacher-lbl">{cls.teacherName}</span>
                    <span className="action-lbl">
                      {isSelected ? <CheckCircle2 size={16} color={cls.badgeColor} /> : <Play size={14} />}
                      {isSelected ? ' Active' : ' Load'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* FILE UPLOAD TAB */}
        {activeTab === 'upload' && (
          <div className="upload-container">
            <div 
              className="dropzone"
              onClick={() => fileInputRef.current?.click()}
            >
              <input 
                ref={fileInputRef} 
                type="file" 
                accept="video/*,audio/*" 
                style={{ display: 'none' }}
                onChange={handleFileChange}
              />
              <UploadCloud size={44} className="dropzone-icon" />
              <div className="dropzone-text">
                <strong>Click to upload</strong> or drag and drop class video
              </div>
              <div className="dropzone-hint">
                Supports MP4, WebM, MOV (Max recommended 500MB)
              </div>
            </div>

            {uploadedFile && (
              <div className="file-info-bar">
                <div className="file-meta">
                  <Film size={20} className="file-icon" />
                  <div>
                    <div className="file-name">{uploadedFile.name}</div>
                    <div className="file-size">{(uploadedFile.size / (1024 * 1024)).toFixed(1)} MB</div>
                  </div>
                </div>

                <div className="title-input-wrap">
                  <input
                    type="text"
                    className="text-input"
                    placeholder="Enter Class Title / Subject..."
                    value={customTitle}
                    onChange={(e) => setCustomTitle(e.target.value)}
                  />
                </div>

                <button
                  className="btn btn-primary"
                  onClick={handleStartCustomAnalysis}
                  disabled={isAnalyzing}
                >
                  <Sparkles size={16} />
                  <span>{isAnalyzing ? 'Analyzing...' : 'Run Multimodal AI Assessment'}</span>
                </button>
              </div>
            )}
          </div>
        )}

        {/* LINK / DRIVE URL TAB */}
        {activeTab === 'link' && (
          <div className="link-container">
            <div className="link-input-row">
              <input
                type="url"
                className="text-input url-input"
                placeholder="Paste Google Drive video link or direct MP4/WebM URL..."
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
              />
              <input
                type="text"
                className="text-input title-input"
                placeholder="Class Subject / Title (e.g. Science Grade 3)..."
                value={customTitle}
                onChange={(e) => setCustomTitle(e.target.value)}
              />
            </div>

            <div className="link-actions">
              <div className="link-note">
                💡 Tip: Ensure Google Drive links have "Anyone with the link can view" permissions enabled.
              </div>
              <button
                className="btn btn-primary"
                onClick={handleStartCustomAnalysis}
                disabled={!linkUrl.trim() || isAnalyzing}
              >
                <Sparkles size={16} />
                <span>{isAnalyzing ? 'Evaluating Multimodal Signals...' : 'Analyze Recording'}</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* PROGRESS OVERLAY */}
      {isAnalyzing && (
        <div className="analysis-progress-banner">
          <div className="progress-top">
            <span className="progress-spinner"></span>
            <span className="progress-msg">{progressMessage}</span>
            <span className="progress-val">{progressPercent}%</span>
          </div>
          <div className="progress-track">
            <div 
              className="progress-fill" 
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
