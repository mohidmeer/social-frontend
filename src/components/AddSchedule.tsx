import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../components/ui/button";
import { apiService } from "../api/client";
import { toast } from "react-toastify";
import Modal from "./Modal";
// import { Facebook, Instagram } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import ScheduleTime from "./ScheduleTime";
import AddSocialAccounts from "./AddSocialAccounts";

type SocialAccount = {
    _id: string;
    name: string;
    platform:string;
    pages:any;
    avatar_url:string;
  };

  type page = {
    name: string,
    picture:any,
    id:string,
    access_token:any;
}

const AddScheduleForm = () => {

   

    const [accounts, setAccounts] = useState<SocialAccount[]>([])
    const [pages, setPages] = useState<page[]>([])

    useEffect(() => {
        (async () => {
            apiService.getSocailAccounts()
                .then((accounts) => {
                    setAccounts(accounts);
                })
                .catch((err) => {
                    console.error('Failed to fetch social accounts:', err);
                });
        })();
    }, []);



    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm({
        defaultValues: {
            title: "",
            instructions: "",
            social_account_id: "",
            platform: "",
            page_id: "",
            page_name: "",
            page_access_token: "",
            page_avatar: "",
            schedule: ""
        },
    });

    const [loading, setLoading] = useState(false);

    const onSubmit = async (data: any) => {

        const tid = toast.loading("Saving ....")
        console.log(data);

            setLoading(true);

            try {
                const response = await apiService.AddSchedule(data);

                if (response.success) {
                    toast.update(tid, { render: "Added Schedule successfully", type: "success", isLoading: false, autoClose: 1000 });
                    document.getElementById('close-dialog')?.click();
                    window.location.reload();

                } else {
                    throw new Error("Failed to add schedule.");
                }
            } catch (error: any) {
                toast.update(tid, { render: "Error occured while saving schedule", type: "error", isLoading: false, autoClose: 1000 });

            } finally {
                setLoading(false);
            }
    }


    const platform = watch('platform')



    return (
        <form
            className="flex-1 flex flex-col justify-center items-center overflow-auto"
            onSubmit={handleSubmit(onSubmit)}
        >

            <div className="p-1 flex flex-col gap-2 max-w-[600px] mx-auto w-full max-h-screen overflow-auto">
                <div className="flex flex-col gap-4">
                    {/* Title */}
                    <div className="flex flex-col gap-1 w-full">
                        <label className="text-xs font-semibold">Title</label>
                        <input
                            className={`input w-full input-sm `}
                            type="text"
                            placeholder="Schedule Title (for your reference)"
                            data-error={errors.title && true}
                            {...register("title", { required: "Title is required" })}
                        />
                        {errors.title && (
                            <p className="text-xs mt-1 font-semibold text-red-500">
                                {errors.title.message as string}
                            </p>
                        )}
                    </div>

                    {/* Instructions */}
                    <div className="flex flex-col gap-1 w-full">
                        <label className="text-xs font-semibold">Instructions</label>
                        <textarea
                            className={`input w-full input-sm `}
                            placeholder="e.g. Write in a friendly, beginner-friendly tone. Keep it informative and engaging. Use simple language and real-life examples where possible."
                            data-error={errors.instructions && true}
                            cols={2}
                            {...register("instructions", { required: "Instructions are required" })}
                        />
                        {errors.instructions && (
                            <p className="text-xs mt-1 font-semibold text-red-500">
                                {errors.instructions.message as string}
                            </p>
                        )}
                    </div>




                    <div className="flex gap-2 flex-col sm:flex-row justify-center  items-center ">
                        <div className="flex flex-col gap-1 w-full">
                            <label className="text-xs font-semibold">Socail Account</label>
                            <div className="flex gap-2 flex-col sm:flex-row justify-center  items-center">
                                <Select
                                    onValueChange={(value) => {
                                        setValue("social_account_id", accounts[Number(value)]._id);
                                        setValue('platform', accounts[Number(value)].platform);
                                        setPages(accounts[Number(value)].pages)

                                    }}
                                >
                                    <SelectTrigger className="w-full input-sm" data-error={errors.social_account_id && true}>
                                        <SelectValue placeholder={'Select Socail Account'} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {
                                            accounts.length > 0 && accounts.map((i, z) => (
                                                <SelectItem className="flex  items-center gap-4  border" key={i._id} value={z.toString()}>
                                                    <div className="flex gap-2 items-center">
                                                    <img src={i.avatar_url} className="size-6 rounded-full" />
                                                    {i.name}
                                                    </div>
                                                    <span className="font-bold text-xs text-gray-600">{i.platform}</span>
                                                </SelectItem>
                                            ))
                                        }



                                    </SelectContent>
                                </Select>
                                <input type="hidden" {...register("social_account_id", { required: "Social Account Required" })} />


                                <Modal id="das" title={"Select socail media platform"} content={<AddSocialAccounts />}>
                                    <Button type="button">
                                        Link Social Accounts
                                    </Button>
                                </Modal>
                            </div>
                            {errors.social_account_id && (
                                <p className="text-xs mt-1 font-semibold text-red-500">
                                    {errors.social_account_id.message as string}
                                </p>
                            )}
                        </div>
                    </div>


                    {/* ONLY FOR FACEWBOOK ACCOUNTS */}
                    {
                        platform == 'facebook' &&
                        <div className="flex gap-2 flex-col">
                            <label className="text-xs font-semibold">Pages</label>
                            <Select onValueChange={(value) => {
                                setValue("page_id", pages[Number(value)].id);
                                setValue("page_name", pages[Number(value)].name);
                                setValue("page_access_token", pages[Number(value)].access_token)
                                setValue('page_avatar', pages[Number(value)].picture.data.url)
                            }}>
                                <SelectTrigger className="w-full input-sm" data-error={errors.page_id && true}>
                                    <SelectValue placeholder={'Select connected pages'} />
                                </SelectTrigger>
                                <SelectContent>
                                    {pages.map((i, z) => (
                                        <SelectItem className="flex gap-2 items-center" key={z} value={z.toString()}>
                                            <img src={i.picture.data.url} className="size-6 rounded-full" />
                                            {i.name}
                                        </SelectItem>
                                    ))
                                    }
                                </SelectContent>
                            </Select>
                            <input type="hidden" {...register("page_id", { required: "Page is Required" })} />

                            {errors.page_id && (
                                <p className="text-xs mt-1 font-semibold text-red-500">
                                    {errors.page_id.message as string}
                                </p>
                            )}
                        </div>
                    }


                    <ScheduleTime initialDays={95} initialTime=""  onUpdate={(v:any) => {
                        setValue('schedule', v)   
                    }} />
                    <input type="hidden" {...register("schedule", { required: "Please choose both the schedule days and time to proceed." })} />
                    {errors.schedule && (
                        <p className="text-xs mt-1 font-semibold text-red-500">
                            {errors.schedule.message as string}
                        </p>
                    )}

                    {/* Submit Button */}
                    <div className="flex flex-col gap-1 mt-4">
                        <Button disabled={loading}>
                            {loading ? "Adding..." : "Submit"}
                        </Button>
                    </div>
                </div>
            </div>
        </form >
    );
};

export default AddScheduleForm;


