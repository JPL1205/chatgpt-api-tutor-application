import Sidebar from './components/sidebar';
import Chat from './components/chat';
import { useEffect, useState } from 'react';
import { processMessageToChatGPT } from './api/chatgpt_api.js';
import './App.css';

import beginner from './assets/beginner.jpg';
import intermediate from './assets/intermediate.jpg';
import advance from './assets/advance.jpg';
import dragon from './assets/dragon.png';

function App() {
  const [theme, setTheme] = useState('dark');
  const [level, setLevel] = useState('');
  // const [scenario, setScenario] = useState('');
  const SCENARIOS = [
    '初次見面',
    '家庭',
    '旅遊',
    '工作',
    '愛情',
    '餐廳',
    '其他',
  ];
  const [selectedScenario, setSelectedScenario] = useState('');

  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // console.log(messages.length > 3 && messages[-1].sender === 'ChatGPT');

  // New state to handle level selection
  const [levelSelected, setLevelSelected] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  const handleLevelSelect = (selectedLevel) => {
    setFadeOut(true);
    setLevel(selectedLevel);

    setTimeout(() => {
      setFadeOut(false);
      setLevelSelected(true);
    }, 1000);
  };

  const handleSend = async (mes) => {
    const newMessage = {
      message: mes,
      sender: 'user',
    };

    const newMessages = [...messages, newMessage];

    //  update message state
    setMessages(newMessages);

    // set a typing indicator
    setTyping(true);

    //  process message to chatgpt
    await processMessageToChatGPT(
      newMessages,
      setMessages,
      setTyping,
      level,
      selectedScenario
    );
  };

  const handleSendScenario = async (scenario) => {
    const newMessage = [
      {
        message: `學生選擇了在${scenario}情竟下的對話，請根據此情境生成一句開場的問句，以使引導學員互動。`,
        sender: 'user',
      },
    ];
    setMessages([]);
    setTyping(true);

    await processMessageToChatGPT(
      newMessage,
      setMessages,
      setTyping,
      level,
      scenario
    );
  };

  // useEffect to handle scenario change
  useEffect(() => {
    if (selectedScenario === '') {
      return;
    } else {
      handleSendScenario(selectedScenario);
    }
  }, [selectedScenario]);

  function changeTheme() {
    theme === 'dark' ? setTheme('light') : setTheme('dark');
  }

  const handleLevelChange = (e) => {
    setLevel(e.target.value);
  };

  const handleScenarioChange = (e) => {
    setSelectedScenario(e.target.value);
  };

  return (
    <div className="lg:flex">
      {!levelSelected && (
        <div
          className={`level-selector lg:flex lg:flex-row lg:gap-9 sm:flex sm:flex-col ${
            fadeOut ? 'fade-out' : ''
          }`}>
          <nav className="fixed top-0 left-0 right-0 bg-white text-black text-center py-2 text-xl">
            線上華語家教
          </nav>
          <div
            className="level-button"
            onClick={() => handleLevelSelect('beginner')}>
            <img
              src={beginner}
              alt=""
              className="w-[200px] h-[200px] rounded-full transform transition-transform duration500 hover:scale-110"
            />
            <p className="text-black text-center">初級 (beginner)</p>
          </div>
          <div
            className="level-button"
            onClick={() => handleLevelSelect('intermediate')}>
            <img
              src={intermediate}
              alt=""
              className="w-[200px] h-[200px] rounded-full transform transition-transform duration500 hover:scale-110"
            />
            <p className="text-black text-center">中級 (intermediate)</p>
          </div>
          <div
            className="level-button"
            onClick={() => handleLevelSelect('advance')}>
            <img
              src={advance}
              alt=""
              className="w-[200px] h-[200px] rounded-full transform transition-transform duration500 hover:scale-110"
            />
            <p className="text-black text-center">高級 (advance)</p>
          </div>
        </div>
      )}
      {levelSelected && (
        <>
          <Sidebar
            theme={theme}
            changeTheme={changeTheme}
            handleLevelChange={handleLevelChange}
            level={level}
            handleScenarioChange={handleScenarioChange}
            scenario={selectedScenario}
            open={sidebarOpen}
          />
          <Chat
            theme={theme}
            changeTheme={changeTheme}
            handleSend={handleSend}
            messages={messages}
            typing={typing}
            level={level}
            SCENARIOS={SCENARIOS}
            setSelectedScenario={setSelectedScenario}
            selectedScenario={selectedScenario}
            toggleSidebar={toggleSidebar}
          />
        </>
      )}
    </div>
  );
}

export default App;
