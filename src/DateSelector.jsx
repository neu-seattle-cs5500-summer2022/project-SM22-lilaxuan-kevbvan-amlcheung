import {useEffect, useRef, useState} from "react";
import { Calendar } from "react-date-range";
import format from "date-fns/format";

import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'

export default function CalendarComponent({setEventDate}) {

        const [date,setDate] = useState('')
        const [open,setOpen] = useState(false)
        const ref = useRef(null)

        const hideCalendarOnOutsideClick = (e) => {
            if (ref.current && !ref.current.contains(e.target)) {
                setOpen(false)
            }
        }

        useEffect(()=> {
            setDate(format(new Date(), 'MM/dd/yyyy'))
            document.addEventListener("click", hideCalendarOnOutsideClick, true)
        }, [])

        const handleDateSelect = (date) => {
            setDate(format(date, 'MM/dd/yyyy'))
            setEventDate(format(date, 'MM/dd/yyyy'))
        }

        return(
            <div>

                <input 
                    value={date}
                    readOnly
                    onClick={() => setOpen(open => !open)}
                />

                <div ref={ref}>
                    {open &&
                        <Calendar
                        date={new Date()}
                        minDate = {new Date()}
                        onChange = {handleDateSelect}
                    />
                    }
                </div>
                
            </div>
        )
}