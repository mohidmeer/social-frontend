import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { Button } from "../components/ui/button";
import { apiService } from "../api/client";
import ScheduleTime from "./ScheduleTime";

const EditScheduleForm = ({ schedule }: { schedule?: any }) => {

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();


  useEffect(() => {
    if (schedule) {
      reset(schedule);
    }
  }, [schedule, reset]);

  const onSubmit = async (data: any) => {

    const res = await apiService.UpdateSchedule(schedule._id, data);

    if (res.success) {
      document.getElementById('update')?.click()
      window.location.reload()
    }
  };

  const schedulev = getValues("schedule");

  const [initialDays, setInitialDays] = useState<number | null>(null);
  const [initialTime, setInitialTime] = useState<string | null>(null);


  useEffect(() => {
  if (schedule) {
    reset(schedule);

    const [days, time] = schedule.schedule?.split(",") || [];
    setInitialDays(Number(days));
    setInitialTime(time);
  }
}, [schedulev, reset]);



  return (
    <form
      className="flex-1 flex flex-col justify-center items-center overflow-auto"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="p-1 flex flex-col gap-2 max-w-[600px] mx-auto w-full max-h-screen overflow-auto ">
        <div className="flex flex-col gap-4 ">

          {/* Title */}
          <div className="flex flex-col gap-1 w-full">
            <label className="text-xs font-semibold">Title</label>
            <input
              data-error={errors.title && true}
              className="input w-full input-sm"
              type="text"
              placeholder="Schedule Title (for your reference)"
              {...register("title", { required: "Title is required" })}
            />
            {errors.title && <p className="text-xs text-red-500">{errors.title.message as string}</p>}
          </div>

          {/* Instructions */}
          <div className="flex flex-col gap-1 w-full">
            <label className="text-xs font-semibold">Instructions</label>
            {errors.instructions && 'true'}
            <textarea
              data-error={errors.instructions && true}
              className="input w-full input-sm"
              placeholder="Enter instructions"
              {...register("instructions", { required: "Instructions are required" })}
            />
            {errors.instructions && <p className="text-xs text-red-500">{errors.instructions.message as string}</p>}
          </div>

          {
            initialDays && 
            <ScheduleTime initialDays={initialDays} initialTime={initialTime || ''} onUpdate={(v: any) => {
              setValue('schedule', v)
            }} />
          }
          <input type="hidden" {...register("schedule", { required: "Please choose both the schedule days and time to proceed." })} />
          {errors.schedule && (
            <p className="text-xs mt-1 font-semibold text-red-500">
              {errors.schedule.message as string}
            </p>
          )}



          {/* Submit */}
          <div className="flex flex-col gap-1 mt-1">
            <Button>{schedule ? "Update" : "Submit"}</Button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default EditScheduleForm;
