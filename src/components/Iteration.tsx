import TimerState from "../types/TimerState"

interface IterationProps {
    themes: {bgPrimary: string, bgSecondary: string, bgTertiery: string, 
        textPrimary: string, textSecondary: string, textTertiery: string}
    iterator: number
    timeState: TimerState
}
function Iteration({themes, iterator, timeState}: IterationProps) {
    return (
        <div className="px-6 py-4 mt-4">
            <div className="flex flex-col items-center">
                <div className={`px-4 py-2 ${themes.bgTertiery} rounded-full`}>
                    <p className="text-white">{iterator}</p>
                </div>
                <div className="mt-2">
                <p className="text-white font-semibold">{timeState == TimerState.POMODORO ? "Time to focus!" : "Time for a break!"}</p>
                </div>
            </div>
        </div>
    )
}

export default Iteration