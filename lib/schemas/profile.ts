import { z } from 'zod';

// Schema for updating display name
export const updateDisplayNameSchema = z.object({
  display_name: z.string()
    .min(2, "Display name must be at least 2 characters")
    .max(50, "Display name must be less than 50 characters")
    .regex(/^[a-zA-Z0-9\s\-']+$/, "Only letters, numbers, spaces, hyphens and apostrophes allowed")
    .transform(str => str.trim()) // Trim whitespace
});

// Schema for full profile update (future use)
export const updateProfileSchema = z.object({
  display_name: z.string()
    .min(2, "Display name must be at least 2 characters")
    .max(50, "Display name must be less than 50 characters")
    .regex(/^[a-zA-Z0-9\s\-']+$/, "Only letters, numbers, spaces, hyphens and apostrophes allowed")
    .transform(str => str.trim())
    .optional(),
  bio: z.string()
    .max(500, "Bio must be less than 500 characters")
    .transform(str => str.trim())
    .optional(),
  starseed_origin: z.string()
    .max(100, "Starseed origin must be less than 100 characters")
    .optional(),
  notification_preferences: z.object({
    email: z.boolean().optional(),
    push: z.boolean().optional(),
  }).optional(),
});

// Type exports
export type UpdateDisplayNameInput = z.infer<typeof updateDisplayNameSchema>;
export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;

// Utility function to sanitize input (remove potential XSS)
export function sanitizeInput(input: string): string {
  // Remove any HTML tags
  const withoutHtml = input.replace(/<[^>]*>/g, '');
  // Remove any script tags specifically
  const withoutScript = withoutHtml.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
  // Trim whitespace
  return withoutScript.trim();
}