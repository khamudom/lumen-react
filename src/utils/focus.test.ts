import { describe, expect, it } from "vitest";
import { focusFirstFocusable, getFocusableElements, trapTabKey } from "./focus";

describe("focus utilities", () => {
  it("returns focusable elements inside a container", () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <button type="button">First</button>
      <button type="button" disabled>Disabled</button>
      <a href="/next">Next</a>
    `;

    expect(getFocusableElements(container)).toHaveLength(2);
  });

  it("focuses the first focusable element", () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <button type="button" id="first">First</button>
      <button type="button" id="second">Second</button>
    `;
    document.body.appendChild(container);

    focusFirstFocusable(container);

    expect(document.activeElement).toBe(container.querySelector("#first"));
    container.remove();
  });

  it("wraps tab focus within a container", () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <button type="button" id="first">First</button>
      <button type="button" id="second">Second</button>
    `;
    document.body.appendChild(container);

    const first = container.querySelector<HTMLButtonElement>("#first")!;
    const second = container.querySelector<HTMLButtonElement>("#second")!;

    second.focus();
    trapTabKey(new KeyboardEvent("keydown", { key: "Tab", bubbles: true }), container);
    expect(document.activeElement).toBe(first);

    first.focus();
    trapTabKey(
      new KeyboardEvent("keydown", { key: "Tab", shiftKey: true, bubbles: true }),
      container,
    );
    expect(document.activeElement).toBe(second);

    container.remove();
  });
});
