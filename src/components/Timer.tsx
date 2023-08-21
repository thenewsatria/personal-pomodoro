import { useState, useRef, useEffect } from "react"
import TimerState from "../types/TimerState";

function HeaderMenu() {
    const [isStarted, setIsStarted] = useState(false)
    const [countdownSec, setCountdownSec] = useState(25*60)
    const [timerState, setTimerState] = useState<TimerState>(TimerState.POMODORO)
    
    
    const prevIsStarted = useRef<boolean>(false);
    const prevCountVal = useRef<number>(25*60);
    const downCounterRef = useRef<number>(0);
    const timeDisplay = useRef<HTMLParagraphElement>(null)

    useEffect(() => {
        if(isStarted) {
            const countdownCounter = setInterval(() => {
                setCountdownSec(prevCountVal.current - 1)
            }, 1000)
            downCounterRef.current = countdownCounter
        }else{
            if(downCounterRef.current) {
                clearInterval(downCounterRef.current)
            }
        }

        prevIsStarted.current = isStarted
    }, [isStarted])

    useEffect(() => {
        setTimerDisplay(produceTimerStr(countdownSec))
    }, [])

    useEffect(() => {
        setTimerDisplay(produceTimerStr(countdownSec))
        prevCountVal.current = countdownSec
    }, [countdownSec])

    
    function HandleToggleBtn() {
        setIsStarted(!prevIsStarted.current)
    }

    function HandlePomodoroBtn() {
        setIsStarted(false)
        setCountdownSec(25*60)
        setTimerState(TimerState.POMODORO)
    }

    function HandleShortBreakBtn() {
        setIsStarted(false)
        setCountdownSec(5*60)
        setTimerState(TimerState.SHORT_BREAK)

    }

    function HandleLongBreakBtn(){
        setIsStarted(false)
        setCountdownSec(15*60)
        setTimerState(TimerState.LONG_BREAK)
    }

    function produceTimerStr(secondVal: number): string{
        let hours: string = "00"
        let minutes: string = `${Math.floor(secondVal / 60)}`.padStart(2, '0')
        const seconds: string = `${secondVal % 60}`.padStart(2, '0')
        if (secondVal >= 3600) {
            hours = `${Math.floor(secondVal / 3600)}`.padStart(2, '0')
            minutes = `${Math.floor((secondVal % 3600) / 60)}`.padStart(2, '0')
            return hours+":"+minutes+":"+seconds
        }
        return minutes+":"+seconds
    }

    function setTimerDisplay(value: string) {
        if(timeDisplay.current){
            timeDisplay.current.innerText = value
        }
    }
    
    function getTheme(): {bgPrimary: string, bgSecondary: string, textPrimary: string, textSecondary: string} {
        switch (timerState) {
            case TimerState.POMODORO:
                return {bgPrimary: "bg-red-600", bgSecondary: "bg-red-500", textPrimary: "text-red-600", textSecondary: "text-red-500"}
            case TimerState.SHORT_BREAK:
                return {bgPrimary: "bg-blue-600", bgSecondary: "bg-blue-500", textPrimary: "text-blue-600", textSecondary: "text-blue-500"}
            case TimerState.LONG_BREAK:
                return {bgPrimary: "bg-teal-600", bgSecondary: "bg-teal-500", textPrimary: "text-teal-600", textSecondary: "text-teal-500"}
            default:
                return {bgPrimary: "bg-red-600", bgSecondary: "bg-red-500", textPrimary: "text-red-600", textSecondary: "text-red-500"}
        }
    }

    return (
        <div className={`px-6 py-4 ${getTheme().bgSecondary} rounded-lg`}>
            <div className="flex justify-evenly">
                <button 
                onClick={HandlePomodoroBtn}
                className={`px-3 py-2 text-white text-xs ${timerState==TimerState.POMODORO ? `bg-red-600 font-bold rounded-md` : ""}`}>Pomodoro</button>
                <button
                onClick={HandleShortBreakBtn}
                className={`px-3 py-2 text-white text-xs ${timerState==TimerState.SHORT_BREAK ? `bg-blue-600 font-bold rounded-md` : ""}`}>Short Break</button>
                <button
                onClick={HandleLongBreakBtn} 
                className={`px-3 py-2 text-white text-xs ${timerState==TimerState.LONG_BREAK ? `bg-teal-600 font-bold rounded-md` : ""}`}>Long Break</button>
            </div>
            <div className="flex justify-center mt-8">
                <p className="text-white font-bold text-6xl" ref={timeDisplay}>???</p>
            </div>
            <div className="flex justify-center mt-8">
                <button onClick={HandleToggleBtn} className={`min-w-[60%] py-2 bg-white ${getTheme().textPrimary} rounded-md font-bold`}>{isStarted ? "PAUSE" : "START"}</button>
            </div>
        </div>
    )
}

export default HeaderMenu   