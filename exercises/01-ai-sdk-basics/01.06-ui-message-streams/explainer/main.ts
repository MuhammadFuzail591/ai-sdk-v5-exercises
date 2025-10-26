import { google } from '@ai-sdk/google';
import { streamText } from 'ai';

const model = google('gemini-2.0-flash');

const stream = streamText({
  model,
  prompt: 'Hi there, I am Muhammad fuzail how are you and what are your capabilities.',
});

for await (const chunk of stream.toUIMessageStream()) {
  console.log(chunk);
}
