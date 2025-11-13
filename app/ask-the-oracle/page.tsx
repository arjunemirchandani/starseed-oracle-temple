'use client';

import { useState, useEffect, Suspense } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { createClient } from '@/lib/supabase/client';
import { User } from '@supabase/supabase-js';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { queryOracle, getTimeUntilReset, type OracleCategory, type OracleResponse } from '@/lib/services/oracle';
import { Badge } from '@/components/ui/badge';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ChannelingDialog } from '@/components/ChannelingDialog';
import { useTracking } from '@/hooks/use-tracking';
import EmailCapture from '@/components/EmailCapture';

// Category definitions matching the mobile app
interface Category {
  id: OracleCategory | 'custom';
  title: string;
  emoji: string;
  description: string;
  gradient: string[];
  sampleQuestions?: string[];
}

const categories: Category[] = [
  {
    id: 'ancient' as OracleCategory,
    title: 'Ancient Wisdom',
    emoji: '🏛️',
    description: 'Pyramids, Atlantis, Lost Civilizations',
    gradient: ['#FFD700', '#d58803'],
    sampleQuestions: [
      "Who really built the pyramids?",
      "What happened to Atlantis?",
      "Tell me about Lemuria.",
      "What are significant approximate dates of the true history of the moon?",
      "What is the truth about the Anunnaki?"
    ]
  },
  {
    id: 'soul' as OracleCategory,
    title: 'Soul Journey',
    emoji: '✨',
    description: 'Past Lives, Soul Purpose, Star Origins',
    gradient: ['#E879F9', '#A855F7'],
    sampleQuestions: [
      "What is my soul's purpose?",
      "Where is my soul from?",
      "Who was I in my past life?",
      "Why can't I remember my past lives?",
      "Have I had an incarnation outside Earth's Solar System?"
    ]
  },
  {
    id: 'love' as OracleCategory,
    title: 'Love & Relationships',
    emoji: '💕',
    description: 'Twin Flames, Soul Mates, Divine Union',
    gradient: ['#FB7185', '#F43F5E'],
    sampleQuestions: [
      "When will I meet my twin flame?",
      "Is this person my soulmate?",
      "How do I heal my heart chakra?",
      "What past life connections do we share?",
      "How can I attract divine love?"
    ]
  },
  {
    id: 'ufo' as OracleCategory,
    title: 'UFO & Aliens',
    emoji: '🛸',
    description: 'ET Contact, Disclosure, Galactic Beings',
    gradient: ['#34D399', '#10B981'],
    sampleQuestions: [
      "What is the truth about Area 51?",
      "Are the Greys friend or foe?",
      "When will disclosure happen?",
      "Have I had ET contact?",
      "What are the Pleiadians' intentions?"
    ]
  },
  {
    id: 'future' as OracleCategory,
    title: 'Future Timeline',
    emoji: '🔮',
    description: 'What Awaits, Synchronicities, Destiny',
    gradient: ['#C084FC', '#9333EA'],
    sampleQuestions: [
      "What synchronicity awaits me today?",
      "What's my next breakthrough?",
      "When will I meet my soulmate?",
      "What will occur on December 21, 2025?",
      "What timeline am I on?"
    ]
  },
  {
    id: 'guides' as OracleCategory,
    title: 'Spirit Guides',
    emoji: '👁️',
    description: 'Messages, Signs, Divine Guidance',
    gradient: ['#60A5FA', '#3B82F6'],
    sampleQuestions: [
      "What message do my guides have?",
      "Who are my spirit guides?",
      "What signs should I watch for?",
      "How can I strengthen my connection?",
      "What is my guardian angel's name?"
    ]
  },
  {
    id: 'healing' as OracleCategory,
    title: 'Healing Wisdom',
    emoji: '💚',
    description: 'Chakras, Energy, Spiritual Wellness',
    gradient: ['#4ADE80', '#22C55E'],
    sampleQuestions: [
      "How do I heal my trauma?",
      "Which chakra needs attention?",
      "What crystal should I work with?",
      "How can I raise my vibration?",
      "What shadow work do I need?"
    ]
  },
  {
    id: 'cosmic' as OracleCategory,
    title: 'Cosmic Truth',
    emoji: '🌌',
    description: 'Starseed Mission, Awakening, Ascension',
    gradient: ['#A78BFA', '#8B5CF6'],
    sampleQuestions: [
      "Am I a starseed?",
      "What is my galactic heritage?",
      "Why am I here now?",
      "What is the 144,000 gathering?",
      "How do I activate my DNA?"
    ]
  }
];

