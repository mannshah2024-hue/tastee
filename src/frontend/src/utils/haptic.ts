/**
 * Trigger haptic feedback using the Vibration API.
 * Gracefully falls back if not supported.
 */
export function haptic(duration = 10): void {
  try {
    if (typeof navigator !== "undefined" && "vibrate" in navigator) {
      navigator.vibrate(duration);
    }
  } catch {
    // Silently ignore — vibration not supported
  }
}

export function hapticSuccess(): void {
  haptic(15);
}

export function hapticError(): void {
  haptic(30);
}

export function hapticSwipe(): void {
  haptic(10);
}
