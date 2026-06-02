export type ResolvedTheme = "light" | "dark";

export type LumenTheme = ResolvedTheme | "system";

export interface ThemeContextValue {
  /** User-selected theme preference, including `"system"`. */
  theme: LumenTheme;
  /** Theme currently applied after resolving `"system"`. */
  resolvedTheme: ResolvedTheme;
  setTheme: (theme: LumenTheme) => void;
  /** Toggle between light and dark (skips `"system"`). */
  toggleTheme: () => void;
}
