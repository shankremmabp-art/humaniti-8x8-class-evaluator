import React, { useRef, useState, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, Clock, FastForward } from 'lucide-react';

export default function VideoPlayer({ videoUrl, title, timestampedObservations, seekTime }) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [isMuted, setIsMuted] = useState(false);

  // Jump to timestamp when seekTime prop changes
  useEffect(() => {
    if (seekTime !== null && seekTime !== undefined && videoRef.current) {
      videoRef.current.currentTime = seekTime;
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  }, [seekTime]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(() => {});
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleSeek = (e) => {
    const time = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const cycleSpeed = () => {
    const speeds = [1, 1.25, 1.5, 2];
    const nextIdx = (speeds.indexOf(playbackSpeed) + 1) % speeds.length;
    const newSpeed = speeds[nextIdx];
    setPlaybackSpeed(newSpeed);
    if (videoRef.current) {
      videoRef.current.playbackRate = newSpeed;
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const toggleFullscreen = () => {
    if (videoRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        videoRef.current.requestFullscreen?.();
      }
    }
  };

  const formatTime = (secs) => {
    if (isNaN(secs)) return '00:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="video-player-container">
      <div className="video-player-header">
        <div className="player-title">
          <Clock size={16} className="title-icon" />
          <span>Synchronized Class Recording: <strong>{title}</strong></span>
        </div>
        <div className="timestamp-hint">
          Click any observation card below to scrub directly to that second
        </div>
      </div>

      <div className="video-wrapper">
        <video
          ref={videoRef}
          src={videoUrl}
          className="video-element"
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={() => setIsPlaying(false)}
          playsInline
        />

        {/* Video Overlay Play Button when paused */}
        {!isPlaying && (
          <div className="play-overlay" onClick={togglePlay}>
            <div className="play-circle">
              <Play size={28} fill="currentColor" />
            </div>
          </div>
        )}
      </div>

      {/* Synchronized timeline markers */}
      <div className="timeline-strip">
        <div className="timeline-markers-container">
          {timestampedObservations?.map((obs, idx) => {
            const leftPercent = duration > 0 ? (obs.seconds / duration) * 100 : (idx / timestampedObservations.length) * 90 + 5;
            let markerColor = '#3b82f6';
            if (obs.type === 'Praise') markerColor = '#10b981';
            if (obs.type === 'Issue') markerColor = '#ef4444';
            if (obs.type === 'Engagement') markerColor = '#a855f7';
            if (obs.type === 'Visual') markerColor = '#06b6d4';

            return (
              <div
                key={idx}
                className="timeline-marker"
                style={{ left: `${Math.min(98, Math.max(2, leftPercent))}%`, backgroundColor: markerColor }}
                title={`${obs.time}: ${obs.title}`}
                onClick={() => {
                  if (videoRef.current) {
                    videoRef.current.currentTime = obs.seconds;
                    videoRef.current.play().catch(() => {});
                    setIsPlaying(true);
                  }
                }}
              />
            );
          })}
        </div>
      </div>

      {/* Video Control Bar */}
      <div className="video-controls">
        <button className="control-btn" onClick={togglePlay} aria-label={isPlaying ? 'Pause' : 'Play'}>
          {isPlaying ? <Pause size={18} /> : <Play size={18} />}
        </button>

        <span className="time-display">
          {formatTime(currentTime)} / {formatTime(duration || 0)}
        </span>

        <input
          type="range"
          min={0}
          max={duration || 100}
          step={0.1}
          value={currentTime}
          onChange={handleSeek}
          className="seek-slider"
        />

        <button className="control-btn speed-btn" onClick={cycleSpeed} title="Playback Speed">
          {playbackSpeed}x
        </button>

        <button className="control-btn" onClick={toggleMute} aria-label={isMuted ? 'Unmute' : 'Mute'}>
          {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
        </button>

        <button className="control-btn" onClick={toggleFullscreen} aria-label="Fullscreen">
          <Maximize size={18} />
        </button>
      </div>
    </div>
  );
}
