import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { applyTheme } from "./applyTheme";
import { ThemeContext } from "./ThemeContext";
import type { LumenTheme, ResolvedTheme } from "./types";

const STORAGE_KEY = "lumen-theme";

function readStoredTheme(storageKey: string | false): LumenTheme | null {
  if (storageKey === false || typeof window === "undefined") {
    return null;
  }

  const stored = window.localStorage.getItem(storageKey);
  if (stored === "light" || stored === "dark" || stored === "system") {
    return stored;
  }

  return null;
}

export interface ThemeProviderProps {
  children: ReactNode;
  /** Controlled theme preference. */
  theme?: LumenTheme;
  /** Initial theme when uncontrolled. Defaults to `"light"`. */
  defaultTheme?: LumenTheme;
  /** Called when the theme preference changes. */
  onThemeChange?: (theme: LumenTheme) => void;
  /** localStorage key for persisting theme. Set to `false` to disable. */
  storageKey?: string | false;
  /** Apply theme to `documentElement` and `body`. Defaults to `true`. */
  enableGlobalTheme?: boolean;
  /** Optional className for the themed wrapper element. */
  className?: string;
  /** Optional inline styles for the themed wrapper element. */
  style?: CSSProperties;
}

export function ThemeProvider({
  children,
  theme: controlledTheme,
  defaultTheme = "light",
  onThemeChange,
  storageKey = STORAGE_KEY,
  enableGlobalTheme = true,
  className,
  style,
}: ThemeProviderProps) {
  const [uncontrolledTheme, setUncontrolledTheme] = useState<LumenTheme>(() => {
    return readStoredTheme(storageKey) ?? defaultTheme;
  });
  const [systemTheme, setSystemTheme] = useState<ResolvedTheme>("light");

  const theme = controlledTheme ?? uncontrolledTheme;
  const resolvedTheme = useMemo(
    () => (theme === "system" ? systemTheme : theme),
    [theme, systemTheme],
  );

  const setTheme = useCallback(
    (nextTheme: LumenTheme) => {
      if (controlledTheme === undefined) {
        setUncontrolledTheme(nextTheme);
      }

      if (storageKey !== false && typeof window !== "undefined") {
        window.localStorage.setItem(storageKey, nextTheme);
      }

      onThemeChange?.(nextTheme);
    },
    [controlledTheme, onThemeChange, storageKey],
  );

  const toggleTheme = useCallback(() => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  }, [resolvedTheme, setTheme]);

  useEffect(() => {
    if (theme !== "system") {
      return;
    }

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => {
      setSystemTheme(mediaQuery.matches ? "dark" : "light");
    };

    handleChange();
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [theme]);

  useEffect(() => {
    if (enableGlobalTheme) {
      applyTheme(resolvedTheme);
    }
  }, [enableGlobalTheme, resolvedTheme]);

  const contextValue = useMemo(
    () => ({
      theme,
      resolvedTheme,
      setTheme,
      toggleTheme,
    }),
    [theme, resolvedTheme, setTheme, toggleTheme],
  );

  const isDark = resolvedTheme === "dark";

  return (
    <ThemeContext.Provider value={contextValue}>
      <div
        className={[isDark ? "lumen-dark" : undefined, className].filter(Boolean).join(" ") || undefined}
        data-lumen-theme={resolvedTheme}
        style={{
          fontFamily: "var(--lumen-font-family)",
          color: "var(--lumen-color-text)",
          backgroundColor: "var(--lumen-color-background)",
          ...style,
        }}
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
}
