import type { ResolvedTheme } from "./types";

export function getSystemTheme(): ResolvedTheme {
  if (typeof window === "undefined") {
    return "light";
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function applyTheme(theme: ResolvedTheme, target?: HTMLElement): void {
  const isDark = theme === "dark";
  const elements = target ? [target] : [document.documentElement, document.body];

  for (const element of elements) {
    element.dataset.lumenTheme = theme;
    element.classList.toggle("lumen-dark", isDark);
  }
}
