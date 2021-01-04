import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

//tracks page history
const transition = ((newMode, replace) => {
  const updatedHistory = [...history];
  if(replace) {
    updatedHistory.pop();
  }
  updatedHistory.push(newMode);
  setHistory(prev => [...prev, updatedHistory]);
  setMode(newMode);
})

//accesses page history to return to last page
const back = () => {
  if (history.length < 2) {
    return;
  }
  const updatedHistory = [...history];
    updatedHistory.pop();
    setMode(updatedHistory[updatedHistory.length-1]);
    setHistory(prev => [...prev, updatedHistory]);
  }

return { mode, transition, back };
};
