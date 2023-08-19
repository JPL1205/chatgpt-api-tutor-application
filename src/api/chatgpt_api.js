const API_KEY = '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';

export async function processMessageToChatGPT(
  chatMessages,
  setMessages,
  setTyping,
  level,
  scenario
) {
  let apiMessages = chatMessages.map((messageObject) => {
    let role = '';
    if (messageObject.sender === 'ChatGPT') {
      role = 'assistant';
    } else {
      role = 'user';
    }
    return { role: role, content: messageObject.message };
  });

  // role:
  // "user" -> message from user
  // "assistant" -> a response from ChatGPT
  // "system" -> generally one initial response defining how we want chatGPT to talk

  const systemMessage = {
    role: 'system',
    content: `Speak as a professional Chinese/Mandarin Tutor and the level of conversation should be ${level} under the scenario of ${scenario}, your answer should be in traditional chinese.`,
  };

  const apiRequestBody = {
    model: 'gpt-3.5-turbo',
    messages: [systemMessage, ...apiMessages],
  };

  await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + API_KEY,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(apiRequestBody),
  })
    .then((data) => {
      return data.json();
    })
    .then((data) => {
      // console.log(data.choices[0].message.content);
      setMessages([
        ...chatMessages,
        {
          message: data.choices[0].message.content,
          sender: 'ChatGPT',
        },
      ]);
      setTyping(false);
    });
}
