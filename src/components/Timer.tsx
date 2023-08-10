import { useState, useRef, useEffect } from "react"

function HeaderMenu() {
    const [isStarted, setIsStarted] = useState(false)
    const [countdownSec, setCountdownSec] = useState(60.5*60)
    
    const prevIsStarted = useRef<boolean>(false);
    const prevCountVal = useRef<number>(60.5*60);
    const downCounterRef = useRef<number>(0);
    const timeDisplay = useRef<HTMLParagraphElement>(null);

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
        <div className="px-10 py-6 bg-red-300 rounded-lg">
            <div className="flex justify-center">
                <p className="text-white font-bold text-2xl" ref={timeDisplay}>???</p>
            </div>
            <div className="flex justify-center mt-5">
                <button onClick={HandleToggleBtn} className="min-w-[60%] py-2 bg-white text-red-300 rounded-md font-bold">{isStarted ? "Pause" : "Start"}</button>
            </div>
        </div>
    )
}

export default HeaderMenu   