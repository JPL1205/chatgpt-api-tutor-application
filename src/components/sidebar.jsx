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
}) {
  const t = theme === 'dark';
  console.log(level);

  return (
    <div
      className={`${'px-4 py-[1rem] sm:w-full lg:w-[17.5%]'} ${
        t ? 'bg-[#141313]' : 'bg-white'
      }`}>
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
        placeholder="背著額外需求"
        className={`${styles.select} ${
          t ? 'bg-[#101010]' : 'bg-[#ECEBEB] text-black'
        }`}
      />
    </div>
  );
}
