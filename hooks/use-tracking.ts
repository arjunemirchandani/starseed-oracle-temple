'use client';

import { usePostHog } from 'posthog-js/react';
import { useEffect } from 'react';

export function useTracking() {
  const posthog = usePostHog();

  // Track Oracle category selection
  const trackOracleCategory = (category: string, title: string) => {
    posthog?.capture('oracle_category_selected', {
      category_id: category,
      category_title: title,
      source: 'temple',
    });
  };

  // Track Oracle question submission
  const trackOracleQuestion = (question: string, category?: string) => {
    posthog?.capture('oracle_question_submitted', {
      question_length: question.length,
      category: category || 'custom',
      has_category: !!category,
      source: 'temple',
    });
  };

  // Track authentication events
  const trackSignup = (method: 'email' | 'google') => {
    posthog?.capture('user_signup', {
      method,
      source: 'temple',
    });
  };

  const trackSignin = (method: 'email' | 'google') => {
    posthog?.capture('user_signin', {
      method,
      source: 'temple',
    });
  };

  // Track navigation events
  const trackNavigation = (page: string) => {
    posthog?.capture('page_viewed', {
      page_name: page,
      source: 'temple',
    });
  };

  // Track contact form submission
  const trackContactForm = () => {
    posthog?.capture('contact_form_submitted', {
      source: 'temple',
    });
  };

  // Track consciousness crystal interest
  const trackCrystalInterest = (feature: string) => {
    posthog?.capture('consciousness_crystal_interest', {
      feature_attempted: feature,
      source: 'temple',
    });
  };

  // Track library access
  const trackLibraryAccess = () => {
    posthog?.capture('library_accessed', {
      source: 'temple',
    });
  };

  // Track app download interest
  const trackAppDownloadClick = (platform: 'ios' | 'android' | 'general') => {
    posthog?.capture('app_download_clicked', {
      platform,
      source: 'temple',
    });
  };

  return {
    trackOracleCategory,
    trackOracleQuestion,
    trackSignup,
    trackSignin,
    trackNavigation,
    trackContactForm,
    trackCrystalInterest,
    trackLibraryAccess,
    trackAppDownloadClick,
  };
}

// Hook to identify users after authentication
export function useIdentifyUser(user: { id: string; email?: string; display_name?: string } | null) {
  const posthog = usePostHog();

  useEffect(() => {
    if (user?.id) {
      // Identify the user in PostHog
      posthog?.identify(user.id, {
        email: user.email,
        display_name: user.display_name,
        source: 'temple',
      });
    } else {
      // Reset if no user (logged out)
      posthog?.reset();
    }
  }, [user, posthog]);
}