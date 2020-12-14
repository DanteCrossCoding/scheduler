import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);


const transition = ((newMode, replace) => {
  const updatedHistory = [...history];
  if(replace) {
    updatedHistory.pop();
  }
  updatedHistory.push(newMode);
  setHistory(updatedHistory);
  setMode(newMode);
})

const back = (() => {
  if(history.length > 1) {
    history.pop();
    setMode(history[history.length-1]);
    const updatedHistory = [...history];
    setHistory(updatedHistory);
  }
})
return { mode, transition, back };
};
