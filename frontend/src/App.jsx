import { useEffect, useRef, useState } from "react";
import "./App.css";
import classNames from "classnames/bind";
import useWindowDimensions from "./hooks/useWindowDimensions";

function App() {
  const [totalTime, _setTotalTime] = useState(50);
  const [currentTime, setCurrentTime] = useState(0);
  const divider = 10;
  const yAxis = useRef(0);
  const { height } = useWindowDimensions();

  function handlePress(e) {
    yAxis.current = e.clientY;
    const calculatedValue = (1 - yAxis.current / height) * 100;
    setCurrentTime(calculatedValue);
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime((prev) => {
        return prev - 1 / divider;
      });
    }, (totalTime * 1000) / divider); // Avgör hur sällan baren ska droppas

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="flex w-full justify-center  h-full items-end relative"
      onClick={(e) => {
        handlePress(e);
      }}
    >
      <h1 className="absolute top-5 left-5 font-black text-zinc-900 ">
        TimeOur
      </h1>
      <div
        className={"flex  bg-green-400 w-[95lvw] rounded-t-xl items-end"}
        style={{
          height: `${currentTime + "lvh"}`,
        }}
      >
        <div className="flex w-full justify-between px-3 text-sm pb-2">
          <ul className="flex flex-col justify-end text-green-800 font-light">
            <li>timevalue = {totalTime}</li>
            <li>current = {(currentTime / 100) * 10}</li>
          </ul>
          <ul className="flex flex-col items-end text-green-800 font-light">
            <li className="font-medium">Last changed </li>
            <li>1a dec 2025</li>
            <li>13:41</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
