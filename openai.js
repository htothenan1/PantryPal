import OpenAI from 'openai';
import {OPEN_AI_API} from '@env';

const openai = new OpenAI({
  apiKey: OPEN_AI_API,
  dangerouslyAllowBrowser: true,
});

export async function generateStorageTip(item) {
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: 'user',
        content: `Best storage tips for ${item}, limit response to 3 sentences. Make sure you are interpreting the item as a common grocery item, if possible.`,
      },
    ],
    model: 'gpt-3.5-turbo',
  });

  return completion.choices[0].message.content;
}
