// Popup script with engine smoke test
import { resolveTemplate, renderTemplate, deriveInputSchema } from '@vibeify/engine';
import TemplateLoader from './lib/template-loader';

interface SmokeTestResult {
  success: boolean;
  message: string;
  output?: string;
}

async function runSmokeTest(): Promise<SmokeTestResult> {
  try {
    // Initialize the template loader
    const loader = new TemplateLoader();
    
    // Load templates
    updateStatus('Loading templates...');
    const templateRefs = await loader.loadAllTemplates();
    
    if (templateRefs.length === 0) {
      return {
        success: false,
        message: 'No templates found'
      };
    }
    
    updateStatus(`Found ${templateRefs.length} template(s)`);
    
    // Test with the greeting template
    const greetingRef = '/prompts/templates/greeting.yaml';
    updateStatus('Resolving greeting template...');
    
    // Resolve template (handles inheritance and validation)
    const resolved = await resolveTemplate(greetingRef, loader);
    
    updateStatus('Deriving input schema...');
    
    // Derive input schema from placeholders
    const schema = deriveInputSchema(resolved);
    
    updateStatus('Rendering template...');
    
    // Render template with sample input
    const input = { NAME: 'World' };
    const output = renderTemplate(resolved, input);
    
    // Build comprehensive output
    let fullOutput = `✅ Smoke Test Passed!\n\n`;
    fullOutput += `Templates available: ${templateRefs.length}\n`;
    fullOutput += `- ${templateRefs.map(ref => ref.split('/').pop()).join('\n- ')}\n\n`;
    fullOutput += `Test: Greeting Template\n`;
    fullOutput += `Template ID: ${resolved.metadata.id}\n`;
    fullOutput += `Template Name: ${resolved.metadata.name}\n`;
    fullOutput += `Placeholders: ${Object.keys(resolved.placeholders).join(', ')}\n`;
    fullOutput += `Input: ${JSON.stringify(input)}\n`;
    fullOutput += `Output: "${output}"\n`;
    fullOutput += `\nSchema derived: ${Object.keys(schema.properties || {}).length} properties`;
    
    return {
      success: true,
      message: 'Smoke test completed successfully',
      output: fullOutput
    };
    
  } catch (error) {
    return {
      success: false,
      message: `Error: ${error instanceof Error ? error.message : 'Unknown error'}`
    };
  }
}

function updateStatus(message: string) {
  const statusEl = document.getElementById('status');
  if (statusEl) {
    statusEl.textContent = message;
  }
}

function updateOutput(result: SmokeTestResult) {
  const outputEl = document.getElementById('output');
  if (outputEl) {
    outputEl.textContent = result.output || result.message;
    if (!result.success) {
      outputEl.classList.add('error');
    } else {
      outputEl.classList.remove('error');
    }
  }
}

// Run smoke test when popup opens
document.addEventListener('DOMContentLoaded', async () => {
  updateStatus('Running smoke test...');
  const result = await runSmokeTest();
  updateStatus(result.success ? '✅ Test Passed' : '❌ Test Failed');
  updateOutput(result);
});
