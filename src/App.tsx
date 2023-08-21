import { useState } from "react";
import Timer from "./components/Timer"
import TimerState from "./types/TimerState";
import Iteration from "./components/Iteration";

function App() {

  const [timerState, setTimerState] = useState<TimerState>(TimerState.POMODORO)
  const [iteration, setIteration] = useState<number>(1)

  function changeTheme(): {bgPrimary: string, bgSecondary: string, bgTertiery: string, 
      textPrimary: string, textSecondary: string, textTertiery: string} {
    switch (timerState) {
      case TimerState.POMODORO:
        return {bgPrimary: "bg-red-700", bgSecondary: "bg-red-600", bgTertiery:"bg-red-500", 
        textPrimary: "text-red-700", textSecondary: "text-red-600", textTertiery:"text-red-500"}
      case TimerState.SHORT_BREAK:
        return {bgPrimary: "bg-blue-700", bgSecondary: "bg-blue-600", bgTertiery:"bg-blue-500", 
        textPrimary: "text-blue-700", textSecondary: "text-blue-600", textTertiery:"text-blue-500"}
      case TimerState.LONG_BREAK:
        return {bgPrimary: "bg-teal-700", bgSecondary: "bg-teal-600", bgTertiery:"bg-teal-500", 
        textPrimary: "text-teal-700", textSecondary: "text-teal-600", textTertiery:"text-teal-500"}
      default:
        return {bgPrimary: "bg-red-700", bgSecondary: "bg-red-600", bgTertiery:"bg-red-500", 
        textPrimary: "text-red-700", textSecondary: "text-red-600", textTertiery:"text-red-500"}
    }
  }

  return (
    <>
      <div className={`${changeTheme().bgSecondary} min-h-screen pt-12`}>
        <div className="mx-3">
          <Timer themes={changeTheme()} setTimer={setTimerState} timeState={timerState} iterator={iteration} setIterator={setIteration}/>
          <Iteration themes={changeTheme()} iterator={iteration} timeState={timerState}/>
        </div>
      </div>
    </>
  )
}

export default App
