import React, { useState } from 'react';
import {
  Award,
  AlertTriangle,
  CheckCircle,
  HelpCircle,
  MessageSquare,
  Clock,
  Sparkles,
  BarChart3,
  Monitor,
  Volume2,
  Smile,
  FileText,
  Download,
  Printer,
  ChevronRight,
  TrendingUp,
  AlertCircle
} from 'lucide-react';

export default function AssessmentDashboard({ evaluation, onSeekVideo }) {
  const [selectedFilter, setSelectedFilter] = useState('All');

  if (!evaluation) return null;

  const {
    title,
    grade,
    score,
    badgeColor,
    teacherName,
    summary,
    keyMetrics,
    dimensionScores,
    signalsAnalysis,
    timestampedObservations,
    coachingAdvice
  } = evaluation;

  // Observation types for filtering
  const observationTypes = ['All', 'Praise', 'Engagement', 'Pedagogy', 'Visual', 'Issue'];
  const filteredObservations = selectedFilter === 'All'
    ? timestampedObservations
    : timestampedObservations.filter((obs) => obs.type === selectedFilter);

  const handleDownloadJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(evaluation, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `${title.replace(/\s+/g, '_')}_8x8_assessment.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="dashboard-container">
      {/* TOP HEADER: CLASSIFICATION BADGE & EXECUTIVE SUMMARY */}
      <div className="verdict-card" style={{ borderLeftColor: badgeColor }}>
        <div className="verdict-header">
          <div className="verdict-left">
            <span 
              className="verdict-tier-badge" 
              style={{ backgroundColor: badgeColor }}
            >
              <Award size={18} />
              CLASSIFICATION: {grade.toUpperCase()}
            </span>
            <h2 className="verdict-title">{title}</h2>
            <div className="verdict-meta">
              <span>Instructor: <strong>{teacherName || '8x8 Instructor'}</strong></span>
              <span>•</span>
              <span>Evaluated by: <strong>Humaniti Multimodal AI</strong></span>
            </div>
          </div>

          <div className="verdict-score-circle" style={{ borderColor: badgeColor }}>
            <span className="score-num" style={{ color: badgeColor }}>{score}</span>
            <span className="score-den">/ 100</span>
          </div>
        </div>

        <p className="verdict-summary">
          <strong>Executive Assessment:</strong> {summary}
        </p>

        <div className="report-actions-row">
          <button className="btn btn-sm btn-ghost" onClick={handleDownloadJSON}>
            <Download size={14} />
            <span>Download JSON</span>
          </button>
          <button className="btn btn-sm btn-ghost" onClick={handlePrint}>
            <Printer size={14} />
            <span>Print Report</span>
          </button>
        </div>
      </div>

      {/* KEY METRICS GRID */}
      {keyMetrics && (
        <div className="metrics-grid">
          {/* Talk Ratio Bar */}
          <div className="metric-box">
            <div className="metric-header">
              <span className="metric-label">Talk Time Distribution</span>
              <MessageSquare size={16} className="metric-icon" />
            </div>
            <div className="talk-ratio-bar">
              <div 
                className="teacher-bar" 
                style={{ width: keyMetrics.teacherTalkRatio }}
                title={`Teacher: ${keyMetrics.teacherTalkRatio}`}
              >
                Teacher {keyMetrics.teacherTalkRatio}
              </div>
              <div 
                className="student-bar" 
                style={{ width: keyMetrics.studentParticipationRatio }}
                title={`Students: ${keyMetrics.studentParticipationRatio}`}
              >
                Kids {keyMetrics.studentParticipationRatio}
              </div>
            </div>
            <div className="metric-hint">Ideal child participation: 40% – 60%</div>
          </div>

          {/* Wait Time */}
          <div className="metric-box">
            <div className="metric-header">
              <span className="metric-label">Avg Response Wait Time</span>
              <Clock size={16} className="metric-icon" />
            </div>
            <div className="metric-val">{keyMetrics.avgResponseWaitTime}</div>
            <div className="metric-hint">Target: 5.0s – 8.0s for young learners</div>
          </div>

          {/* Questions Asked */}
          <div className="metric-box">
            <div className="metric-header">
              <span className="metric-label">Questions Asked / Hr</span>
              <HelpCircle size={16} className="metric-icon" />
            </div>
            <div className="metric-val">{keyMetrics.questionsAskedPerHour}</div>
            <div className="metric-hint">Frequency of comprehension checks</div>
          </div>

          {/* Positive Reinforcement */}
          <div className="metric-box">
            <div className="metric-header">
              <span className="metric-label">Positive Reinforcements</span>
              <Smile size={16} className="metric-icon" />
            </div>
            <div className="metric-val">{keyMetrics.positiveReinforcements}</div>
            <div className="metric-hint">Praise, validations, encouragement</div>
          </div>

          {/* Pacing WPM */}
          <div className="metric-box">
            <div className="metric-header">
              <span className="metric-label">Speech Pacing (WPM)</span>
              <Volume2 size={16} className="metric-icon" />
            </div>
            <div className="metric-val">{keyMetrics.pacingWpm} <span className="metric-unit">wpm</span></div>
            <div className="metric-hint">120 - 135 WPM optimal for cognitive ease</div>
          </div>

          {/* Dead Air */}
          <div className="metric-box">
            <div className="metric-header">
              <span className="metric-label">Dead Air / Screen Pauses</span>
              <AlertCircle size={16} className="metric-icon" />
            </div>
            <div className="metric-val">{keyMetrics.deadAirMoments} <span className="metric-unit">instances</span></div>
            <div className="metric-hint">Unannounced silence leading to distraction</div>
          </div>
        </div>
      )}

      {/* DIMENSION SCORES & MEANINGFUL SIGNALS 2-COL LAYOUT */}
      <div className="analysis-split-grid">
        {/* LEFT: 4 DIMENSIONS OF QUALITY */}
        <div className="card dimension-card">
          <div className="section-title">
            <BarChart3 size={18} />
            <h3>Multimodal Rubric Breakdown</h3>
          </div>

          <div className="dimensions-list">
            {dimensionScores?.map((dim, idx) => (
              <div key={idx} className="dimension-item">
                <div className="dim-top">
                  <span className="dim-name">{dim.name}</span>
                  <span className="dim-weight">Weight: {dim.weight}</span>
                  <span className="dim-score-pill">{dim.score}/100</span>
                </div>
                <div className="dim-progress-track">
                  <div 
                    className="dim-progress-fill" 
                    style={{ 
                      width: `${dim.score}%`,
                      backgroundColor: dim.score >= 85 ? '#10b981' : dim.score >= 70 ? '#3b82f6' : dim.score >= 50 ? '#f59e0b' : '#ef4444'
                    }}
                  />
                </div>
                <p className="dim-detail">{dim.detail}</p>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT: MEANINGFUL VS MISLEADING SIGNALS */}
        <div className="card signals-card">
          <div className="section-title">
            <TrendingUp size={18} />
            <h3>Signal Diagnostic: Meaningful vs Misleading</h3>
          </div>
          <p className="signals-intro">
            Traditional AI evaluators often measure surface features (e.g. speech speed, total volume). Here is what genuinely drives learning outcomes:
          </p>

          <div className="signals-group">
            <h4 className="signals-sub-title text-positive">
              <CheckCircle size={16} /> Meaningful Pedagogical Signals
            </h4>
            <div className="signals-list">
              {signalsAnalysis?.meaningful.map((sig, i) => (
                <div key={i} className="signal-item positive-border">
                  <div className="sig-header">
                    <strong>{sig.signal}</strong>
                    <span className="sig-impact-tag impact-pos">{sig.impact}</span>
                  </div>
                  <div className="sig-reason">{sig.reason}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="signals-group">
            <h4 className="signals-sub-title text-warning">
              <AlertTriangle size={16} /> Potentially Misleading Signals
            </h4>
            <div className="signals-list">
              {signalsAnalysis?.misleading.map((sig, i) => (
                <div key={i} className="signal-item warning-border">
                  <div className="sig-header">
                    <strong>{sig.signal}</strong>
                    <span className="sig-impact-tag impact-warn">{sig.impact}</span>
                  </div>
                  <div className="sig-reason">{sig.reason}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* SYNCHRONIZED TIMESTAMPS & OBSERVATIONS */}
      <div className="card observations-card">
        <div className="observations-header">
          <div>
            <div className="section-title">
              <Clock size={18} />
              <h3>Specific Video Observations (Click to Scrub Player)</h3>
            </div>
            <p className="obs-subtitle">
              Ground-truth moments identified across speech, audio, and screen interactions.
            </p>
          </div>

          <div className="filter-pills">
            {observationTypes.map((type) => (
              <button
                key={type}
                className={`filter-btn ${selectedFilter === type ? 'active' : ''}`}
                onClick={() => setSelectedFilter(type)}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <div className="observations-grid">
          {filteredObservations?.map((obs, idx) => {
            let typeColor = '#3b82f6';
            if (obs.type === 'Praise') typeColor = '#10b981';
            if (obs.type === 'Issue') typeColor = '#ef4444';
            if (obs.type === 'Engagement') typeColor = '#a855f7';
            if (obs.type === 'Visual') typeColor = '#06b6d4';

            return (
              <div 
                key={idx} 
                className="obs-card"
                onClick={() => onSeekVideo(obs.seconds)}
              >
                <div className="obs-top">
                  <span className="obs-time-tag">
                    <Clock size={12} />
                    {obs.time}
                  </span>
                  <span className="obs-type-tag" style={{ color: typeColor, backgroundColor: `${typeColor}18` }}>
                    {obs.type}
                  </span>
                  <span className="jump-hint">Jump ➔</span>
                </div>
                <h4 className="obs-title">{obs.title}</h4>
                <p className="obs-desc">{obs.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* TEACHER COACHING ACTION PLAN */}
      {coachingAdvice && (
        <div className="card coaching-card">
          <div className="section-title">
            <Sparkles size={18} />
            <h3>Actionable Teacher Coaching Recommendations</h3>
          </div>
          <div className="coaching-list">
            {coachingAdvice.map((item, idx) => (
              <div key={idx} className="coaching-item">
                <span className="coaching-number">{idx + 1}</span>
                <span className="coaching-text">{item}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
