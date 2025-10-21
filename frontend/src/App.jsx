import { useEffect, useRef, useState } from "react";
import "./App.css";
import classNames from "classnames/bind";
import useWindowDimensions from "./hooks/useWindowDimensions";

function App() {
  const [totalTime, _setTotalTime] = useState(1 / 6);
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
    fetch("/api")
      .then((response) => response.json())
      .then((data) => {
        alert(data.hello);
      });
  }, []);

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
      className="flex w-full justify-center  h-full items-end"
      onClick={(e) => {
        handlePress(e);
      }}
    >
      <div
        className={classNames("bg-green-400 w-[95lvw] rounded-t-xl")}
        style={{
          height: `${currentTime + "lvh"}`,
        }}
      >
        <h1>timevalue = {totalTime}</h1>
        <h1>current = {(currentTime / 100) * 10}</h1>
      </div>
    </div>
  );
}

export default App;
