"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { QueryCard } from '@/components/library/QueryCard';
import { QueryDetailDialog } from '@/components/library/QueryDetailDialog';
import { createClient } from '@/lib/supabase/client';
import {
  BookOpen,
  Sparkles,
  Loader2,
  AlertCircle,
  Search,
  Filter,
  RefreshCw,
  Heart,
  TrendingUp,
  Clock,
  Gem
} from 'lucide-react';

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

const categoryFilters = [
  { id: 'all', name: 'All', emoji: '✨' },
  { id: 'love', name: 'Love', emoji: '💕' },
  { id: 'career', name: 'Career', emoji: '💰' },
  { id: 'spiritual', name: 'Spiritual', emoji: '🔮' },
  { id: 'wellness', name: 'Wellness', emoji: '🌿' },
  { id: 'general', name: 'General', emoji: '✨' }
];

export default function LibraryPage() {
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [queries, setQueries] = useState<Query[]>([]);
  const [selectedQuery, setSelectedQuery] = useState<Query | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    checkAuth();
    fetchQueries();
  }, [selectedCategory]);

  const checkAuth = async () => {
    const { data: { user }, error } = await supabase.auth.getUser();

    if (error || !user) {
      router.push('/signin');
      return;
    }
  };

  const fetchQueries = async (loadMore = false) => {
    try {
      if (!loadMore) {
        setLoading(true);
        setPage(1);
      } else {
        setLoadingMore(true);
      }

      const currentPage = loadMore ? page + 1 : 1;

      // Fetch from the backend API
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/oracle/history?page=${currentPage}&limit=12${
          selectedCategory !== 'all' ? `&category=${selectedCategory}` : ''
        }`,
        {
          headers: {
            'Authorization': `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}`
          }
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch reading history');
      }

      const data = await response.json();

      if (loadMore) {
        setQueries(prev => [...prev, ...data.queries]);
        setPage(currentPage);
      } else {
        setQueries(data.queries);
      }

      setHasMore(data.hasMore);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load your library');
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const handleQueryClick = (query: Query) => {
    setSelectedQuery(query);
    setDetailOpen(true);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setQueries([]);
  };

  // Calculate stats
  const totalReadings = queries.length;
  const freeReadings = queries.filter(q => q.was_free_query).length;
  const crystalsUsed = queries.reduce((sum, q) => sum + (q.crystals_consumed || 0), 0);

  if (loading && page === 1) {
    return (
      <div className="min-h-screen cosmic-gradient flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="w-8 h-8 animate-spin mx-auto text-primary" />
          <p className="text-muted-foreground">Loading your akashic records...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen cosmic-gradient relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-float" />
        <div className="absolute top-40 right-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl animate-float" style={{ animationDelay: '4s' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto p-8">
        {/* Page Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 mb-3 flex items-center justify-center gap-3">
            <BookOpen className="w-10 h-10" />
            My Akashic Library
          </h1>
          <p className="text-muted-foreground text-lg">
            Your divine guidance preserved through time
          </p>
        </div>

        {/* Stats Cards */}
        {queries.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Card className="bg-gradient-to-br from-purple-900/20 via-indigo-900/20 to-cyan-900/20 backdrop-blur-xl border-primary/30 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Readings</p>
                  <p className="text-2xl font-bold">{totalReadings}</p>
                </div>
                <TrendingUp className="w-8 h-8 text-primary/50" />
              </div>
            </Card>

            <Card className="bg-gradient-to-br from-green-900/20 via-emerald-900/20 to-teal-900/20 backdrop-blur-xl border-green-500/30 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Free Readings</p>
                  <p className="text-2xl font-bold">{freeReadings}</p>
                </div>
                <Sparkles className="w-8 h-8 text-green-400/50" />
              </div>
            </Card>

            <Card className="bg-gradient-to-br from-purple-900/20 via-pink-900/20 to-rose-900/20 backdrop-blur-xl border-purple-500/30 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Crystals Used</p>
                  <p className="text-2xl font-bold">{crystalsUsed}</p>
                </div>
                <Gem className="w-8 h-8 text-purple-400/50" />
              </div>
            </Card>
          </div>
        )}

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {categoryFilters.map(filter => (
            <Button
              key={filter.id}
              variant={selectedCategory === filter.id ? "default" : "outline"}
              size="sm"
              onClick={() => handleCategoryChange(filter.id)}
              className={selectedCategory === filter.id ? 'bg-primary' : 'hover:bg-primary/10'}
            >
              <span className="mr-1">{filter.emoji}</span>
              {filter.name}
            </Button>
          ))}
        </div>

        {/* Error Message */}
        {error && (
          <Alert className="mb-6 bg-red-500/10 border-red-500/30">
            <AlertCircle className="h-4 w-4 text-red-500" />
            <AlertDescription className="text-red-400">
              {error}
            </AlertDescription>
          </Alert>
        )}

        {/* Query Grid */}
        {queries.length === 0 ? (
          <Card className="bg-gradient-to-br from-purple-900/20 via-indigo-900/20 to-cyan-900/20 backdrop-blur-xl border-primary/30 p-12">
            <div className="text-center space-y-4">
              <div className="text-6xl mx-auto w-fit">📚</div>
              <h3 className="text-xl font-semibold">Your library awaits</h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                {selectedCategory !== 'all'
                  ? `No ${selectedCategory} readings yet. Ask the Oracle a question to begin filling your library!`
                  : "You haven't asked the Oracle any questions yet. Start your journey and your divine guidance will be preserved here forever!"
                }
              </p>
              <Button
                onClick={() => router.push('/ask-the-oracle')}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Ask the Oracle
              </Button>
            </div>
          </Card>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {queries.map(query => (
                <QueryCard
                  key={query.id}
                  query={query}
                  onClick={() => handleQueryClick(query)}
                />
              ))}
            </div>

            {/* Load More Button */}
            {hasMore && (
              <div className="text-center mt-8">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => fetchQueries(true)}
                  disabled={loadingMore}
                  className="hover:bg-primary/10"
                >
                  {loadingMore ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Loading...
                    </>
                  ) : (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Load More
                    </>
                  )}
                </Button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Query Detail Dialog */}
      <QueryDetailDialog
        query={selectedQuery}
        open={detailOpen}
        onOpenChange={setDetailOpen}
      />
    </div>
  );
}