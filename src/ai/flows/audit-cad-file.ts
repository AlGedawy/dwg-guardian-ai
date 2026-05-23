'use server';
/**
 * @fileOverview An AI auditor for CAD files (DWG, DXF, PDF) that analyzes them against engineering standards
 * and provides a detailed list of detected issues like incorrect layers, text inconsistencies, and plotting risks.
 *
 * - auditCadFile - A function that handles the CAD file auditing process.
 * - AuditCadFileInput - The input type for the auditCadFile function.
 * - AuditCadFileOutput - The return type for the auditCadFile function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const AuditCadFileInputSchema = z.object({
  fileDataUri: z
    .string()
    .describe(
      "The CAD file content (DWG, DXF, or PDF) as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  fileName: z.string().describe("The original name of the CAD file, e.g., 'drawing.dwg'."),
});
export type AuditCadFileInput = z.infer<typeof AuditCadFileInputSchema>;

const AuditCadFileOutputSchema = z.object({
  issues: z
    .array(
      z.object({
        category: z
          .enum(['Layer', 'Text', 'Annotation', 'Plotting', 'Scale', 'General'])
          .describe('The category of the issue.'),
        description: z.string().describe('A detailed description of the detected issue.'),
        severity: z
          .enum(['Critical', 'High', 'Medium', 'Low', 'Informational'])
          .describe('The severity level of the issue.'),
        suggestedRemediation: z
          .string()
          .optional()
          .describe('Optional suggestion for how to fix the issue.'),
      })
    )
    .describe('A list of detected issues in the CAD file.'),
});
export type AuditCadFileOutput = z.infer<typeof AuditCadFileOutputSchema>;

export async function auditCadFile(input: AuditCadFileInput): Promise<AuditCadFileOutput> {
  return auditCadFileFlow(input);
}

const auditCadFilePrompt = ai.definePrompt({
  name: 'auditCadFilePrompt',
  input: { schema: AuditCadFileInputSchema },
  output: { schema: AuditCadFileOutputSchema },
  prompt: `You are an expert CAD auditor AI. Your task is to analyze the provided CAD file (DWG, DXF, or PDF) against common engineering drafting standards and best practices.

Carefully examine the file for the following types of issues:
- **Incorrect Layers**: Layers not conforming to standard naming conventions, incorrect layer usage for specific entities, or unnecessary layers.
- **Text Inconsistencies**: Variations in text styles, fonts, heights, or justifications that indicate lack of standardization.
- **Annotation Issues**: Incorrect dimensioning practices, missing annotations, or inconsistent annotation styles.
- **Plotting Risks**: Elements that might cause issues during plotting, such as objects far from origin, unpurgeable items, or inconsistent paper space layouts.
- **Scale Problems**: Inconsistent scaling, incorrect units, or objects drawn at non-standard scales.

Based on your analysis of the file named "{{{fileName}}}", provide a detailed list of all detected issues. For each issue, identify its category, provide a clear and concise description, assign a severity level, and if possible, offer a suggested remediation.

File Name: {{{fileName}}}
File Content: {{media url=fileDataUri}}

Ensure the output is a JSON object conforming strictly to the provided output schema.`,
});

const auditCadFileFlow = ai.defineFlow(
  {
    name: 'auditCadFileFlow',
    inputSchema: AuditCadFileInputSchema,
    outputSchema: AuditCadFileOutputSchema,
  },
  async (input) => {
    const { output } = await auditCadFilePrompt(input);
    return output!;
  }
);
