/**
 * Device Fingerprinting Utility
 * Generates and persists unique device IDs for anonymous Oracle users
 * This allows tracking of 3 daily free readings without requiring login
 * (Registered users get 7 daily free readings)
 */

const DEVICE_ID_KEY = 'starseed_device_id';
const DEVICE_ID_VERSION = 'v2'; // Increment if fingerprinting algorithm changes

/**
 * Generates a unique device fingerprint based on browser characteristics
 */
function generateFingerprint(): string {
  const components: string[] = [];

  // Screen dimensions
  if (typeof window !== 'undefined') {
    components.push(`${window.screen.width}x${window.screen.height}`);
    components.push(`${window.screen.colorDepth}`);

    // Timezone
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    components.push(timezone);

    // Language
    components.push(navigator.language);

    // Platform
    components.push(navigator.platform || 'unknown');

    // User agent (hashed)
    components.push(navigator.userAgent);

    // Canvas fingerprint (lightweight)
    try {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.textBaseline = 'top';
        ctx.font = '14px Arial';
        ctx.fillStyle = '#f60';
        ctx.fillRect(125, 1, 62, 20);
        ctx.fillStyle = '#069';
        ctx.fillText('Starseed Oracle 🌟', 2, 15);
        const dataURL = canvas.toDataURL();
        components.push(dataURL.slice(-50)); // Use last 50 chars
      }
    } catch (e) {
      components.push('canvas-unavailable');
    }

    // Add timestamp for uniqueness
    components.push(Date.now().toString());

    // Add random component for extra uniqueness
    components.push(Math.random().toString(36).substring(2, 15));
  }

  // Create hash from components
  const fingerprint = components.join('|');
  return hashString(fingerprint);
}

/**
 * Simple hash function to create a consistent ID from fingerprint
 */
function hashString(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }

  // Convert to base36 for shorter string
  const hashStr = Math.abs(hash).toString(36);

  // Ensure minimum length and add prefix
  return `${DEVICE_ID_VERSION}_${hashStr.padStart(8, '0')}_${Date.now().toString(36)}`;
}

/**
 * Gets or creates a persistent device ID
 * Stored in localStorage for persistence across sessions
 */
export function getDeviceId(): string {
  // Only works in browser
  if (typeof window === 'undefined') {
    return 'server_side_render';
  }

  try {
    // Check if we already have a device ID
    const existingId = localStorage.getItem(DEVICE_ID_KEY);

    // Validate existing ID (check version prefix)
    if (existingId && existingId.startsWith(DEVICE_ID_VERSION)) {
      return existingId;
    }

    // Generate new device ID
    const newId = generateFingerprint();

    // Store for future use
    localStorage.setItem(DEVICE_ID_KEY, newId);

    return newId;
  } catch (error) {
    // Fallback if localStorage is unavailable (private browsing, etc.)
    console.warn('Unable to persist device ID:', error);

    // Use session storage as fallback
    try {
      const sessionId = sessionStorage.getItem(DEVICE_ID_KEY);
      if (sessionId) {
        return sessionId;
      }

      const newId = generateFingerprint();
      sessionStorage.setItem(DEVICE_ID_KEY, newId);
      return newId;
    } catch {
      // Ultimate fallback - return a temporary ID
      return `temp_${Date.now()}_${Math.random().toString(36).substring(2)}`;
    }
  }
}

/**
 * Clears the stored device ID (useful for testing)
 */
export function clearDeviceId(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(DEVICE_ID_KEY);
    sessionStorage.removeItem(DEVICE_ID_KEY);
  }
}

/**
 * Checks if the current device ID is temporary (not persisted)
 */
export function isTemporaryDeviceId(deviceId: string): boolean {
  return deviceId.startsWith('temp_') || deviceId === 'server_side_render';
}