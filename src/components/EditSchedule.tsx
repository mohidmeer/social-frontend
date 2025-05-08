import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { Button } from "../components/ui/button";
import { apiService } from "../api/client";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";
import { toast } from "react-toastify";
import { Eye, EyeOff } from "lucide-react";

const EditScheduleForm = ({ schedule }: { schedule?: any }) => {


  const [type, setType] = useState('password')
  const {
    register,
    handleSubmit,
    reset,
    setValue,
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

     
       

          {/* Schedule */}
          <div className="flex flex-col gap-1 w-full">
            <label className="text-xs font-semibold">Schedule</label>
            <select className="input w-full input-sm" {...register("schedule")}>
              {
                import.meta.env.VITE_ENV == 'dev' &&
                <option value="minute">Minute</option>
              }
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
            </select>
          </div>

       

  

       

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
