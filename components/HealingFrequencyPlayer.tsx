"use client";

import { useState, useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Play, Pause, Volume2, VolumeX, Music, Zap, Heart } from 'lucide-react';

interface Frequency {
  id: string;
  name: string;
  hz: number;
  description: string;
  color: string;
  icon: React.ReactNode;
}

const frequencies: Frequency[] = [
  {
    id: 'harmony',
    name: 'Harmony',
    hz: 432,
    description: 'Universal harmony and natural resonance',
    color: 'from-purple-500 to-indigo-500',
    icon: <Music className="w-5 h-5" />
  },
  {
    id: 'love',
    name: 'Love',
    hz: 528,
    description: 'DNA repair and transformation',
    color: 'from-pink-500 to-rose-500',
    icon: <Heart className="w-5 h-5" />
  },
  {
    id: 'awakening',
    name: 'Awakening',
    hz: 963,
    description: 'Pineal gland activation and higher consciousness',
    color: 'from-cyan-500 to-blue-500',
    icon: <Zap className="w-5 h-5" />
  }
];

export function HealingFrequencyPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeFrequency, setActiveFrequency] = useState<Frequency>(frequencies[0]);
  const [volume, setVolume] = useState(50);
  const [isMuted, setIsMuted] = useState(false);
  const [showVisualizer, setShowVisualizer] = useState(true);
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  // Initialize audio context
  useEffect(() => {
    return () => {
      // Cleanup on unmount
      if (oscillatorRef.current) {
        oscillatorRef.current.stop();
        oscillatorRef.current.disconnect();
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  const startFrequency = () => {
    // Create audio context if it doesn't exist
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }

    const audioContext = audioContextRef.current;

    // Stop any existing oscillator
    if (oscillatorRef.current) {
      oscillatorRef.current.stop();
      oscillatorRef.current.disconnect();
    }

    // Create oscillator and gain nodes
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    // Set frequency and waveform
    oscillator.frequency.setValueAtTime(activeFrequency.hz, audioContext.currentTime);
    oscillator.type = 'sine'; // Pure sine wave for healing frequencies

    // Set volume
    const volumeValue = isMuted ? 0 : volume / 100;
    gainNode.gain.setValueAtTime(volumeValue * 0.3, audioContext.currentTime); // Keep it gentle

    // Connect nodes
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    // Store references
    oscillatorRef.current = oscillator;
    gainNodeRef.current = gainNode;

    // Start oscillator
    oscillator.start();
    setIsPlaying(true);
  };

  const stopFrequency = () => {
    if (oscillatorRef.current) {
      oscillatorRef.current.stop();
      oscillatorRef.current.disconnect();
      oscillatorRef.current = null;
    }
    setIsPlaying(false);
  };

  const togglePlayPause = () => {
    if (isPlaying) {
      stopFrequency();
    } else {
      startFrequency();
    }
  };

  const changeFrequency = (freq: Frequency) => {
    setActiveFrequency(freq);
    if (isPlaying) {
      stopFrequency();
      setActiveFrequency(freq);
      // Small delay to ensure clean transition
      setTimeout(() => startFrequency(), 100);
    }
  };

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0];
    setVolume(newVolume);
    setIsMuted(newVolume === 0);

    if (gainNodeRef.current && audioContextRef.current) {
      const volumeValue = newVolume / 100;
      gainNodeRef.current.gain.setValueAtTime(volumeValue * 0.3, audioContextRef.current.currentTime);
    }
  };

  const toggleMute = () => {
    const newMutedState = !isMuted;
    setIsMuted(newMutedState);

    if (gainNodeRef.current && audioContextRef.current) {
      const volumeValue = newMutedState ? 0 : volume / 100;
      gainNodeRef.current.gain.setValueAtTime(volumeValue * 0.3, audioContextRef.current.currentTime);
    }
  };

  return (
    <Card className="relative overflow-hidden bg-gradient-to-br from-indigo-900/20 via-purple-900/20 to-pink-900/20 backdrop-blur-xl border-primary/30 p-8">
      {/* Animated background */}
      {showVisualizer && isPlaying && (
        <div className="absolute inset-0 overflow-hidden opacity-30">
          <div className={`absolute inset-0 bg-gradient-to-r ${activeFrequency.color} animate-pulse`} />
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full mix-blend-screen animate-ping"
              style={{
                width: `${200 + i * 100}px`,
                height: `${200 + i * 100}px`,
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${3 + i}s`,
                background: `radial-gradient(circle, ${activeFrequency.color.includes('purple') ? 'rgba(147, 51, 234, 0.3)' : activeFrequency.color.includes('pink') ? 'rgba(236, 72, 153, 0.3)' : 'rgba(6, 182, 212, 0.3)'} 0%, transparent 70%)`
              }}
            />
          ))}
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400">
            Sacred Healing Frequencies
          </h2>
          <p className="text-sm text-muted-foreground">
            Attune your consciousness to cosmic harmonics
          </p>
        </div>

        {/* Frequency selector */}
        <div className="grid grid-cols-3 gap-3">
          {frequencies.map((freq) => (
            <button
              key={freq.id}
              onClick={() => changeFrequency(freq)}
              className={`p-4 rounded-lg border transition-all ${
                activeFrequency.id === freq.id
                  ? 'bg-primary/20 border-primary shadow-lg scale-105'
                  : 'bg-background/30 border-primary/20 hover:bg-primary/10 hover:border-primary/40'
              }`}
            >
              <div className="flex items-center justify-center mb-2">
                {freq.icon}
              </div>
              <div className="text-sm font-semibold">{freq.hz} Hz</div>
              <div className="text-xs text-muted-foreground">{freq.name}</div>
            </button>
          ))}
        </div>

        {/* Active frequency display */}
        <div className="text-center p-6 bg-background/30 rounded-lg border border-primary/20">
          <div className="flex items-center justify-center gap-4 mb-3">
            <Badge className={`bg-gradient-to-r ${activeFrequency.color} text-white border-0`}>
              Active Frequency
            </Badge>
            {isPlaying && (
              <div className="flex gap-1">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="w-1 h-4 bg-primary rounded-full animate-pulse"
                    style={{ animationDelay: `${i * 0.2}s` }}
                  />
                ))}
              </div>
            )}
          </div>
          <div className="text-4xl font-bold mb-2">{activeFrequency.hz} Hz</div>
          <div className="text-lg font-semibold mb-1">{activeFrequency.name}</div>
          <p className="text-sm text-muted-foreground">{activeFrequency.description}</p>
        </div>

        {/* Player controls */}
        <div className="space-y-4">
          {/* Play/Pause button */}
          <div className="flex justify-center">
            <Button
              size="lg"
              onClick={togglePlayPause}
              className={`rounded-full w-20 h-20 ${isPlaying ? 'bg-gradient-to-r ' + activeFrequency.color : ''}`}
            >
              {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 ml-1" />}
            </Button>
          </div>

          {/* Volume control */}
          <div className="flex items-center gap-4">
            <button onClick={toggleMute} className="text-muted-foreground hover:text-foreground transition-colors">
              {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </button>
            <Slider
              value={[isMuted ? 0 : volume]}
              onValueChange={handleVolumeChange}
              min={0}
              max={100}
              step={1}
              className="flex-1"
            />
            <span className="text-sm text-muted-foreground w-10 text-right">
              {isMuted ? '0' : volume}%
            </span>
          </div>

          {/* Visualizer toggle */}
          <div className="flex justify-center">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowVisualizer(!showVisualizer)}
              className="text-xs"
            >
              {showVisualizer ? 'Hide' : 'Show'} Visualizer
            </Button>
          </div>
        </div>

        {/* Info message */}
        {isPlaying && (
          <div className="text-center p-3 bg-primary/10 rounded-lg border border-primary/20">
            <p className="text-xs text-muted-foreground">
              🎵 Sacred frequency resonating at {activeFrequency.hz} Hz
            </p>
          </div>
        )}
      </div>
    </Card>
  );
}