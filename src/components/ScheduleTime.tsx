import { useEffect, useState } from "react";
import { Button } from "./ui/button";

export const DaysOfTheWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const ScheduleTime = ({onUpdate}) => {

    const [time, selectTime] = useState();
    const handleTimeChange = (e) => {
        console.log(e.target.value)
        selectTime(e.target.value);
    };
    const [selectedDays, setSelectedDays] = useState<number>(0);

    useEffect(() => {
        if (onUpdate) {
            if(time && selectedDays && selectedDays > 0){
                onUpdate(selectedDays + ',' +time);
            }
          
        }
      }, [selectedDays, time, onUpdate])

    const toggleDay = (dayIndex: number) => {
        setSelectedDays((prev) => prev ^ (1 << dayIndex));

        console.log(selectedDays.toString(2).padStart(7, '0'))
    };

    const isDaySelected = (dayIndex: number) => {
        return (selectedDays & (1 << dayIndex)) !== 0;
    };

    return (
        <div className="flex items-center justify-between gap-1">
            <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold">Select Schedule</label>
                <div className="flex gap-1">
                    {DaysOfTheWeek.map((day, index) => (
                        <Button
                            variant={'outline'}
                            type="button"
                            key={index}
                            className={`px-2 rounded-md text-xs ${isDaySelected(index) ? "bg-primary hover:bg-primary/90 hover:text-white text-white" : ""}`}
                            onClick={() => toggleDay(index)}
                        >
                            {day}
                        </Button>
                    ))}
                </div>
            </div>
            <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold">Select Time</label>
                <div className="flex gap-1">
                    <input type="time" className="input border"
                     value={time} 
                     onChange={handleTimeChange} 
                    />
                </div>
            </div>

        </div>
    );

};

export default ScheduleTime;