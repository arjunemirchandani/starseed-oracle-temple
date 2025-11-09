"use client";

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Sparkles, Hash, Gem, Eye } from 'lucide-react';

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

interface QueryCardProps {
  query: Query;
  onClick: () => void;
}

const categoryColors: Record<string, string> = {
  love: 'from-pink-500/20 to-rose-500/20 border-pink-500/30',
  career: 'from-amber-500/20 to-orange-500/20 border-amber-500/30',
  spiritual: 'from-purple-500/20 to-indigo-500/20 border-purple-500/30',
  wellness: 'from-green-500/20 to-emerald-500/20 border-green-500/30',
  general: 'from-blue-500/20 to-cyan-500/20 border-blue-500/30'
};

export function QueryCard({ query, onClick }: QueryCardProps) {
  // Format the date nicely
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
      if (diffHours === 0) {
        const diffMinutes = Math.floor(diffTime / (1000 * 60));
        return diffMinutes === 0 ? 'Just now' : `${diffMinutes} minute${diffMinutes !== 1 ? 's' : ''} ago`;
      }
      return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
    } else if (diffDays === 1) {
      return 'Yesterday';
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else {
      return date.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
      });
    }
  };

  // Truncate question for preview
  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength).trim() + '...';
  };

  const gradientClass = categoryColors[query.category] || categoryColors.general;

  return (
    <Card
      className={`relative overflow-hidden bg-gradient-to-br ${gradientClass} backdrop-blur-xl cursor-pointer transition-all hover:scale-[1.02] hover:shadow-xl group`}
      onClick={onClick}
    >
      {/* Floating particles animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
        <div className="absolute w-32 h-32 bg-white rounded-full mix-blend-screen filter blur-xl animate-float" />
        <div className="absolute w-24 h-24 bg-white rounded-full mix-blend-screen filter blur-xl animate-float right-0 animation-delay-2000" />
      </div>

      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{query.emoji}</span>
            <div>
              <h3 className="font-semibold text-sm">{query.oracle}</h3>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {formatDate(query.created_at)}
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            {query.was_free_query ? (
              <Badge variant="outline" className="bg-green-500/10 border-green-500/30 text-xs">
                <Sparkles className="w-3 h-3 mr-1" />
                Free
              </Badge>
            ) : (
              <Badge variant="outline" className="bg-purple-500/10 border-purple-500/30 text-xs">
                <Gem className="w-3 h-3 mr-1" />
                {query.crystals_consumed}
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="space-y-2">
          <p className="text-sm font-medium text-foreground/90">
            {truncateText(query.question, 150)}
          </p>
          <p className="text-xs text-muted-foreground line-clamp-2">
            {truncateText(query.response, 200)}
          </p>
        </div>

        <div className="flex items-center justify-between pt-2">
          <Badge variant="outline" className="capitalize text-xs">
            {query.category}
          </Badge>
          <Button
            variant="ghost"
            size="sm"
            className="text-xs group-hover:text-primary transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              onClick();
            }}
          >
            <Eye className="w-3 h-3 mr-1" />
            Read Full
          </Button>
        </div>
      </CardContent>

      {/* Sacred geometry overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-5">
        <svg viewBox="0 0 400 400" className="w-full h-full">
          <circle cx="200" cy="200" r="180" fill="none" stroke="currentColor" strokeWidth="0.5" />
          <circle cx="200" cy="200" r="150" fill="none" stroke="currentColor" strokeWidth="0.5" />
        </svg>
      </div>
    </Card>
  );
}