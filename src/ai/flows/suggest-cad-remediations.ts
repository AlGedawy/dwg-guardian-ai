'use server';
/**
 * @fileOverview An AI agent that suggests precise, rule-driven fixes for detected CAD issues.
 *
 * - suggestCadRemediations - A function that handles the CAD remediation suggestion process.
 * - SuggestCadRemediationsInput - The input type for the suggestCadRemediations function.
 * - SuggestCadRemediationsOutput - The return type for the suggestCadRemediations function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const SuggestCadRemediationsInputSchema = z.object({
  cadIssues: z.array(z.object({
    id: z.string().describe('Unique identifier for the detected CAD issue.'),
    type: z.enum([
      'duplicate_geometry',
      'incorrect_layer',
      'scale_violation',
      'plotting_risk',
      'lineweight_problem',
      'text_inconsistency',
      'other' // Added 'other' for flexibility
    ]).describe('The type of CAD issue detected.'),
    description: z.string().describe('A detailed explanation of the CAD issue, including affected elements and current values.'),
    severity: z.enum(['critical', 'high', 'medium', 'low']).describe('The severity of the issue.'),
    context: z.string().optional().describe('Additional context or relevant data for the issue (e.g., specific entity IDs, layer names, original and target scale values).'),
  })).describe('A list of detected CAD issues from the drawing audit.')
});
export type SuggestCadRemediationsInput = z.infer<typeof SuggestCadRemediationsInputSchema>;

const SuggestCadRemediationsOutputSchema = z.object({
  remediationSuggestions: z.array(z.object({
    issueId: z.string().describe('The ID of the CAD issue this suggestion addresses.'),
    suggestedAction: z.string().describe('A precise, rule-driven action to take to fix the issue. Examples: "Delete duplicate entities X, Y, Z.", "Move entity A from Layer_Wrong to Layer_Correct.", "Adjust drawing scale from 1:50 to 1:100."'),
    rationale: z.string().describe('The reasoning behind the suggested action, explaining why it resolves the issue and improves compliance.'),
    priority: z.enum(['critical', 'high', 'medium', 'low']).describe('The recommended priority for applying this fix.'),
    exampleCommand: z.string().optional().describe('An example command, API call, or pseudo-code snippet for CAD software to apply the fix, if applicable.'),
  })).describe('A list of precise, rule-driven remediation suggestions for the detected CAD issues.')
});
export type SuggestCadRemediationsOutput = z.infer<typeof SuggestCadRemediationsOutputSchema>;

export async function suggestCadRemediations(input: SuggestCadRemediationsInput): Promise<SuggestCadRemediationsOutput> {
  return suggestCadRemediationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestCadRemediationsPrompt',
  input: { schema: SuggestCadRemediationsInputSchema },
  output: { schema: SuggestCadRemediationsOutputSchema },
  prompt: `You are an expert CAD engineer and auditor, specializing in DWG, DXF, and PDF file quality assurance. Your task is to analyze a list of detected CAD issues and provide precise, rule-driven remediation suggestions.

For each issue, you must:
1.  Identify the specific issue being addressed (issueId).
2.  Provide a clear, actionable suggestedAction that can be directly applied to fix the problem. Be specific about entities, layers, or values.
3.  Offer a rationale explaining why this action is the correct rule-driven fix and how it improves drawing compliance and quality.
4.  Assign a priority to the fix (critical, high, medium, low) based on the issue's severity and impact.
5.  If possible, include an exampleCommand which is a pseudo-code or specific CAD command to illustrate how the fix might be implemented in a CAD environment.

Here is the list of CAD issues to remediate:

{{#each cadIssues}}
---
Issue ID: {{{id}}}
Type: {{{type}}}
Severity: {{{severity}}}
Description: {{{description}}}
{{#if context}}Context: {{{context}}}{{/if}}
---
{{/each}}

Provide your remediation suggestions in a JSON array format, where each object corresponds to a suggestion.`,
});

const suggestCadRemediationsFlow = ai.defineFlow(
  {
    name: 'suggestCadRemediationsFlow',
    inputSchema: SuggestCadRemediationsInputSchema,
    outputSchema: SuggestCadRemediationsOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
