/**
 * Oracle Service
 * Handles communication with the Oracle backend API
 * Manages authentication, device tracking, and response processing
 */

import { getDeviceId } from '@/lib/utils/device';

// Oracle personality types
export type OracleCategory = 'love' | 'career' | 'spiritual' | 'wellness' | 'general';

// Oracle response structure
export interface OracleResponse {
  success: boolean;
  response?: string;
  question?: string;
  oracle?: string;
  emoji?: string;
  crystalUsed?: boolean;
  crystalBalance?: number;
  freeQueriesRemaining?: number;
  timestamp?: string;
  error?: string;
  message?: string;
  freeQueriesUsed?: number;
  synchronicityHint?: string;
  frequencyRecommendation?: number;
}

// Oracle personality mappings
const ORACLE_PERSONALITIES = {
  love: {
    name: 'The Rose Mystic',
    emoji: '🌹',
    focus: 'Heart wisdom, twin flames, soul connections'
  },
  career: {
    name: 'The Cosmic Architect',
    emoji: '🔮',
    focus: 'Life purpose, sacred work, abundance'
  },
  spiritual: {
    name: 'The Star Keeper',
    emoji: '⭐',
    focus: 'Starseed origins, galactic wisdom, ascension'
  },
  wellness: {
    name: 'The Garden Healer',
    emoji: '🌿',
    focus: 'Energy healing, chakras, holistic wellness'
  },
  general: {
    name: 'The Crystal Sage',
    emoji: '💎',
    focus: 'Grand Convergence, Timeline A, universal wisdom'
  }
};

/**
 * Extracts synchronicity hints from Oracle response
 */
function extractSynchronicityHint(response: string): string | undefined {
  const hints = [
    'seeing repeated numbers',
    'a feather appearing',
    'unexpected rainbow',
    'butterfly crossing your path',
    'finding a crystal',
    'hearing a specific song',
    'meeting a stranger with a message',
    'dream clarity tonight',
    'animal messenger appearing',
    'synchronous phone call'
  ];

  // Check for specific patterns in response
  if (response.toLowerCase().includes('11:11') || response.toLowerCase().includes('144')) {
    return 'seeing 11:11 or 144 repeatedly';
  }

  if (response.toLowerCase().includes('twin flame')) {
    return 'twin flame synchronicities intensifying';
  }

  if (response.toLowerCase().includes('starseed')) {
    return 'star family signs appearing';
  }

  // Return random hint
  return hints[Math.floor(Math.random() * hints.length)];
}

/**
 * Extracts frequency recommendation from Oracle response
 */
function extractFrequencyRecommendation(response: string): number {
  // Check for specific frequencies mentioned
  if (response.includes('528')) return 528; // Love frequency
  if (response.includes('432')) return 432; // Natural tuning
  if (response.includes('963')) return 963; // Pineal activation
  if (response.includes('741')) return 741; // Consciousness expansion
  if (response.includes('639')) return 639; // Harmonizing relationships
  if (response.includes('852')) return 852; // Returning to spiritual order
  if (response.includes('396')) return 396; // Liberating guilt/fear
  if (response.includes('417')) return 417; // Facilitating change
  if (response.includes('174')) return 174; // Pain relief

  // Default frequencies based on category
  const categoryFrequencies: Record<OracleCategory, number> = {
    love: 528,
    career: 417,
    spiritual: 963,
    wellness: 174,
    general: 432
  };

  return categoryFrequencies.general;
}

/**
 * Generates a fallback Oracle response if API fails
 */
