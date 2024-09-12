import React, { useState, useEffect } from 'react';


const CountdownTimer = ({ countdownTime }: { countdownTime: number }) => {
    const [time, setTime] = useState(countdownTime); // 5 minutes in seconds
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (isRunning) {
            interval = setInterval(() => {
                setTime((prevTime) => {
                    if (prevTime <= 0) {
                        clearInterval(interval);
                        return 0;
                    } else {
                        return prevTime - 1;
                    }
                });
            }, 1000);
        }

        return () => {
            clearInterval(interval);
        };
    }, [isRunning]);

    const startTimer = () => {
        setIsRunning(true);
    };

    const pauseTimer = () => {
        setIsRunning(false);
    };

    const resetTimer = () => {
        setTime(countdownTime);
        setIsRunning(false);
    };

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;

        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    return (
        <div className='flex flex-col gap-2 justify-center my-5 w-1/2'>
            <div className='justify-center flex p-4 bg-sky-500 text-white rounded-full text-xl'>{formatTime(time)}</div>
            <div className='flex gap-2 '>
                <button className=" flex-1 rounded-md bg-green-500 p-3 text-white hover:bg-blue-400" onClick={startTimer}>Start</button>
                <button className=" flex-1 rounded-md bg-yellow-500 p-3 text-white hover:bg-blue-400" onClick={pauseTimer}>Pause</button>
                <button className="flex-1 rounded-md bg-red-500 p-3 text-white hover:bg-blue-400" onClick={resetTimer}>Reset</button>
            </div>
        </div>
    );
};

export default CountdownTimer;