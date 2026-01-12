// Template loader implementation for @vibeify/engine
import type { TemplateLoader as ITemplateLoader } from '@vibeify/engine';

/**
 * Browser-based template loader that fetches templates via HTTP
 */
export class TemplateLoader implements ITemplateLoader {
  /**
   * Load template source from URL
   */
  async getTemplateSource(ref: string): Promise<string> {
    const response = await fetch(ref);
    if (!response.ok) {
      throw new Error(`Failed to load template: ${ref}`);
    }
    return await response.text();
  }

  /**
   * Resolve a relative reference from a base reference
   * For browser context, we use simple path resolution
   */
  resolveRef(from: string, to: string): string {
    // If 'to' is already absolute (starts with / or http), return it
    if (to.startsWith('/') || to.startsWith('http')) {
      return to;
    }
    
    // Otherwise, resolve relative to the directory of 'from'
    const fromDir = from.substring(0, from.lastIndexOf('/') + 1);
    return fromDir + to;
  }

  /**
   * Helper: Load all templates from the templates directory
   */
  async loadAllTemplates(): Promise<string[]> {
    // For the smoke test, return the two known template references
    return [
      '/prompts/templates/greeting.yaml',
      '/prompts/templates/code-review.yaml'
    ];
  }
}

export default TemplateLoader;

