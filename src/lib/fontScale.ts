import { writable } from "svelte/store";

const STORAGE_KEY = "statue:fontScale";

export const FONT_SCALE_MIN = 0.5;
export const FONT_SCALE_MAX = 1.5;
export const FONT_SCALE_STEP = 0.1;

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

function readInitial(): number {
  if (typeof window === "undefined") return 1;
  const raw = window.localStorage.getItem(STORAGE_KEY);
  const n = raw ? Number(raw) : 1;
  return Number.isFinite(n) ? clamp(n, FONT_SCALE_MIN, FONT_SCALE_MAX) : 1;
}

export const fontScale = writable<number>(1);

export function applyFontScale(scale: number) {
  if (typeof document === "undefined") return;
  document.documentElement.style.setProperty("--font-scale", String(scale));
}

export function setFontScale(scale: number) {
  const next = clamp(scale, FONT_SCALE_MIN, FONT_SCALE_MAX);
  fontScale.set(next);

  if (typeof window !== "undefined") {
    window.localStorage.setItem(STORAGE_KEY, String(next));
  }
  applyFontScale(next);
}

export function increaseFontScale() {
  fontScale.update((v) => {
    const next = clamp(v + FONT_SCALE_STEP, FONT_SCALE_MIN, FONT_SCALE_MAX);
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, String(next));
    }
    applyFontScale(next);
    return next;
  });
}

export function decreaseFontScale() {
  fontScale.update((v) => {
    const next = clamp(v - FONT_SCALE_STEP, FONT_SCALE_MIN, FONT_SCALE_MAX);
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, String(next));
    }
    applyFontScale(next);
    return next;
  });
}


export function resetFontScale() {
  setFontScale(1);
}

export function initFontScale() {
  const initial = readInitial();
  fontScale.set(initial);
  applyFontScale(initial);
}
