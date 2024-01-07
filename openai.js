import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: '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',
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
