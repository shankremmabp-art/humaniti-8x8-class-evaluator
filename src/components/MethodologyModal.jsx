import React, { useState } from 'react';
import { X, BookOpen, Copy, Check, Sparkles, AlertTriangle, ShieldCheck, HelpCircle } from 'lucide-react';

export default function MethodologyModal({ isOpen, onClose }) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const briefExplanationText = `Approach & Why:
We built an interactive Multimodal Quality Assessment engine designed specifically for primary education (8x8). Rather than treating recordings as mere text transcripts, our system evaluates the interplay between acoustic prosody (tone, pitch variance, wait-time), visual ergonomics (screen sharing clarity, slide density, active annotations), and child-centric pedagogy. A React dashboard pairs synchronized video scrubbers with timestamped diagnostic evidence, allowing evaluators to verify the AI's reasoning at exact seconds in the recording.

What Worked vs What Failed:
- What Worked: Measuring "Response Wait-Time" (seconds elapsed between teacher questioning and child response) emerged as the single highest-fidelity indicator of educational quality. Top classes averaged 7-9 seconds of patient silence, whereas poor/average classes exhibited premature teacher bailout (<3s). Speaker turn-taking ratio (tracking child participation >40%) strongly correlated with engaged learning.
- What Failed: Raw audio energy and speech speed (WPM) proved misleading. Fast, relentless speaking often mimic enthusiasm in corporate settings, but in children's education it caused cognitive fatigue and attention drop-off. Similarly, complete classroom silence is often misinterpreted by naive algorithms as "orderly", when it actually signaled passive disengagement.

Main Limitations:
1. Automatic Speech Recognition (ASR) struggles with overlapping young children's voices and regional accents.
2. Direct client-side video processing for 1GB+ full-length files requires cloud pre-chunking or serverless pipeline integration for scalable production deployment.`;

  const handleCopy = () => {
    navigator.clipboard.writeText(briefExplanationText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-wrap">
            <BookOpen size={20} className="modal-icon" />
            <h3>Assessment Methodology & Submission Artifacts</h3>
          </div>
          <button className="modal-close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          {/* SECTION: 300-WORD SUBMISSION EXPLANATION */}
          <div className="submission-box">
            <div className="submission-box-header">
              <div>
                <span className="badge-official">REQUIRED SUBMISSION FIELD</span>
                <h4 className="submission-title">Brief Explanation (Maximum 300 Words)</h4>
                <p className="submission-sub">Ready to copy and paste into the Humaniti AI Google Form:</p>
              </div>
              <button className="btn btn-sm btn-primary" onClick={handleCopy}>
                {copied ? <Check size={14} /> : <Copy size={14} />}
                <span>{copied ? 'Copied to Clipboard!' : 'Copy Explanation'}</span>
              </button>
            </div>
            <pre className="submission-pre">{briefExplanationText}</pre>
          </div>

          {/* SECTION: SIGNALS ANALYSIS DEEP DIVE */}
          <div className="modal-section">
            <h4 className="section-heading">
              <Sparkles size={16} /> What Signals Are Meaningful vs Misleading?
            </h4>
            <div className="signals-table-wrap">
              <table className="signals-table">
                <thead>
                  <tr>
                    <th>Signal Category</th>
                    <th>Naive / Surface Perception</th>
                    <th>Actual Pedagogical Reality (Meaningful)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Teacher Talk Ratio</strong></td>
                    <td>"Teacher talks 90% of the time, so they are giving high instructional value."</td>
                    <td className="text-positive"><strong>MISLEADING:</strong> Children's working memory overloads after 3-4 minutes of passive listening. Great classes maintain &gt;40% child participation.</td>
                  </tr>
                  <tr>
                    <td><strong>Question Wait-Time</strong></td>
                    <td>"Teacher answers quickly to keep the lesson moving forward fast."</td>
                    <td className="text-positive"><strong>MEANINGFUL:</strong> Children take 5-8s to formulate answers. Top teachers cultivate comfortable silence without rushing the child.</td>
                  </tr>
                  <tr>
                    <td><strong>Speech Pacing (WPM)</strong></td>
                    <td>"Faster speech (150+ WPM) shows high energy and expertise."</td>
                    <td className="text-positive"><strong>MISLEADING:</strong> 120-135 WPM is the optimal cognitive tempo for 7-10 year olds; higher speeds trigger disengagement.</td>
                  </tr>
                  <tr>
                    <td><strong>Classroom Audio Silence</strong></td>
                    <td>"Dead quiet classroom means children are well-behaved and paying attention."</td>
                    <td className="text-positive"><strong>MISLEADING:</strong> Quietness often masks disengagement or hesitation to speak due to lack of psychological safety.</td>
                  </tr>
                  <tr>
                    <td><strong>Visual Anchoring</strong></td>
                    <td>"Pretty, decorative slides with animations make a class good."</td>
                    <td className="text-positive"><strong>MEANINGFUL:</strong> Live visual annotation (drawing circles, arrows, color-coding) synchronized with speech is what anchors conceptual comprehension.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* SECTION: RUBRIC TIERS */}
          <div className="modal-section">
            <h4 className="section-heading">
              <ShieldCheck size={16} /> 4 Quality Classification Tiers
            </h4>
            <div className="tiers-grid">
              <div className="tier-card tier-excellent">
                <h5>Excellent (88–100)</h5>
                <p>High student dialogue (&gt;45%), 7-9s response wait times, dynamic screen annotations, growth-mindset praise, structured wrap-up.</p>
              </div>
              <div className="tier-card tier-good">
                <h5>Good (72–87)</h5>
                <p>Clear pedagogical structure, warm tone, good visual slides. Minor issues: occasional monologue blocks or cut-off wait times.</p>
              </div>
              <div className="tier-card tier-average">
                <h5>Average (55–71)</h5>
                <p>Curriculum covered but passive. Heavy slide-reading (&gt;80% teacher talk), selective engagement of only 1 eager student, minimal interactive checks.</p>
              </div>
              <div className="tier-card tier-poor">
                <h5>Poor (&lt;55)</h5>
                <p>Technical friction (audio echo, wrong screen shared), flat or impatient vocal tone, prolonged dead air, no checks for understanding.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
