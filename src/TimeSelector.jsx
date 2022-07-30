import {useEffect, useState} from "react";
import TimePicker from "react-time-picker";

export default function TimeSelector({setEventTime}) {

    const [time, setTime] = useState('');

    useEffect(()=> {
        // setTime('10:00')
    }, [])

    const handleTimeSelect = (time) => {
        setTime(time)
        setEventTime(time)
        console.log(time)
    }

    return (
            <div>
                <TimePicker 
                    onChange={handleTimeSelect} 
                    value={time} 
                    disableClock 
                    format="HH:mm"/>
            </div>
    )
}