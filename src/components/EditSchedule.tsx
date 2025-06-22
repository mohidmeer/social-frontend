import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { Button } from "../components/ui/button";
import { apiService } from "../api/client";
import ScheduleTime from "./ScheduleTime";
import { utcToLocalTime24HoursFormat } from "../lib/utils";
import { toast } from "sonner";

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

  const onSubmit = (data: any) => {
    toast.promise(
      apiService.UpdateSchedule(schedule._id, data).then(res => {
        if (res.success) {
          document.getElementById('update')?.click();
          window.location.reload();
        } else {
          throw new Error("Failed to update schedule.");
        }
      }),
      {
        loading: 'Updating...',
        success: 'Schedule updated successfully!',
        error: 'Failed to update schedule.',
      }
    );
  };

  const schedulev = getValues("schedule");

  const [initialDays, setInitialDays] = useState<number | null>(null);
  const [initialTime, setInitialTime] = useState<string | null>(null);


  useEffect(() => {
    if (schedule) {
      reset(schedule);

      const [days, time] = schedule.schedule?.split(",") || [];
      setInitialDays(Number(days));
      setInitialTime(utcToLocalTime24HoursFormat(time));
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

          {/* Caption Instructions */}
          <div className="flex flex-col gap-1 w-full">
            <label className="text-xs font-semibold">Caption Instructions</label>
            <textarea
              className={`input w-full input-sm `}
              placeholder="e.g. Write in a friendly, beginner-friendly tone. Keep it informative and engaging. Use simple language and real-life examples where possible."
              data-error={errors.caption_instructions && true}
              cols={2}
              {...register("caption_instructions", { required: "Caption instructions are required" })}
            />
            {errors.caption_instructions && (
              <p className="text-xs mt-1 font-semibold text-red-500">
                {errors.caption_instructions.message as string}
              </p>
            )}
          </div>

          {/* Image Instructions */}
          <div className="flex flex-col gap-1 w-full">
            <label className="text-xs font-semibold">Image Instructions</label>
            <textarea
              className={`input w-full input-sm `}
              placeholder="e.g. Write in a friendly, beginner-friendly tone. Keep it informative and engaging. Use simple language and real-life examples where possible."
              data-error={errors.image_instructions && true}
              cols={2}
              {...register("image_instructions", { required: "Image instructions are required" })}
            />
            {errors.image_instructions && (
              <p className="text-xs mt-1 font-semibold text-red-500">
                {errors.image_instructions.message as string}
              </p>
            )}
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
