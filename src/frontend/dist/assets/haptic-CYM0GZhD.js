function haptic(duration = 10) {
  try {
    if (typeof navigator !== "undefined" && "vibrate" in navigator) {
      navigator.vibrate(duration);
    }
  } catch {
  }
}
function hapticSuccess() {
  haptic(15);
}
function hapticError() {
  haptic(30);
}
function hapticSwipe() {
  haptic(10);
}
export {
  hapticError as a,
  hapticSuccess as b,
  hapticSwipe as c,
  haptic as h
};
