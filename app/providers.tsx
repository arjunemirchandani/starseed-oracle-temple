// app/providers.tsx
'use client'

import posthog from 'posthog-js'
import { PostHogProvider } from 'posthog-js/react'
import { useEffect } from 'react'

export function PHProvider({
  children,
}: {
  children: React.ReactNode
}) {
  useEffect(() => {
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
      api_host: 'https://us.i.posthog.com', // Use PostHog US region directly
      person_profiles: 'identified_only', // or 'always' to create profiles for anonymous users as well
      capture_pageview: true, // Enable automatic pageview capture
      capture_pageleave: true, // Capture page leave events
      autocapture: true, // Enable automatic event capture
      disable_session_recording: false, // Enable session recording
      persistence: 'localStorage', // Use localStorage for persistence
      // Disable problematic features that cause CORS issues
      disable_surveys: true, // Disable surveys to avoid CORS
      advanced_disable_decide: true, // Disable decide endpoint (causes 401/404)
      loaded: (posthog) => {
        if (process.env.NODE_ENV === 'development') {
          console.log('✨ PostHog initialized successfully!')
        }
      }
    })
  }, [])

  return <PostHogProvider client={posthog}>{children}</PostHogProvider>
}