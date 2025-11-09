"use client";

import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Sparkles, AlertCircle, CheckCircle } from 'lucide-react';
import { updateDisplayNameSchema } from '@/lib/schemas/profile';
import { z } from 'zod';

interface EditDisplayNameDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentName: string;
  onSuccess: (newName: string) => void;
}

export function EditDisplayNameDialog({
  open,
  onOpenChange,
  currentName,
  onSuccess
}: EditDisplayNameDialogProps) {
  const [displayName, setDisplayName] = useState(currentName);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  // Validate input on change
  const handleInputChange = (value: string) => {
    setDisplayName(value);
    setError(null);
    setSuccess(false);

    // Real-time validation
    try {
      updateDisplayNameSchema.parse({ display_name: value });
      setValidationError(null);
    } catch (error) {
      if (error instanceof z.ZodError) {
        setValidationError(error.issues[0]?.message || 'Invalid input');
      }
    }
  };

  const handleSave = async () => {
    // Validate input
    try {
      updateDisplayNameSchema.parse({ display_name: displayName });
    } catch (error) {
      if (error instanceof z.ZodError) {
        setValidationError(error.issues[0]?.message || 'Invalid input');
        return;
      }
    }

    setLoading(true);
    setError(null);
    setValidationError(null);

    try {
      const response = await fetch('/api/user/profile', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          display_name: displayName.trim()
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to update display name');
      }

      setSuccess(true);
      onSuccess(displayName.trim());

      // Close dialog after brief success message
      setTimeout(() => {
        onOpenChange(false);
        setSuccess(false);
      }, 1500);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setDisplayName(currentName);
    setError(null);
    setValidationError(null);
    setSuccess(false);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-background/95 backdrop-blur-xl border-primary/30">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            Edit Display Name
          </DialogTitle>
          <DialogDescription>
            Choose how your name appears across the temple. This is your sacred identity.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="display-name">Display Name</Label>
            <Input
              id="display-name"
              value={displayName}
              onChange={(e) => handleInputChange(e.target.value)}
              placeholder="Enter your display name"
              className={`${validationError ? 'border-red-500' : ''} ${success ? 'border-green-500' : ''}`}
              disabled={loading}
              maxLength={50}
            />
            <div className="flex justify-between items-center">
              <p className="text-xs text-muted-foreground">
                {displayName.length}/50 characters
              </p>
              {validationError && (
                <p className="text-xs text-red-500">{validationError}</p>
              )}
            </div>
          </div>

          {/* Success Message */}
          {success && (
            <Alert className="bg-green-500/10 border-green-500/30">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <AlertDescription className="text-green-400">
                Display name updated successfully!
              </AlertDescription>
            </Alert>
          )}

          {/* Error Message */}
          {error && (
            <Alert className="bg-red-500/10 border-red-500/30">
              <AlertCircle className="h-4 w-4 text-red-500" />
              <AlertDescription className="text-red-400">
                {error}
              </AlertDescription>
            </Alert>
          )}
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={handleCancel}
            disabled={loading}
            className="hover:bg-primary/10"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={loading || !!validationError || displayName === currentName || !displayName.trim()}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Save Changes
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}