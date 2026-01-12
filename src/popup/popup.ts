// Popup script with engine smoke test
import TemplateEngine from '../lib/engine-mock';
import TemplateLoader from '../lib/template-loader';

interface SmokeTestResult {
  success: boolean;
  message: string;
  output?: string;
}

async function runSmokeTest(): Promise<SmokeTestResult> {
  try {
    // Initialize the template loader and engine
    const loader = new TemplateLoader();
    const engine = new TemplateEngine();
    
    // Load templates
    updateStatus('Loading templates...');
    const templates = await loader.loadAllTemplates();
    
    if (templates.length === 0) {
      return {
        success: false,
        message: 'No templates found'
      };
    }
    
    updateStatus(`Loaded ${templates.length} template(s)`);
    
    // Test with the greeting template
    const greetingTemplate = templates.find(t => t.id === 'greeting');
    if (!greetingTemplate) {
      return {
        success: false,
        message: 'Greeting template not found'
      };
    }
    
    updateStatus('Testing greeting template...');
    
    // Resolve template with sample input
    const input = { name: 'World' };
    const output = engine.resolve(greetingTemplate, input);
    
    // Test validation
    const isValid = engine.validate(greetingTemplate, input);
    
    if (!isValid) {
      return {
        success: false,
        message: 'Template validation failed'
      };
    }
    
    // Build comprehensive output
    let fullOutput = `✅ Smoke Test Passed!\n\n`;
    fullOutput += `Templates loaded: ${templates.length}\n`;
    fullOutput += `- ${templates.map(t => t.name).join('\n- ')}\n\n`;
    fullOutput += `Test: Greeting Template\n`;
    fullOutput += `Input: ${JSON.stringify(input)}\n`;
    fullOutput += `Output: "${output}"\n`;
    
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
