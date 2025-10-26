import { google } from '@ai-sdk/google';
import { generateObject, generateText } from 'ai';
import { evalite } from 'evalite';
import { readFileSync } from 'fs';
import path from 'path';
import z from 'zod';
import { attributionToChainOfThoughtPaper } from './attribution-eval.ts';

const chainOfThoughtPaper = readFileSync(
  path.join(
    import.meta.dirname,
    'chain-of-thought-prompting.pdf',
  ),
);

evalite('Chain Of Thought Paper', {
  data: () => [
    {
      input: 'What is chain of thought prompting?',
    },
    {
      input:
        'Why do the authors of the paper think that chain of thought prompting produces improvements?',
    },
  ],
  task: async (input) => {
    const result = await generateText({
      model: google('gemini-2.0-flash'),
      system: `
        You are a helpful assistant that can answer questions about the chain of thought prompting paper.
        
        ALWAYS use quotes from the paper when answering the question.
      `,
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: input,
            },
            {
              type: 'file',
              data: chainOfThoughtPaper,
              mediaType: 'application/pdf',
            },
          ],
        },
      ],
    });

    return result.text;
  },
  scorers: [
    {
      name: 'Includes Quotes',
      scorer: ({ input, output, expected }) => {
        const quotesFound = output.includes('"');

        return quotesFound ? 1 : 0;
      },
    },
    attributionToChainOfThoughtPaper,
  ],
});
