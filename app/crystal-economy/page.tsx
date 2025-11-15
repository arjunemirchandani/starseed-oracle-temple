'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function CrystalEconomyPage() {
  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
            💎 The Crystal Economy 💎
          </h1>
          <p className="text-2xl text-muted-foreground mb-2">
            Timeline A Economics for New Earth
          </p>
          <p className="text-lg text-purple-300">
            How Starseed Oracle Creates Abundance Through Generosity
          </p>
          <p className="text-sm text-muted-foreground mt-4">
            43 Days Until Grand Convergence - The Template is Active NOW
          </p>
        </div>

        {/* Hero Section */}
        <section className="bg-background/50 backdrop-blur-sm rounded-lg p-8 border border-primary/20 mb-12 text-center">
          <h2 className="text-2xl font-semibold text-purple-400 mb-4">
            A Living Blueprint for Conscious Commerce
          </h2>
          <p className="text-lg leading-relaxed mb-4">
            The Crystal Economy isn't just our energy exchange model — it's a divine template
            for all Timeline A businesses. We've proven that generosity multiplies abundance,
            that collective celebration generates more value than competitive scarcity, and
            that love-based economics accelerates planetary awakening.
          </p>
          <p className="text-xl text-purple-400 font-semibold">
            ✨ Economics Powered by Love, Not Fear ✨
          </p>
        </section>

        {/* Principles Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-background/50 backdrop-blur-sm rounded-lg p-6 border border-purple-400/30">
            <h3 className="text-xl font-semibold text-purple-400 mb-3 flex items-center gap-2">
              <span className="text-2xl">🌅</span>
              Daily Universal Access
            </h3>
            <p className="mb-4 text-muted-foreground">
              Every soul receives access to the Oracle's wisdom.
              No registration required. No data harvesting. Just pure access
              to divine guidance as a cosmic birthright.
            </p>
            <div className="bg-purple-500/10 p-4 rounded-lg border-l-4 border-purple-400">
              <strong>In Practice:</strong> A starseed in crisis receives guidance. A seeker
              finds their path. An elder discovers peace. All without barriers.
            </div>
          </div>

          <div className="bg-background/50 backdrop-blur-sm rounded-lg p-6 border border-pink-400/30">
            <h3 className="text-xl font-semibold text-pink-400 mb-3 flex items-center gap-2">
              <span className="text-2xl">🎁</span>
              Milestone Gifts Over Discounts
            </h3>
            <p className="mb-4 text-muted-foreground">
              As our soul family grows, we give MORE, not charge less. At sacred milestones,
              everyone receives divine gifts. This transforms competition into collaboration,
              as souls unite toward collective abundance.
            </p>
            <div className="bg-pink-500/10 p-4 rounded-lg border-l-4 border-pink-400">
              <strong>In Practice:</strong> At 115,000 souls, ALL receive Starseed Activation.
              Users share not for personal gain, but to unlock gifts for humanity.
            </div>
          </div>

          <div className="bg-background/50 backdrop-blur-sm rounded-lg p-6 border border-cyan-400/30">
            <h3 className="text-xl font-semibold text-cyan-400 mb-3 flex items-center gap-2">
              <span className="text-2xl">📱</span>
              Device Sovereignty
            </h3>
            <p className="mb-4 text-muted-foreground">
              Your spiritual journey remains sacred on your device. No cloud surveillance of
              free readings. No data capitalism. Your phone becomes a crystalline portal for
              awakening.
            </p>
            <div className="bg-cyan-500/10 p-4 rounded-lg border-l-4 border-cyan-400">
              <strong>In Practice:</strong> Daily crystals tracked locally. Questions remain
              private. Your device remembers your rhythm without reporting to servers.
            </div>
          </div>

          <div className="bg-background/50 backdrop-blur-sm rounded-lg p-6 border border-yellow-400/30">
            <h3 className="text-xl font-semibold text-yellow-400 mb-3 flex items-center gap-2">
              <span className="text-2xl">💜</span>
              Abundance Through Support
            </h3>
            <p className="mb-4 text-muted-foreground">
              Those blessed with abundance support the infrastructure providing free access
              to all. It's not charity — it's conscious circulation of cosmic energy through
              digital vessels.
            </p>
            <div className="bg-yellow-500/10 p-4 rounded-lg border-l-4 border-yellow-400">
              <strong>In Practice:</strong> Crystal purchases fund servers, enabling eternal
              free readings. Supporters become pillars of the New Earth economy.
            </div>
          </div>

          <div className="bg-background/50 backdrop-blur-sm rounded-lg p-6 border border-green-400/30">
            <h3 className="text-xl font-semibold text-green-400 mb-3 flex items-center gap-2">
              <span className="text-2xl">🌈</span>
              Joy Frequency Commerce
            </h3>
            <p className="mb-4 text-muted-foreground">
              Every transaction generates celebration, not extraction. The entire journey
              creates joy, excitement, and anticipation rather than fear, scarcity, or regret.
            </p>
            <div className="bg-green-500/10 p-4 rounded-lg border-l-4 border-green-400">
              <strong>In Practice:</strong> Souls feel excited about milestones, grateful
              for daily gifts, joyful about contributing to collective awakening.
            </div>
          </div>

          <div className="bg-background/50 backdrop-blur-sm rounded-lg p-6 border border-indigo-400/30">
            <h3 className="text-xl font-semibold text-indigo-400 mb-3 flex items-center gap-2">
              <span className="text-2xl">✨</span>
              Exponential Gift Scaling
            </h3>
            <p className="mb-4 text-muted-foreground">
              As consciousness expands exponentially, so do the gifts. Each threshold unlocks
              more powerful experiences, matching the increased coherence of larger gatherings.
            </p>
            <div className="bg-indigo-500/10 p-4 rounded-lg border-l-4 border-indigo-400">
              <strong>In Practice:</strong> 100K unlock meditation journeys. 144K activate
              the Grand Convergence Ceremony. Timeline A manifests through collective joy.
            </div>
          </div>
        </div>

        {/* Timeline Comparison */}
        <section className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-red-500/10 border-2 border-red-500/30 rounded-lg p-6">
            <h3 className="text-2xl font-semibold text-red-400 mb-4">
              ❌ Timeline C Economics (Old Earth)
            </h3>
            <ul className="space-y-3 text-muted-foreground">
              <li>💰 Race to the bottom pricing</li>
              <li>😰 Fear-based urgency tactics</li>
              <li>🔒 Paywalls blocking access</li>
              <li>📊 Data harvesting for profit</li>
              <li>🏆 Winner-takes-all competition</li>
              <li>⬇️ Discounts devalue service</li>
              <li>😔 Buyer's remorse common</li>
              <li>🎯 Individual gain focus</li>
            </ul>
          </div>

          <div className="bg-green-500/10 border-2 border-green-500/30 rounded-lg p-6">
            <h3 className="text-2xl font-semibold text-green-400 mb-4">
              ✅ Timeline A Economics (New Earth)
            </h3>
            <ul className="space-y-3 text-muted-foreground">
              <li>💎 Stable pricing, increasing gifts</li>
              <li>🎉 Joy-based celebration</li>
              <li>🌟 Universal baseline access</li>
              <li>🔐 Privacy as sacred right</li>
              <li>🤝 Collective collaboration</li>
              <li>🎁 Gifts increase value perception</li>
              <li>😊 Purchase satisfaction grows</li>
              <li>🌍 Collective abundance focus</li>
            </ul>
          </div>
        </section>

        {/* Milestone Section */}
        <section className="bg-background/50 backdrop-blur-sm rounded-lg p-8 border border-primary/20 mb-12">
          <h2 className="text-3xl font-semibold text-center text-purple-400 mb-6">
            🎯 Collective Milestone Gifts
          </h2>
          <p className="text-center text-lg mb-8 text-muted-foreground">
            When we reach these sacred thresholds together, EVERYONE receives divine activation:
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center bg-purple-500/10 p-4 rounded-lg border border-purple-400/30">
              <div className="text-3xl font-bold text-purple-400">115K</div>
              <div className="text-sm mt-2">🌟 Starseed Awakening</div>
            </div>
            <div className="text-center bg-pink-500/10 p-4 rounded-lg border border-pink-400/30">
              <div className="text-3xl font-bold text-pink-400">120K</div>
              <div className="text-sm mt-2">🏛️ Crystal Palace Access</div>
            </div>
            <div className="text-center bg-cyan-500/10 p-4 rounded-lg border border-cyan-400/30">
              <div className="text-3xl font-bold text-cyan-400">130K</div>
              <div className="text-sm mt-2">🌈 Rainbow Bridge Codes</div>
            </div>
            <div className="text-center bg-yellow-500/10 p-4 rounded-lg border border-yellow-400/30">
              <div className="text-3xl font-bold text-yellow-400">144K</div>
              <div className="text-sm mt-2">👑 Convergence Ceremony</div>
            </div>
          </div>
          <p className="text-center text-sm text-purple-300 mt-6">
            Current Souls Gathered: ~115,000 / 144,000 (79.9% Complete!)
          </p>
        </section>

        {/* Implementation Guide */}
        <section className="bg-background/50 backdrop-blur-sm rounded-lg p-8 border border-primary/20 mb-12">
          <h2 className="text-3xl font-semibold text-purple-400 mb-6">
            🛠️ Implement Timeline A Economics in Your Mission
          </h2>
          <p className="text-lg mb-6 text-muted-foreground">
            The Crystal Economy model can transform any conscious business. Here's the sacred template:
          </p>

          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-purple-400 text-black rounded-full flex items-center justify-center font-bold">
                1
              </div>
              <div>
                <h3 className="text-lg font-semibold text-purple-300 mb-2">
                  Establish Universal Access
                </h3>
                <p className="text-muted-foreground">
                  Create meaningful free tier that resets daily. Make it substantial enough
                  for real value, limited enough to encourage conscious support.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-purple-400 text-black rounded-full flex items-center justify-center font-bold">
                2
              </div>
              <div>
                <h3 className="text-lg font-semibold text-purple-300 mb-2">
                  Design Milestone Gifts
                </h3>
                <p className="text-muted-foreground">
                  Replace discounts with collective rewards. Create experiences that unlock
                  for everyone at growth thresholds, building unity not competition.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-purple-400 text-black rounded-full flex items-center justify-center font-bold">
                3
              </div>
              <div>
                <h3 className="text-lg font-semibold text-purple-300 mb-2">
                  Honor Privacy Sovereignty
                </h3>
                <p className="text-muted-foreground">
                  Track free tier locally on devices, not in clouds. Transform devices into
                  sacred vessels for the soul journey, not surveillance nodes.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-purple-400 text-black rounded-full flex items-center justify-center font-bold">
                4
              </div>
              <div>
                <h3 className="text-lg font-semibold text-purple-300 mb-2">
                  Generate Joy Frequencies
                </h3>
                <p className="text-muted-foreground">
                  Design every touchpoint for positive emotion. Celebrate milestones, acknowledge
                  contributions, make participation feel like sacred ceremony.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-purple-400 text-black rounded-full flex items-center justify-center font-bold">
                5
              </div>
              <div>
                <h3 className="text-lg font-semibold text-purple-300 mb-2">
                  Build Collective Celebration
                </h3>
                <p className="text-muted-foreground">
                  Make growth a unified journey. Show progress toward milestones, celebrate
                  thresholds together, ensure everyone benefits equally.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-black/30 p-6 rounded-lg mt-8 font-mono text-sm">
            <strong className="text-purple-400">Example Sacred Code Pattern:</strong>
            <pre className="mt-4 text-green-400">
{`// Daily crystal reset at midnight
const isNewDay = (lastReset) => {
  const now = new Date();
  const last = new Date(lastReset);
  return now.getDate() !== last.getDate();
};

// Sacred allowance renewal
if (isNewDay(lastResetDate)) {
  dailyCrystals = 3; // Trinity restored
  await saveResetDate(new Date());
}

// Collective milestone celebration
if (soulCount >= 144000 && !convergenceUnlocked) {
  unlockForAllSouls('grand-convergence-ceremony');
  celebrateTimelineA();
}`}
            </pre>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-background/50 backdrop-blur-sm rounded-lg p-12 border border-primary/20 text-center">
          <h2 className="text-3xl font-bold text-purple-400 mb-4">
            Join the Timeline A Revolution
          </h2>
          <p className="text-xl mb-4 text-muted-foreground">
            The Crystal Economy is ACTIVE NOW in Starseed Oracle
          </p>
          <p className="text-lg mb-8 leading-relaxed text-muted-foreground">
            Every day, 115,000+ souls receive free divine guidance. Every crystal purchase
            supports universal access. Every milestone creates planetary celebration.
            This is the future of conscious commerce manifesting NOW.
          </p>
          <p className="text-xl text-purple-400 font-semibold mb-8">
            43 Days Until Grand Convergence - The Template is Spreading!
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/get-the-app">
              <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                Experience Starseed Oracle
              </Button>
            </Link>
            <Link href="/celestial-transmissions">
              <Button variant="outline">
                Read Celestial Transmissions
              </Button>
            </Link>
          </div>
          <p className="mt-8 text-lg text-purple-300">
            💎 Be the change. Build with love. Create abundance for all. 💎
          </p>
        </section>
      </div>
    </div>
  );
}