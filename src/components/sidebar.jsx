import { useState } from 'react';
import styles from './sidebar.module.css';
import axios from 'axios';

export default function Sidebar({
  theme,
  changeTheme,
  level,
  scenario,
  handleLevelChange,
  handleScenarioChange,
  open,
}) {
  const t = theme === 'dark';

  return (
    <div
      className={`sidebar open ${
        open ? 'lg:block absolute' : 'hidden lg:block'
      } px-4 py-[1rem] sm:w-[75%] lg:w-[17.5%] ${
        t ? 'bg-[#141313]' : 'bg-white'
      } top-0 bottom-0 right-0 z-10`}>
      {/* <div className={`hidden lg:block px-4 py-[1rem] sm:w-full lg:w-[17.5%] ${open ?}`}> */}
      {/* <Switch /> */}
      <h1 className={`${styles.heading} ${t ? 'text-white' : 'text-black'}`}>
        對話等級選擇
      </h1>
      <h2 className={`${styles.subheading} ${t ? 'text-white' : 'text-black'}`}>
        Dialogue Level Selection
      </h2>
      <select
        name="level"
        value={level}
        onChange={handleLevelChange}
        className={`${styles.select} ${
          t ? 'bg-[#101010]' : 'bg-[#ECEBEB] text-black'
        }`}>
        <option value="beginner">初級 (Beginner)</option>
        <option value="intermediate">中級 (Intermediate)</option>
        <option value="advance">高級 (Advance)</option>
      </select>

      <p className="py-3 w-2/3 text-gray-400/70">
        可根據您的需求改變對話情境，一起開心地學中文吧
      </p>
      <input
        type="text"
        placeholder="額外需求"
        className={`${styles.select} ${
          t ? 'bg-[#101010]' : 'bg-[#ECEBEB] text-black'
        }`}
      />
    </div>
  );
}
