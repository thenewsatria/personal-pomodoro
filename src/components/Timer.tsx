import { useState, useRef, useEffect, SetStateAction, Dispatch } from "react"
import TimerState from "../types/TimerState";

interface TimerProps {
    themes: {bgPrimary: string, bgSecondary: string, bgTertiery: string, 
        textPrimary: string, textSecondary: string, textTertiery: string}
    setTimer: Dispatch<SetStateAction<TimerState>>
    timeState: TimerState
    iterator: number
    setIterator: Dispatch<SetStateAction<number>>
}
function Timer({themes, setTimer, timeState, iterator, setIterator}: TimerProps) {
    const [isStarted, setIsStarted] = useState(false)
    const [countdownSec, setCountdownSec] = useState(25*60)
    
    
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
        setPageTitle(produceTimerStr(countdownSec), timeState)
    }, [])

    useEffect(() => {
        if(countdownSec < 1) {
            if(timeState == TimerState.POMODORO) {
                if (iterator % 4 == 0) {
                    HandleLongBreakBtn()
                }else{
                    HandleShortBreakBtn()
                }
            }else{
                HandlePomodoroBtn()
                setIterator(iterator + 1)
            }
        }
        setTimerDisplay(produceTimerStr(countdownSec))
        setPageTitle(produceTimerStr(countdownSec), timeState)
        prevCountVal.current = countdownSec
    }, [countdownSec])

    
    function HandleToggleBtn() {
        setIsStarted(!prevIsStarted.current)
    }

    function HandlePomodoroBtn() {
        setIsStarted(false)
        setCountdownSec(25*60)
        setTimer(TimerState.POMODORO)
    }

    function HandleShortBreakBtn() {
        setIsStarted(false)
        setCountdownSec(5*60)
        setTimer(TimerState.SHORT_BREAK)

    }

    function HandleLongBreakBtn(){
        setIsStarted(false)
        setCountdownSec(15*60)
        setTimer(TimerState.LONG_BREAK)
    }

    function setPageTitle(message: string, timerStatus: TimerState) {
        const status = timerStatus == TimerState.POMODORO ? "Pomodoro Time" : timerStatus == TimerState.SHORT_BREAK ? "Short Break Time" : "Long Break Time"
        document.title = `${message} - ${status}`
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

    return (
        <div className={`px-6 py-4 ${themes.bgTertiery} rounded-lg`}>
            <div className="flex justify-evenly">
                <button 
                onClick={HandlePomodoroBtn}
                className={`px-3 py-2 text-white text-xs ${timeState==TimerState.POMODORO ? `${themes.bgPrimary} font-bold rounded-md` : ""}`}>Pomodoro</button>
                <button
                onClick={HandleShortBreakBtn}
                className={`px-3 py-2 text-white text-xs ${timeState==TimerState.SHORT_BREAK ? `${themes.bgPrimary} font-bold rounded-md` : ""}`}>Short Break</button>
                <button
                onClick={HandleLongBreakBtn} 
                className={`px-3 py-2 text-white text-xs ${timeState==TimerState.LONG_BREAK ? `${themes.bgPrimary} font-bold rounded-md` : ""}`}>Long Break</button>
            </div>
            <div className="flex justify-center mt-8">
                <p className="text-white font-bold text-6xl" ref={timeDisplay}>???</p>
            </div>
            <div className="flex justify-center mt-8">
                <button onClick={HandleToggleBtn} className={`min-w-[60%] py-2 bg-white ${themes.textPrimary} rounded-md font-bold`}>{isStarted ? "PAUSE" : "START"}</button>
            </div>
        </div>
    )
}

export default Timer   