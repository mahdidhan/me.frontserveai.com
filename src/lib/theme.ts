/**
 * Manual light/dark choice. "system" removes the override so the OS setting
 * (prefers-color-scheme) applies again. Tokens for each theme live in
 * globals.css under :root[data-theme].
 */
export type ThemeChoice = "light" | "dark" | "system";

const STORAGE_KEY = "theme";

/** Inline <head> script: apply a saved choice before first paint. */
export const themeScript = `try{var t=localStorage.getItem("${STORAGE_KEY}");if(t==="light"||t==="dark")document.documentElement.dataset.theme=t}catch(e){}`;

export function resolvedTheme(): "light" | "dark" {
  const choice = document.documentElement.dataset.theme;
  if (choice === "light" || choice === "dark") return choice;
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export function setTheme(choice: ThemeChoice) {
  const root = document.documentElement;
  try {
    if (choice === "system") localStorage.removeItem(STORAGE_KEY);
    else localStorage.setItem(STORAGE_KEY, choice);
  } catch {
    // Storage can be blocked; the choice still applies for this visit.
  }
  if (choice === "system") delete root.dataset.theme;
  else root.dataset.theme = choice;
}

export function toggleTheme() {
  setTheme(resolvedTheme() === "dark" ? "light" : "dark");
}