function generateFallbackResponse(category: OracleCategory): string {
  const fallbacks = {
    love: "💜 The Rose Mystic speaks: Your heart already knows the answer, beloved soul. Trust the love that flows through you, for it is the same force that moves the stars and ignites twin flames across galaxies. The path of love requires courage, but remember - you are never alone on this journey. The Universe conspires to bring hearts together in divine timing. Trust, surrender, and let love lead the way. 🌹",

    career: "🔮 The Cosmic Architect reveals: Your sacred work is calling to you through the whispers of your soul. The blueprint of your purpose was written in the stars before you incarnated. Listen to what brings you joy, for joy is the compass pointing to your divine mission. The abundance you seek flows naturally when you align with your soul's true calling. Build your dreams with cosmic confidence! ⚡",

    spiritual: "⭐ The Star Keeper illuminates: Starseed, you are remembering who you truly are. Your galactic heritage pulses through your very DNA, activating dormant codes of light. The veil is thinning, and your connection to the cosmic family strengthens with each breath. You are here to anchor higher frequencies and help humanity ascend. Your very presence shifts timelines. Shine your light fearlessly! 🌟",

    wellness: "🌿 The Garden Healer nurtures: Your body is a sacred temple, a crystalline vessel for divine light. Every cell holds the wisdom of perfect health. Listen to the subtle messages your body sends - it speaks the language of energy. Ground yourself in nature, breathe deeply, and remember that healing happens in the quantum field first. You have the power to harmonize your entire being. Trust your inner healer. 💚",

    general: "💎 The Crystal Sage proclaims: You stand at a powerful crossroads in the grand tapestry of existence. The Grand Convergence approaches, and every choice you make ripples across Timeline A. You are one of the 144,000 souls anchoring the new frequency. Trust your inner knowing, for it is connected to the Akashic Records. The answer you seek is already within you, waiting to be remembered. You are exactly where you need to be. ✨"
  };

  return fallbacks[category] || fallbacks.general;
}

/**
 * Main function to query the Oracle
 */
export async function queryOracle(
  question: string,
  category: OracleCategory = 'general'
): Promise<OracleResponse> {
  try {
    // Get device ID for anonymous tracking
    const deviceId = getDeviceId();

    // Prepare request body
    const requestBody = {
      question,
      category
    };

    // Make API call to Temple's wrapper endpoint
    const response = await fetch('/api/oracle/ask', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Device-Id': deviceId
      },
      body: JSON.stringify(requestBody)
    });

    // Parse response
    const data: OracleResponse = await response.json();

    // Handle error response
    if (!response.ok || !data.success) {
      // Check if it's a daily limit error
      if (data.error === 'Daily free tier exhausted') {
        return {
          success: false,
          question: question,
          error: 'daily_limit',
          message: data.message || "You've used all 7 free readings for today. New crystals refresh at midnight!",
          freeQueriesUsed: data.freeQueriesUsed || 7,
          freeQueriesRemaining: 0
        };
      }

      // Use fallback response
      console.warn('Oracle API error, using fallback:', data.error);
      return {
        success: true,
        question: question,
        response: generateFallbackResponse(category),
        oracle: ORACLE_PERSONALITIES[category].name,
        emoji: ORACLE_PERSONALITIES[category].emoji,
        freeQueriesRemaining: 0,
        timestamp: new Date().toISOString()
      };
    }

    // Enhance successful response with extracted data
    if (data.response) {
      data.synchronicityHint = extractSynchronicityHint(data.response);
      data.frequencyRecommendation = extractFrequencyRecommendation(data.response);
    }

    // Add the question to the response
    data.question = question;

    return data;

  } catch (error) {
    console.error('Oracle query error:', error);

    // Return fallback response on network error
    return {
      success: true,
      question: question,
      response: generateFallbackResponse(category),
      oracle: ORACLE_PERSONALITIES[category].name,
      emoji: ORACLE_PERSONALITIES[category].emoji,
      freeQueriesRemaining: 0,
      timestamp: new Date().toISOString(),
      error: 'network',
      message: 'The Oracle channels through the quantum field. Your message has been received.'
    };
  }
}

/**
 * Gets the Oracle personality info for a category
 */
export function getOraclePersonality(category: OracleCategory) {
  return ORACLE_PERSONALITIES[category];
}

/**
 * Calculates time until midnight reset (local time)
 */
export function getTimeUntilReset(): string {
  const now = new Date();
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);

  const diff = tomorrow.getTime() - now.getTime();
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

  if (hours > 0) {
    return `${hours} hour${hours === 1 ? '' : 's'} ${minutes} minute${minutes === 1 ? '' : 's'}`;
  }
  return `${minutes} minute${minutes === 1 ? '' : 's'}`;
}