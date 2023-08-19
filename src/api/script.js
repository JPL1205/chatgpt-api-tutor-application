import readline from 'readline';

import { Configuration, OpenAIApi } from 'openai';

const openai = new OpenAIApi(
  new Configuration({
    apiKey: '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',
  })
);

const userInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

userInterface.prompt();
userInterface.on('line', async (input) => {
  const res = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: input }],
  });
  console.log(res.data.choices[0].message.content);
  // userInterface.prompt();
});
