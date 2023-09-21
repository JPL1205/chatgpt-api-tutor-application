import { Switch } from '@mui/material';
import { useState } from 'react';

import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { TypingIndicator } from '@chatscope/chat-ui-kit-react';
import MenuIcon from '@mui/icons-material/Menu';

import advanceTutor from '../assets/advance.jpg';
import intermediate from '../assets/intermediate.jpg';
import beginner from '../assets/beginner.jpg';

export default function Chat({
  theme,
  changeTheme,
  handleSend,
  messages,
  typing,
  level,
  SCENARIOS,
  setSelectedScenario,
  selectedScenario,
  toggleSidebar,
}) {
  const [dark, setDark] = useState(true);
  const [input, setInput] = useState('');

  const t = theme === 'dark';

  function handleChange() {
    dark ? setDark(false) : setDark(true);
    changeTheme();
  }

  function handleType(e) {
    setInput(e.target.value);
  }

  function handleSubmit() {
    handleSend(input);
    setInput('');
  }

  return (
    <div
      className={`min-h-screen flex flex-col justify-between sm:w-full lg:w-[82.5%] relative ${
        t ? 'bg-[#101010]' : 'bg-white'
      }`}>
      <div>
        <div className="flex bg-[#4646462f] justify-between lg:justify-end items-center py-2 px-4 gap-1">
          <button onClick={toggleSidebar} className="lg:hidden">
            <MenuIcon fontSize="large" />
          </button>
          <div className="flex items-center">
            <LightModeOutlinedIcon />
            <Switch checked={dark} color="default" onChange={handleChange} />
            <DarkModeOutlinedIcon />
          </div>
        </div>
        <div
          className="overflow-scroll"
          style={{ maxHeight: 'calc(100vh - 120px)' }}>
          <div
            className={`${
              t ? 'text-white bg-[#2f2f2f72]' : 'text-black bg-slate-100'
            } pb-[2rem] px-4 pt-[1rem] flex flex-col gap-3 `}>
            <div className="flex items-center gap-3">
              <img
                src={
                  level === 'beginner'
                    ? beginner
                    : level === 'intermediate'
                    ? intermediate
                    : advanceTutor
                }
                alt="tutor image"
                className="w-[50px] h=[50px] rounded-full"
              />
              <p>你好，我是你的線上華語家教你想要練什麼習對話情境</p>
            </div>
            <div className="flex gap-3 pl-14">
              {SCENARIOS.map((scenario) => (
                <button
                  key={scenario}
                  onClick={() => setSelectedScenario(scenario)}
                  className={`bg-[#c2bebe26] py-1 px-2 rounded-lg hover:scale-110 ${
                    selectedScenario === scenario
                      ? 'border-2 border-[#b56d6d8a]'
                      : ''
                  }`}>
                  {scenario}
                </button>
              ))}
            </div>
          </div>
          {messages.map((mes, i) => {
            if (mes.sender === 'ChatGPT') {
              return (
                <div
                  className={`${
                    t ? 'text-white bg-[#2a2a2a72]' : 'text-black bg-slate-100'
                  } pb-[2rem] px-4 pt-[1rem] flex items-center gap-3 `}
                  key={i}>
                  <img
                    src={
                      level === 'beginner'
                        ? beginner
                        : level === 'intermediate'
                        ? intermediate
                        : advanceTutor
                    }
                    alt="tutor image"
                    className="w-[50px] h=[50px] rounded-full"
                  />
                  {mes.message}
                </div>
              );
            } else {
              return (
                <div
                  className={`${
                    t ? 'text-white' : 'text-black'
                  } pb-[2rem] px-4 pt-[1rem]  flex items-center gap-3`}
                  key={i}>
                  {/* <AccountCircleIcon className="w-[50px] h=[50px] rounded-full" /> */}
                  {mes.message}
                </div>
              );
            }
          })}
        </div>
        {typing ? (
          <TypingIndicator content="Tutor is typing" className="pl-5" />
        ) : null}
      </div>

      <form
        className="py-4 flex gap-2 justify-center"
        onSubmit={(e) => {
          e.preventDefault(); // Prevent the default form submission behavior
          handleSubmit(); // Call your submit function
        }}>
        <input
          type="text"
          value={input}
          onChange={handleType}
          placeholder="輸入對話 (Start a conversation)"
          className={`w-[80%] py-2 px-4 rounded-lg ${
            t ? 'text-white bg-[#2a2a2a72]' : 'bg-[#dcdcdc8b] text-black'
          }`}
        />
        <button
          type="submit" // Set the type to submit so that it triggers form submission
          className={`rounded-lg px-4 ${t ? 'bg-[#9B0CCD]' : 'bg-[#3B9013]'}`}>
          SUBMIT
        </button>
      </form>
    </div>
  );
}
