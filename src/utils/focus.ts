const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function getFocusableElements(container: HTMLElement): HTMLElement[] {
  return Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter(
    (element) => !element.hasAttribute("disabled") && element.getAttribute("aria-hidden") !== "true",
  );
}

export function focusFirstFocusable(container: HTMLElement) {
  const [firstFocusable] = getFocusableElements(container);

  if (firstFocusable) {
    firstFocusable.focus();
    return;
  }

  if (container.tabIndex < 0) {
    container.tabIndex = -1;
  }

  container.focus();
}

export function restoreFocus(target: HTMLElement | null | undefined) {
  if (target && document.contains(target)) {
    target.focus();
  }
}

export function trapTabKey(event: KeyboardEvent, container: HTMLElement) {
  if (event.key !== "Tab") {
    return;
  }

  const focusableElements = getFocusableElements(container);

  if (focusableElements.length === 0) {
    event.preventDefault();
    return;
  }

  const first = focusableElements[0];
  const last = focusableElements[focusableElements.length - 1];
  const activeElement = document.activeElement as HTMLElement | null;

  if (event.shiftKey) {
    if (activeElement === first || !activeElement || !container.contains(activeElement)) {
      event.preventDefault();
      last.focus();
    }
    return;
  }

  if (activeElement === last || !activeElement || !container.contains(activeElement)) {
    event.preventDefault();
    first.focus();
  }
}