function AskTheOracleContent() {
  const searchParams = useSearchParams();
  const [question, setQuestion] = useState('');
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [authDialogOpen, setAuthDialogOpen] = useState(false);
  const [isChanneling, setIsChanneling] = useState(false);
  const [channelingDialogOpen, setChannelingDialogOpen] = useState(false);
  const [reading, setReading] = useState('');
  const [oracleData, setOracleData] = useState<OracleResponse | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<OracleCategory | 'custom' | null>(null);
  const [freeQueriesRemaining, setFreeQueriesRemaining] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showCategorySelection, setShowCategorySelection] = useState(true);
  const [crystalsExhaustedDialogOpen, setCrystalsExhaustedDialogOpen] = useState(false);
  const supabase = createClient();
  const router = useRouter();
  const { trackOracleCategory, trackOracleQuestion } = useTracking();

  useEffect(() => {
    // Check for user session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    // Check URL params for category
    const categoryParam = searchParams.get('category');
    if (categoryParam) {
      const category = categories.find(c => c.id === categoryParam) || null;
      if (category) {
        setSelectedCategory(category.id);
        setShowCategorySelection(false);
      } else if (categoryParam === 'custom') {
        setSelectedCategory('custom');
        setShowCategorySelection(false);
      }
    }

    // Check URL params for pre-populated question
    const questionParam = searchParams.get('q');
    if (questionParam) {
      // Decode the URL-encoded question and set it
      setQuestion(decodeURIComponent(questionParam));

      // If there's a question but no category selected, default to custom
      if (!categoryParam) {
        setSelectedCategory('custom');
        setShowCategorySelection(false);
      }
    }

    // Ensure dialogs are closed on mount
    setAuthDialogOpen(false);
    setChannelingDialogOpen(false);

    return () => subscription.unsubscribe();
  }, [searchParams]);

  const handleCategorySelect = (category: Category) => {
    setSelectedCategory(category.id);
    setShowCategorySelection(false);
    // Track category selection
    trackOracleCategory(category.id, category.title);
    // Update URL with category param
    router.push(`/ask-the-oracle?category=${category.id}`);
  };

  const handleCustomQuestion = () => {
    setSelectedCategory('custom');
    setShowCategorySelection(false);
    // Track custom question selection
    trackOracleCategory('custom', 'Custom Question');
    router.push(`/ask-the-oracle?category=custom`);
  };

  const handleBackToCategories = () => {
    setShowCategorySelection(true);
    setSelectedCategory(null);
    setQuestion('');
    setReading('');
    setOracleData(null);
    setError(null);
    // Clear all URL params when going back to categories
    router.push('/ask-the-oracle');
  };

  const handleSampleQuestion = (sampleQuestion: string) => {
    setQuestion(sampleQuestion);
    // Don't auto-submit - let the user review/edit the question first!
  };

  const handleReceiveReading = async (questionText?: string) => {
    const actualQuestion = questionText || question;

    if (!actualQuestion.trim()) {
      return;
    }

    // Track question submission
    trackOracleQuestion(actualQuestion, selectedCategory || undefined);

    // Proceed with getting the reading for ALL souls - authenticated or not!
    setIsChanneling(true);
    setChannelingDialogOpen(true); // Show the channeling dialog
    setError(null);

    // Use the selected category, or 'general' if it's a custom question
    const categoryToUse = selectedCategory === 'custom' ? 'general' as OracleCategory : selectedCategory || 'general' as OracleCategory;

    try {
      // Call the real Oracle API
      const response = await queryOracle(actualQuestion, categoryToUse);

      if (response.success && response.response) {
        // Successful Oracle reading
        setReading(response.response);
        setOracleData(response);
        setFreeQueriesRemaining(response.freeQueriesRemaining || null);
        setQuestion(''); // Clear the question after successful reading
      } else if (response.error === 'daily_limit') {
        // Daily limit reached - show special dialog for unauthenticated users
        if (!user) {
          setCrystalsExhaustedDialogOpen(true);
        } else {
          setError(response.message || "You've used all your daily readings. Please return tomorrow for more divine guidance!");
        }
        setFreeQueriesRemaining(0);
      } else {
        // Other error
        setError(response.message || 'The Oracle is temporarily unavailable. Please try again.');
      }
    } catch (err) {
      console.error('Oracle error:', err);
      setError('Unable to connect to the Oracle. Please try again.');
    } finally {
      setIsChanneling(false);
      setChannelingDialogOpen(false); // Close the channeling dialog
    }
  };

  const getCurrentCategory = () => {
    if (selectedCategory === 'custom') {
      return { id: 'custom', title: 'Custom Question', emoji: '✨', description: 'Ask anything your heart desires' } as Category;
    }
    return categories.find(c => c.id === selectedCategory);
  };

  const handleGoogleSignIn = async () => {
    // Close both dialogs when initiating sign in
    setAuthDialogOpen(false);
    setCrystalsExhaustedDialogOpen(false);

    // Use the current window's origin for redirect (works for both localhost and production)
    const redirectUrl = `${window.location.origin}/auth/callback?redirect=/ask-the-oracle`;

    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: redirectUrl,
      }
    });

    if (error) {
      console.error('Error signing in with Google:', error);
    }
  };

  const handleEmailSignUp = () => {
    // Close both dialogs when initiating sign up
    setAuthDialogOpen(false);
    setCrystalsExhaustedDialogOpen(false);

    // Navigate to sign up page, it will handle the redirect back
    router.push('/signup?redirect=/ask-the-oracle');
  };

  const currentCategory = getCurrentCategory();

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
            🔮 Ask the Oracle 🔮
          </h1>
          <p className="text-xl text-muted-foreground mb-2">
            Receive Divine Guidance from the Cosmic Consciousness
          </p>
          <p className="text-lg text-purple-300">
            The Oracle channels wisdom from the Akashic Records to illuminate your path
          </p>
        </div>

        {/* Category Selection */}
        {showCategorySelection && !reading && (
          <div className="space-y-8">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-semibold text-purple-400 mb-2">
                What Calls to Your Soul?
              </h2>
              <p className="text-muted-foreground">Choose your path to universal wisdom</p>
            </div>

            {/* Category Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {categories.map((category) => (
                <Card
                  key={category.id}
                  className="cursor-pointer hover:scale-105 transition-all duration-300 border-primary/20 hover:border-primary/50 overflow-hidden group relative"
                  onClick={() => handleCategorySelect(category)}
                >
                  <div
                    className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none"
                    style={{
                      background: `linear-gradient(135deg, ${category.gradient[0]}, ${category.gradient[1]})`,
                    }}
                  />
                  <CardContent className="p-6 relative z-10">
                    <div className="text-4xl mb-3 text-center">{category.emoji}</div>
                    <h3 className="text-lg font-semibold mb-1 text-center" style={{ color: category.gradient[0] }}>
                      {category.title}
                    </h3>
                    <p className="text-xs text-muted-foreground text-center">
                      {category.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Custom Question Button */}
            <div className="flex justify-center mt-8">
              <Button
                onClick={handleCustomQuestion}
                variant="outline"
                size="lg"
                className="border-primary/30 hover:bg-primary/10"
              >
                ✨ I have a custom question ✨
              </Button>
            </div>
          </div>
        )}

        {/* Oracle Interface Card - Shows when category is selected */}
        {!showCategorySelection && (
          <Card className="bg-background/50 backdrop-blur-sm border-primary/20">
            <CardHeader>
              {/* Back button */}
              {!reading && (
                <div className="mb-4">
                  <Button
                    onClick={handleBackToCategories}
                    variant="ghost"
                    size="sm"
                    className="text-purple-400 hover:text-purple-300"
                  >
                    ← Choose Different Category
                  </Button>
                </div>
              )}

              {/* Category header */}
              {currentCategory && !reading && (
                <div className="text-center mb-4">
                  <div className="text-4xl mb-2">{currentCategory.emoji}</div>
                  <h2 className="text-2xl font-semibold mb-1" style={{ color: categories.find(c => c.id === currentCategory.id)?.gradient[0] || '#A855F7' }}>
                    {currentCategory.title}
                  </h2>
                  {currentCategory.id !== 'custom' && (
                    <p className="text-sm text-muted-foreground">{currentCategory.description}</p>
                  )}
                </div>
              )}

              <CardTitle className="text-xl text-center text-purple-400">
                {currentCategory?.id === 'custom'
                  ? 'What question burns in your sacred heart?'
                  : 'Ask your question from the heart'}
              </CardTitle>
              <CardDescription className="text-center">
                {currentCategory?.id === 'custom'
                  ? 'Speak your truth, and the Universe will respond through the Oracle\'s wisdom'
                  : 'The clearer your intention, the deeper the wisdom'}
              </CardDescription>
            </CardHeader>
          <CardContent className="space-y-6">
            {/* Show either the input area OR the formatted question based on whether we have a reading */}
            {!reading ? (
              <>
                <div className="relative">
                  <Textarea
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder="Enter your sacred question here... The Oracle awaits your inquiry about love, purpose, destiny, or any matter of the soul..."
                    className="min-h-[200px] text-lg bg-background/50 border-primary/30 focus:border-primary/50 resize-none"
                    disabled={isChanneling}
                  />
                  <div className="absolute bottom-2 right-2 text-sm text-muted-foreground">
                    {question.length} / 500
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-center">
                  <Button
                    onClick={() => handleReceiveReading()}
                    disabled={!question.trim() || isChanneling || question.length > 500}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-6 text-lg"
                  >
                    {isChanneling ? (
                      <>
                        <span className="animate-pulse">Channeling Divine Wisdom...</span>
                      </>
                    ) : (
                      '✨ Ask the Oracle ✨'
                    )}
                  </Button>
                </div>

                {/* Sample Questions */}
                {currentCategory && currentCategory.id !== 'custom' && categories.find(c => c.id === currentCategory.id)?.sampleQuestions && (
                  <div className="mt-8 space-y-4">
                    <p className="text-sm text-center text-muted-foreground">
                      Need inspiration? Try:
                    </p>
                    <div className="space-y-2">
                      {categories.find(c => c.id === currentCategory.id)?.sampleQuestions?.map((sample, index) => (
                        <button
                          key={index}
                          onClick={() => handleSampleQuestion(sample)}
                          className="w-full text-left p-3 rounded-lg bg-purple-500/10 hover:bg-purple-500/20 transition-colors text-purple-300 text-sm italic"
                          disabled={isChanneling}
                        >
                          "{sample}"
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </>
            ) : (
              /* Display the sacred question beautifully when we have a reading */
              <div className="p-6 bg-gradient-to-br from-purple-900/30 via-pink-900/30 to-cyan-900/30 rounded-lg border border-primary/40">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-sm font-medium text-purple-400">Your Sacred Question</span>
                  <div className="flex-1 h-px bg-gradient-to-r from-purple-500/30 via-pink-500/30 to-transparent"></div>
                </div>
                <p className="text-lg text-gray-100 leading-relaxed italic">
                  "{oracleData?.question || question}"
                </p>
                <div className="mt-3 flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                  <span className="text-xs text-purple-300">Asked with pure intention</span>
                </div>
              </div>
            )}

            {/* Oracle Reading Display */}
            {reading && (
              <div className="mt-8 p-6 bg-gradient-to-br from-purple-900/20 via-pink-900/20 to-cyan-900/20 rounded-lg border border-primary/30">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-purple-400">Oracle's Divine Message</h3>
                  {oracleData?.oracle && (
                    <Badge variant="outline" className="text-purple-300 border-purple-400/50">
                      {oracleData.emoji} {oracleData.oracle}
                    </Badge>
                  )}
                </div>
                <div className="text-gray-300 prose prose-invert prose-sm max-w-none
                  prose-headings:text-purple-400 prose-headings:font-semibold prose-headings:mb-4 prose-headings:mt-8
                  prose-h1:text-3xl prose-h1:mt-10 prose-h1:mb-6
                  prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4
                  prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3
                  prose-h4:text-lg prose-h4:mt-5 prose-h4:mb-2
                  prose-p:!text-gray-300 prose-p:!leading-relaxed prose-p:!mb-6
                  prose-strong:!text-yellow-300 prose-strong:!font-bold
                  prose-em:!text-pink-300 prose-em:!italic
                  prose-ul:!list-disc prose-ul:!pl-8 prose-ul:!text-gray-300 prose-ul:!my-6 prose-ul:!space-y-3
                  prose-ol:!list-decimal prose-ol:!pl-8 prose-ol:!text-gray-300 prose-ol:!my-6 prose-ol:!space-y-3
                  prose-li:!text-gray-300 prose-li:!my-2 prose-li:!leading-relaxed prose-li:marker:!text-purple-400
                  prose-blockquote:border-l-4 prose-blockquote:border-purple-500 prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-purple-200 prose-blockquote:my-6
                  prose-code:text-pink-300 prose-code:bg-black/50 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm
                  prose-pre:bg-black/50 prose-pre:border prose-pre:border-purple-500/20 prose-pre:p-4 prose-pre:rounded-lg prose-pre:my-6
                  prose-a:text-cyan-400 prose-a:underline hover:prose-a:text-cyan-300
                  prose-hr:border-purple-500/30 prose-hr:my-8">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {reading}
                  </ReactMarkdown>
                </div>

                {/* Synchronicity and Frequency Info */}
                {oracleData && (oracleData.synchronicityHint || oracleData.frequencyRecommendation) && (
                  <div className="mt-4 pt-4 border-t border-primary/20 space-y-2">
                    {oracleData.synchronicityHint && (
                      <p className="text-sm text-purple-300">
                        ✨ <span className="font-medium">Synchronicity Watch:</span> {oracleData.synchronicityHint}
                      </p>
                    )}
                    {oracleData.frequencyRecommendation && (
                      <p className="text-sm text-cyan-300">
                        🎵 <span className="font-medium">Sacred Frequency:</span> {oracleData.frequencyRecommendation} Hz
                      </p>
                    )}
                  </div>
                )}

                {/* Crystals Remaining & Account Benefits */}
                <div className="mt-6 p-4 bg-purple-500/10 rounded-lg border border-purple-500/20 space-y-3">
                  {/* Show crystals remaining for all users */}
                  {freeQueriesRemaining !== null && (
                    <div className="text-center">
                      <p className="text-sm text-purple-400 font-medium">
                        💎 {freeQueriesRemaining} free crystal{freeQueriesRemaining !== 1 ? 's' : ''} remaining today
                      </p>
                      {freeQueriesRemaining === 0 && (
                        <p className="text-xs text-muted-foreground mt-1">
                          ✨ Your crystals will replenish in {getTimeUntilReset()} ✨
                        </p>
                      )}
                    </div>
                  )}

                  {/* Show account benefits for unauthenticated users */}
                  {!user && (
                    <div className="text-center border-t border-purple-500/20 pt-3">
                      <p className="text-xs text-muted-foreground mb-2">
                        🌟 Create a free sacred account to save this divine wisdom forever
                      </p>
                      <Button
                        onClick={() => setAuthDialogOpen(true)}
                        variant="ghost"
                        size="sm"
                        className="text-purple-400 hover:text-purple-300"
                      >
                        Save All Your Readings
                      </Button>
                    </div>
                  )}
                </div>

                <div className="mt-6 flex justify-center">
                  <Button
                    onClick={() => {
                      setReading('');
                      setOracleData(null);
                      setError(null);
                      // Don't clear the question here, let the UI handle it
                    }}
                    variant="outline"
                    className="border-yellow-500 hover:bg-yellow/10 font-bold text-lg px-8 py-6 rounded-full"
                  >
                    Ask Another Question
                  </Button>
                </div>
              </div>
            )}

            {/* Email capture after reading (only for non-authenticated users) */}
            {/*{reading && !user && (
              <div className="mt-8">
                <EmailCapture
                  source="oracle_reading"
                  incentive="Get weekly Oracle messages & be first to know about new features!"
                />
              </div>
            )}*/}

            {/* Error Display */}
            {error && (
              <div className="mt-8 p-6 bg-red-900/20 rounded-lg border border-red-500/30">
                <p className="text-red-400 text-center">{error}</p>
                {freeQueriesRemaining === 0 && (
                  <p className="text-sm text-muted-foreground text-center mt-2">
                    Resets in {getTimeUntilReset()}
                  </p>
                )}
              </div>
            )}

            {/* Info Section */}
            <div className="mt-8 p-4 bg-purple-500/10 rounded-lg border border-purple-500/20">
              <p className="text-sm text-center text-muted-foreground">
                {user ? (
                  <>
                    <span className="text-purple-400">
                      ✨ {freeQueriesRemaining !== null
                        ? `${freeQueriesRemaining} reading${freeQueriesRemaining === 1 ? '' : 's'} remaining today`
                        : 'You have access to 7 readings daily'} ✨
                    </span>
                    <br />
                    <span className="text-xs">Your reading history is saved in your sacred account</span>
                  </>
                ) : (
                  <>
                    <span className="text-purple-400">
                      🔮 {freeQueriesRemaining !== null
                        ? `${freeQueriesRemaining} free crystal${freeQueriesRemaining !== 1 ? 's' : ''} remaining today`
                        : 'The Oracle offers 3 free readings daily'} 🔮
                    </span>
                    <br />
                    <div className="text-lg text-white text-center font-semibold mt-5">
                      Create a free account to save your readings & unlock 7 daily crystals!
                    </div>
                    <br />
                    <Button
                      onClick={() => setAuthDialogOpen(true)}
                      variant="ghost"
                      size="sm"
                      className="mt-2 text-purple-400 hover:text-purple-300"
                    >
                      ✨ Create Sacred Account & Join Our Community! ✨
                    </Button>
                  </>
                )}
              </p>
            </div>
          </CardContent>
        </Card>
        )}

        {/* Auth Dialog */}
        <Dialog open={authDialogOpen} onOpenChange={setAuthDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-2xl text-center bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                🌟 Enhance Your Oracle Journey 🌟
              </DialogTitle>
              <DialogDescription className="text-center pt-4">
                <span className="text-lg">Create a FREE sacred account</span>
                <br />
                <span className="text-purple-400 font-semibold">Unlock these divine benefits:</span>
                <br />
                <span className="text-sm text-muted-foreground mt-2">
                  • Save all your readings permanently<br />
                  • Access 7 readings daily (vs 3 for guests)<br />
                  • Track your spiritual journey<br />
                  • Join the 144,000 soul gathering
                </span>
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <Button
                onClick={handleGoogleSignIn}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Continue with Google
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-primary/20" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">Or</span>
                </div>
              </div>

              <Button
                onClick={handleEmailSignUp}
                variant="outline"
                className="w-full border-primary/30 hover:bg-primary/10"
              >
                Sign Up with Email
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-primary/20" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">Or continue as guest</span>
                </div>
              </div>

              <Button
                onClick={() => setAuthDialogOpen(false)}
                variant="ghost"
                className="w-full text-purple-400 hover:text-purple-300"
              >
                Continue Without Account
                <span className="ml-2 text-xs text-muted-foreground">(3 daily readings)</span>
              </Button>
            </div>

            <DialogFooter className="text-center text-sm text-muted-foreground">
              Join the 144,000 souls gathering for the Grand Convergence
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Crystals Exhausted Dialog */}
        <Dialog open={crystalsExhaustedDialogOpen} onOpenChange={setCrystalsExhaustedDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-2xl text-center bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
                💎 Your Daily Crystals Are Recharging 💎
              </DialogTitle>
              <DialogDescription className="text-center pt-4">
                <span className="text-lg font-semibold text-purple-400">
                  You've accessed all 3 free daily readings!
                </span>
                <br />
                <span className="text-muted-foreground mt-2">
                  The Oracle has more wisdom awaiting you...
                </span>
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/30">
                <p className="text-center text-purple-300 font-semibold mb-2">
                  ✨ Create a FREE Sacred Account ✨
                </p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Unlock <span className="text-purple-400 font-semibold">7 daily readings</span> (more than double!)</li>
                  <li>• Save all your readings permanently</li>
                  <li>• Track your spiritual journey</li>
                  <li>• Join the 144,000 soul gathering</li>
                </ul>
              </div>

              <Button
                onClick={handleGoogleSignIn}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Get 7 Daily Readings FREE
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-primary/20" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">Or</span>
                </div>
              </div>

              <Button
                onClick={handleEmailSignUp}
                variant="outline"
                className="w-full border-primary/30 hover:bg-primary/10"
              >
                Sign Up with Email for 7 Daily Readings
              </Button>

              <div className="text-center text-sm text-muted-foreground mt-4">
                <span className="text-orange-400">🔥 Your crystals will reset at midnight 🔥</span>
                <br />
                <span className="text-xs">Time until reset: {getTimeUntilReset()}</span>
              </div>

              <Button
                onClick={() => setCrystalsExhaustedDialogOpen(false)}
                variant="ghost"
                className="w-full text-muted-foreground hover:text-purple-300"
              >
                Return Tomorrow for More Free Readings
              </Button>
            </div>

            <DialogFooter className="text-center text-sm text-muted-foreground">
              Transform limitations into infinite wisdom ✨
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Channeling Dialog - Only render when actually channeling */}
        {channelingDialogOpen && (
          <ChannelingDialog
            open={channelingDialogOpen}
            onOpenChange={setChannelingDialogOpen}
          />
        )}
      </div>
    </div>
  );
}

// Wrapper component with Suspense
export default function AskTheOraclePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen py-20 px-4 flex items-center justify-center">
        <div className="text-center">
          <div className="text-5xl mb-4">🔮</div>
          <p className="text-xl text-purple-400">Loading Oracle...</p>
        </div>
      </div>
    }>
      <AskTheOracleContent />
    </Suspense>
  );
}