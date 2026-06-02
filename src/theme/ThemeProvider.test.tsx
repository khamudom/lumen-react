import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { applyTheme } from "./applyTheme";
import { ThemeProvider } from "./ThemeProvider";
import { useTheme } from "./useTheme";

function ThemeConsumer() {
  const { theme, resolvedTheme, setTheme, toggleTheme } = useTheme();

  return (
    <div>
      <span data-testid="theme">{theme}</span>
      <span data-testid="resolved-theme">{resolvedTheme}</span>
      <button type="button" onClick={() => setTheme("dark")}>
        Set dark
      </button>
      <button type="button" onClick={() => setTheme("system")}>
        Set system
      </button>
      <button type="button" onClick={toggleTheme}>
        Toggle
      </button>
    </div>
  );
}

describe("applyTheme", () => {
  it("sets data attribute and dark class on document root", () => {
    applyTheme("dark");
    expect(document.documentElement.dataset.lumenTheme).toBe("dark");
    expect(document.documentElement.classList.contains("lumen-dark")).toBe(true);

    applyTheme("light");
    expect(document.documentElement.dataset.lumenTheme).toBe("light");
    expect(document.documentElement.classList.contains("lumen-dark")).toBe(false);
  });

  it("applies theme to a scoped target element", () => {
    const target = document.createElement("div");
    applyTheme("dark", target);

    expect(target.dataset.lumenTheme).toBe("dark");
    expect(target.classList.contains("lumen-dark")).toBe(true);
  });
});

describe("ThemeProvider", () => {
  it("provides theme context to children", () => {
    render(
      <ThemeProvider defaultTheme="light" storageKey={false} enableGlobalTheme={false}>
        <ThemeConsumer />
      </ThemeProvider>,
    );

    expect(screen.getByTestId("theme")).toHaveTextContent("light");
    expect(screen.getByTestId("resolved-theme")).toHaveTextContent("light");
  });

  it("updates theme via setTheme", async () => {
    const user = userEvent.setup();

    render(
      <ThemeProvider defaultTheme="light" storageKey={false} enableGlobalTheme={false}>
        <ThemeConsumer />
      </ThemeProvider>,
    );

    await user.click(screen.getByRole("button", { name: /set dark/i }));
    expect(screen.getByTestId("theme")).toHaveTextContent("dark");
    expect(screen.getByTestId("resolved-theme")).toHaveTextContent("dark");
  });

  it("calls onThemeChange when theme updates", async () => {
    const user = userEvent.setup();
    const onThemeChange = vi.fn();

    render(
      <ThemeProvider
        defaultTheme="light"
        storageKey={false}
        enableGlobalTheme={false}
        onThemeChange={onThemeChange}
      >
        <ThemeConsumer />
      </ThemeProvider>,
    );

    await user.click(screen.getByRole("button", { name: /set dark/i }));
    expect(onThemeChange).toHaveBeenCalledWith("dark");
  });

  it("toggles between light and dark", async () => {
    const user = userEvent.setup();

    render(
      <ThemeProvider defaultTheme="light" storageKey={false} enableGlobalTheme={false}>
        <ThemeConsumer />
      </ThemeProvider>,
    );

    await user.click(screen.getByRole("button", { name: /toggle/i }));
    expect(screen.getByTestId("resolved-theme")).toHaveTextContent("dark");

    await user.click(screen.getByRole("button", { name: /toggle/i }));
    expect(screen.getByTestId("resolved-theme")).toHaveTextContent("light");
  });

  it("throws when useTheme is used outside ThemeProvider", () => {
    const consoleError = vi.spyOn(console, "error").mockImplementation(() => {});

    expect(() => render(<ThemeConsumer />)).toThrow(
      "useTheme must be used within a ThemeProvider",
    );

    consoleError.mockRestore();
  });
});
