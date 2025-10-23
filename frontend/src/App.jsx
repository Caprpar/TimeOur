import { useEffect, useRef, useState } from "react";
import "./App.css";
import useWindowDimensions from "./hooks/useWindowDimensions";

function App() {
  const [totalTime, _setTotalTime] = useState(60);
  const [barHeight, setBarHeight] = useState(0);
  const [displayTime, setDisplayTime] = useState(0);
  // const [currentTime, setCurrentTime] = useState(null);

  const currentTime = useRef(fetchTime());
  const divider = 10;
  const yAxis = useRef(0);
  const { height } = useWindowDimensions();

  function handlePress(e) {
    yAxis.current = e.clientY;
    const calculatedValue = (1 - yAxis.current / height) * 100;
    currentTime.current = calculatedValue;
    setDisplayTime(Math.round((currentTime.current / 100) * totalTime));
    setBarHeight(currentTime.current);
  }

  async function fetchTime() {
    return fetch("/api")
      .then((resp) => resp.json())
      .then((data) => data[0].remaining_minutes);
  }

  useEffect(() => {
    let interval = null;
    fetch("/api")
      .then((resp) => resp.json())
      .then((data) => {
        currentTime.current = data[0].remaining_minutes;
        setBarHeight(currentTime.current);
        setDisplayTime(Math.round((currentTime.current / 100) * totalTime));

        interval = setInterval(() => {
          setBarHeight(currentTime.current);
          currentTime.current -= 1 / divider;
        }, (totalTime * 1000) / divider); // Avgör hur sällan baren ska droppas
      });

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (typeof currentTime.current === "number") {
      fetch("/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ remaining_minutes: currentTime.current }),
      });
    }
  }, [currentTime.current]);

  // skapa useeffect som laddar upp tid till backend vid tryck

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
        className={
          "flex bg-green-400 w-[95lvw] rounded-t-xl relative justify-center items-center"
        }
        style={{
          height: `${barHeight + "lvh"}`,
        }}
      >
        <p className="text-9xl text-green-500">{displayTime}</p>
        <div className="flex w-full bottom-0 justify-between px-3 absolute text-sm pb-2">
          <ul className="flex flex-col justify-end text-green-800 font-light">
            <li>timevalue = {totalTime}</li>
            <li>current = {displayTime}</li>
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
