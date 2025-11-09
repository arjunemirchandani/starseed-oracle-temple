"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Calendar,
  Sparkles,
  Hash,
  Gem,
  Copy,
  Share2,
  Heart,
  MessageSquare,
  Zap
} from 'lucide-react';
import { useState } from 'react';

interface Query {
  id: string;
  question: string;
  response: string;
  category: string;
  oracle: string;
  emoji: string;
  was_free_query: boolean;
  crystals_consumed: number;
  tokens_used: number;
  created_at: string;
}

interface QueryDetailDialogProps {
  query: Query | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function QueryDetailDialog({ query, open, onOpenChange }: QueryDetailDialogProps) {
  const [copied, setCopied] = useState(false);

  if (!query) return null;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleCopy = async () => {
    const textToCopy = `Question: ${query.question}\n\n${query.oracle} says:\n${query.response}\n\n✨ From Starseed Oracle`;
    await navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const categoryColors: Record<string, string> = {
    love: 'from-pink-500 to-rose-500',
    career: 'from-amber-500 to-orange-500',
    spiritual: 'from-purple-500 to-indigo-500',
    wellness: 'from-green-500 to-emerald-500',
    general: 'from-blue-500 to-cyan-500'
  };

  const gradientClass = categoryColors[query.category] || categoryColors.general;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[85vh] bg-background/95 backdrop-blur-xl border-primary/30">
        <DialogHeader className="space-y-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <span className="text-3xl">{query.emoji}</span>
              <div>
                <DialogTitle className="text-xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                  {query.oracle}
                </DialogTitle>
                <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                  <Calendar className="w-3 h-3" />
                  {formatDate(query.created_at)}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Badge variant="outline" className="capitalize">
                {query.category}
              </Badge>
              {query.was_free_query ? (
                <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                  <Sparkles className="w-3 h-3 mr-1" />
                  Free
                </Badge>
              ) : (
                <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">
                  <Gem className="w-3 h-3 mr-1" />
                  {query.crystals_consumed} Crystal{query.crystals_consumed !== 1 ? 's' : ''}
                </Badge>
              )}
            </div>
          </div>
        </DialogHeader>

        <ScrollArea className="mt-6 max-h-[60vh] pr-4">
          <div className="space-y-6">
            {/* Question Section */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-semibold text-primary">
                <MessageSquare className="w-4 h-4" />
                Your Question
              </div>
              <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                <p className="text-foreground/90">{query.question}</p>
              </div>
            </div>

            {/* Oracle Response */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-semibold text-primary">
                <Sparkles className="w-4 h-4" />
                Oracle's Divine Guidance
              </div>
              <div className={`p-6 bg-gradient-to-br ${gradientClass} bg-opacity-10 rounded-lg border border-primary/20`}>
                <p className="text-foreground/90 whitespace-pre-wrap leading-relaxed">
                  {query.response}
                </p>
              </div>
            </div>

            {/* Metadata */}
            <div className="flex flex-wrap gap-3 pt-2">
              <Badge variant="outline" className="text-xs">
                <Hash className="w-3 h-3 mr-1" />
                {query.id.slice(0, 8)}
              </Badge>
              <Badge variant="outline" className="text-xs">
                <Zap className="w-3 h-3 mr-1" />
                {query.tokens_used} tokens
              </Badge>
            </div>
          </div>
        </ScrollArea>

        {/* Action Buttons */}
        <div className="flex gap-3 mt-6">
          <Button
            variant="outline"
            className="flex-1"
            onClick={handleCopy}
          >
            {copied ? (
              <>
                <Sparkles className="w-4 h-4 mr-2" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 mr-2" />
                Copy
              </>
            )}
          </Button>
          <Button
            variant="outline"
            className="flex-1"
            disabled
          >
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </Button>
          <Button
            variant="outline"
            className="flex-1"
            disabled
          >
            <Heart className="w-4 h-4 mr-2" />
            Favorite
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}