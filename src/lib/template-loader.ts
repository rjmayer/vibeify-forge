// Simple template loader
import type { Template } from './engine-mock';

export class TemplateLoader {
  /**
   * Load a template from the prompts/templates directory
   */
  async loadTemplate(templateId: string): Promise<Template> {
    const response = await fetch(`/prompts/templates/${templateId}.json`);
    if (!response.ok) {
      throw new Error(`Failed to load template: ${templateId}`);
    }
    return await response.json();
  }

  /**
   * Load all templates from the templates directory
   */
  async loadAllTemplates(): Promise<Template[]> {
    // For the smoke test, we'll load the two known templates
    const templateIds = ['greeting', 'code-review'];
    const templates: Template[] = [];
    
    for (const id of templateIds) {
      try {
        const template = await this.loadTemplate(id);
        templates.push(template);
      } catch (error) {
        console.error(`Failed to load template ${id}:`, error);
      }
    }
    
    return templates;
  }
}

export default TemplateLoader;
