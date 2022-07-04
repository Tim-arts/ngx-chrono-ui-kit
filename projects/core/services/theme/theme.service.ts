import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private renderer: Renderer2;
  private theme: string | null | undefined;
  private defaultTheme: string = 'light';
  private themeSuffix = '-theme';

  constructor(rendererFactory: RendererFactory2) {
    // Create new renderer from renderFactory, to make it possible to use renderer2 in a service
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  /**
   * Toggles the theme depending on the one stored in localstorage. If none, sets the default one
   */
  setTheme(): void {
    this.theme = localStorage.getItem('theme');

    if (this.theme === null) {
      this.theme = this.defaultTheme;
    } else {
      this.theme = this.theme === 'light' ? 'dark' : 'light';
    }

    localStorage.setItem('theme', this.theme);
  }

  /**
   * Gets the theme depending on the one stored in localstorage. If none, gets the default one
   */
  getTheme(): void {
    const localStorageTheme: string | null = localStorage.getItem('theme');

    // Check if any theme is stored in localStorage
    if (localStorageTheme) {
      // Save theme from localStorage
      this.theme = localStorageTheme;
    } else {
      // If no theme is stored in localStorage, loads the default theme
      this.theme = this.defaultTheme;
    }
  }

  /**
   * Loads the theme and the utils classes it needs to work
   */
  load(): void {
    this.getTheme();
    this.renderer.addClass(document.body, this.theme + this.themeSuffix);
    this.renderer.addClass(document.body, 'mat-typography');
  }

  /**
   * Reapplies the current theme
   */
  update(): void {
    this.setTheme();

    // Remove the old theme class
    this.renderer.removeClass(document.body, (this.theme === 'dark' ? 'light' : 'dark') + this.themeSuffix);

    // Add the new / current theme class
    this.renderer.addClass(document.body, this.theme + this.themeSuffix);
  }
}
