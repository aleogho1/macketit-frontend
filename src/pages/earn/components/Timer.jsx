import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import Loader from '../../Loader';

const Timer = ({ onDone, started_at }) => {
    const [timeRemaining, setTimeRemaining] = useState(); // 1 hour in seconds

    useEffect(() => {
      if(started_at) {
      const [hours, minutes, seconds] = format(new Date(started_at), 'HH:mm:ss').split(':').map(Number);
      const currentDate = new Date();
      const started_date = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), hours, minutes, seconds).getTime();
      const endTime = started_date + 60 * 60 * 1000;
      const updateCountdown = () => {
        const now = Date.now();
        const timeLeft = Math.max(0, Math.floor((endTime - now) / 1000))
        setTimeRemaining(timeLeft)
        if (timeLeft <= 0) {
            clearInterval(intervalId);
            onDone()
         }
        };
        const intervalId = setInterval(updateCountdown, 1000);
        updateCountdown();
        return () => clearInterval(intervalId);
      }
      
    }, [started_at]);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    return (
      <div>
       <div className='w-full px-3 sm:py-6 py-2 bg-red-300 rounded-lg flex-col justify-start items-center gap-3 inline-flex'>
         <svg
           className={`countdown-icon ${timeRemaining > 0 ? 'shake-animation' : ''}`}
          xmlns='http://www.w3.org/2000/svg'
          width='17'
          height='17'
          viewBox='0 0 17 17'
          fill='none'
        >
          <path
            d='M3.54297 1.41663H13.4596M3.54297 15.5833H13.4596M4.2513 1.41663V4.24996C4.2513 6.59717 6.15409 8.49996 8.5013 8.49996M12.7513 15.5833V12.75C12.7513 10.4027 10.8485 8.49996 8.5013 8.49996M8.5013 8.49996C6.15409 8.49996 4.2513 10.4027 4.2513 12.75V15.5833M8.5013 8.49996C10.8485 8.49996 12.7513 6.59717 12.7513 4.24996V1.41663M10.6263 4.24996C10.6263 5.42356 9.67491 6.37496 8.5013 6.37496C7.3277 6.37496 6.3763 5.42356 6.3763 4.24996M6.3763 13.4583H10.6263'
            stroke='black'
            strokeLinecap='round'
          />
        </svg>
        <div className="self-stretch text-center text-black text-xs font-semibold font-['Manrope']">
            {timeRemaining ? formatTime(timeRemaining) : 
            <div className='w-full items-center justify-center flex'>
              <Loader />
            </div>
            }
        </div>
      </div>
    </div>
    );
};

export default Timer;
