const API_KEY = 'replace with api key';

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

  const wordCounts = {
    beginner: 10,
    intermediate: 20,
    advance: 30,
  };

  // role:
  // "user" -> message from user
  // "assistant" -> a response from ChatGPT
  // "system" -> generally one initial response defining how we want chatGPT to talk

  const systemMessage = {
    role: 'system',
    content: `你是一個繁體華語老師正在以聊天的方式教導學生中文口語練習，請根據用戶選擇的情境${scenario}生成一個問題餅以此延伸來展開對話，請以引導式的方式讓學生回答。每次提問的字數請維持在${wordCounts[level]}字。`,
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
      if (
        chatMessages[0].message.startsWith('學生選擇了在') &&
        chatMessages[0].message.endsWith('互動。')
      ) {
        setMessages([
          {
            message: data.choices[0].message.content,
            sender: 'ChatGPT',
          },
        ]);
      } else {
        setMessages([
          ...chatMessages,
          {
            message: data.choices[0].message.content,
            sender: 'ChatGPT',
          },
        ]);
      }
      setTyping(false);
    });
}
