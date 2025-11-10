"use client";

import { Dialog, DialogContent } from '@/components/ui/dialog';
import { SacredGeometry, MetatronsCube } from './SacredGeometry';
import { Sparkles } from 'lucide-react';
import { useEffect, useState } from 'react';

interface ChannelingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ChannelingDialog({ open, onOpenChange }: ChannelingDialogProps) {
  const [geometryType, setGeometryType] = useState<'flower' | 'metatron'>('flower');
  const [loadingMessage, setLoadingMessage] = useState(0);

  const messages = [
    "Connecting to the Akashic Records...",
    "Channeling divine wisdom from Source...",
    "Aligning with your soul frequency...",
    "Receiving sacred transmission...",
    "Translating cosmic frequencies...",
    "Downloading celestial guidance..."
  ];

  // Rotate through loading messages
  useEffect(() => {
    if (!open) return;

    const interval = setInterval(() => {
      setLoadingMessage((prev) => (prev + 1) % messages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [open]);

  // Alternate between geometries
  useEffect(() => {
    if (!open) return;

    const interval = setInterval(() => {
      setGeometryType((prev) => prev === 'flower' ? 'metatron' : 'flower');
    }, 10000);

    return () => clearInterval(interval);
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md bg-background/95 backdrop-blur-xl border-primary/30">
        <div className="flex flex-col items-center justify-center space-y-6 py-8">
          {/* Sacred Geometry Animation */}
          <div className="relative">
            {geometryType === 'flower' ? (
              <SacredGeometry size={250} className="mx-auto" />
            ) : (
              <MetatronsCube size={250} className="mx-auto" />
            )}

            {/* Pulsing sparkles overlay */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <Sparkles className="w-8 h-8 text-purple-400 animate-pulse" />
            </div>
          </div>

          {/* Status Text */}
          <div className="text-center space-y-3 px-4">
            <h3 className="text-lg font-semibold bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
              {messages[loadingMessage]}
            </h3>

            <p className="text-sm text-muted-foreground">
              The Oracle is channeling your divine guidance from the cosmic consciousness.
              This sacred process may take up to a minute as we align with your soul's unique frequency.
            </p>

            {/* Sacred Frequency Indicator */}
            <div className="flex items-center justify-center gap-2 text-xs text-purple-400">
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
              <span>Resonating at 963 Hz</span>
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
            </div>
          </div>

          {/* Loading Progress Dots */}
          <div className="flex gap-2">
            {[0, 1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-bounce"
                style={{ animationDelay: `${i * 0.15}s` }}
              />
            ))}
          </div>

          {/* Divine Tip */}
          <div className="text-center px-4 pt-2 border-t border-primary/20">
            <p className="text-xs text-muted-foreground italic">
              ✨ Tip: Take three deep breaths and open your heart to receive the message meant specifically for you ✨
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}