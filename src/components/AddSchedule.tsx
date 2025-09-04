import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button } from "../components/ui/button";
import { apiService } from "../api/client";
import Modal from "./Modal";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import ScheduleTime from "./ScheduleTime";
import { SocialAccount } from "../types";
import SocialMediaAccounts from "./SocialMediaAccounts";
import { toast } from "sonner";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";


type page = {
    name: string,
    picture: any,
    id: string,
    access_token: any;
}

const AddScheduleForm = () => {



    const [accounts, setAccounts] = useState<SocialAccount[]>([])
    const [pages, setPages] = useState<page[]>([])

    useEffect(() => {
        (async () => {
            apiService.getSocailAccounts()
                .then((accounts) => {
                    setAccounts(accounts);
                    console.log(accounts);
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
        control,
        formState: { errors },
    } = useForm({
        defaultValues: {
            title: "",
            caption_instructions: "",
            generate_image: true,
            ai_image: true,
            image_instructions: "",
            social_account_id: "",
            platform: "",
            page_id: "",
            page_name: "",
            page_access_token: "",
            page_avatar: "",
            schedule: "",

        },
    });

    const [loading, setLoading] = useState(false);


    const onSubmit = async (data: any) => {
        setLoading(true);

        toast.promise(
            apiService.AddSchedule(data).then(() => {
                document.getElementById('close-dialog')?.click();
                window.location.reload();
            }).finally(() => {
                setLoading(false);
            }),
            {
                loading: 'Saving...',
                success: 'Added schedule successfully!',
                error: 'Error occurred while saving schedule',
            }
        )
    };

    const platform = watch('platform')
    const generate_image = watch('generate_image')
    const ai_image = watch('ai_image')



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

                    {/* GENERATE IMAGE AS WELL */}
                    <div className="flex flex-col gap-1 w-full">
                        <Controller
                            key={'generate_image'}
                            name={'generate_image'}
                            control={control}
                            render={({ field: controllerField }) => (
                                <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                                    <div className="space-y-0.5">
                                        <Label className="font-semibold text-xs">Generate Image</Label>
                                        {/* <p className="text-xs font-semibold text-primary/70 ">Toggle this on to automatically generate an image based on your content instructions. Turn it off if you want to skip the image</p> */}
                                    </div>
                                    <Switch
                                        checked={controllerField.value}
                                        onCheckedChange={controllerField.onChange}
                                    />
                                </div>
                            )}
                        />
                    </div>

                    {/* AI GENERATED IMAGE OR CUSTOM IMAGE */}
                    {
                        generate_image &&
                        <div className="flex flex-col gap-1 w-full">
                            <Controller
                                key={'ai_image'}
                                name={'ai_image'}
                                control={control}
                                render={({ field: controllerField }) => (
                                    <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                                        <div className="space-y-0.5">
                                            <Label className="font-semibold text-xs">AI Generated Image </Label>
                                            <p className="text-xs font-semibold text-primary/70 ">Use AI to auto-generate an image, or disable to write a custom prompt.</p>
                                        </div>
                                        <Switch
                                            checked={controllerField.value}
                                            onCheckedChange={controllerField.onChange}
                                        />
                                    </div>
                                )}
                            />
                        </div>
                    }

                    {/* Image Instructions are based on  generate image is true if not then we dont*/}
                    {
                        generate_image &&
                        !ai_image &&
                        <div className="flex flex-col gap-1 w-full">
                            <label className="text-xs font-semibold">Custom Image Prompt</label>
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



                    }






                    <div className="flex gap-2 flex-col sm:flex-row justify-center  items-center ">
                        <div className="flex flex-col gap-1 w-full">
                            <label className="text-xs font-semibold">Social Account</label>
                            <div className="flex gap-2 flex-col sm:flex-row justify-center  items-center">
                                <Select
                                    onValueChange={(value) => {
                                        setValue("social_account_id", accounts[Number(value)]._id);
                                        setValue('platform', accounts[Number(value)].platform);
                                        setPages(accounts[Number(value)].pages)

                                    }}
                                >
                                    <SelectTrigger className="w-full input-sm" data-error={errors.social_account_id && true}>
                                        <SelectValue placeholder={'Select Social Account'} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {
                                            accounts.length > 0 && accounts.map((i, z) => (
                                                <SelectItem className="flex  items-center gap-4  border" key={i._id} value={z.toString()}>
                                                    <div className="flex gap-2 items-center">
                                                        <img src={i.avatar_url} className="size-6 rounded-full" />
                                                        {i.name}
                                                    </div>
                                                    <span className="font-bold text-xs text-gray-600 capitalize">{i.platform}</span>
                                                </SelectItem>
                                            ))
                                        }



                                    </SelectContent>
                                </Select>
                                <input type="hidden" {...register("social_account_id", { required: "Social Account Required" })} />


                                <Modal width="max-w-2xl" id="das" title={"Select social media platform"} content={<SocialMediaAccounts />}>
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

                    {/* FOR FACEBOOK ONLY */}
                    {platform === 'facebook' ? (
                        pages?.length === 0 ? (
                            <>
                                <div className="text-xs font-semibold text-destructive">
                                    No Facebook Pages found. Please re-authorize the app with proper Page permissions if you're missing pages.
                                </div>
                                <input type="hidden" {...register("page_id", { required: "Page is Required" })} />
                                {errors.page_id && (
                                    <p className="text-xs mt-1 font-semibold text-red-500">
                                        {errors.page_id.message as string}
                                    </p>
                                )}
                            </>
                        ) : (
                            <div className="flex gap-2 flex-col">
                                <label className="text-xs font-semibold">Pages</label>
                                <Select
                                    onValueChange={(value) => {
                                        setValue("page_id", pages[Number(value)].id);
                                        setValue("page_name", pages[Number(value)].name);
                                        setValue("page_access_token", pages[Number(value)].access_token);
                                        setValue("page_avatar", pages[Number(value)].picture.data.url);
                                    }}
                                >
                                    <SelectTrigger className="w-full input-sm" data-error={!!errors.page_id}>
                                        <SelectValue placeholder="Select connected pages" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {pages.map((page, index) => (
                                            <SelectItem key={index} value={index.toString()} className="flex gap-2 items-center">
                                                <img src={page.picture.data.url} className="size-6 rounded-full" alt={page.name} />
                                                {page.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>

                                <input type="hidden" {...register("page_id", { required: "Page is Required" })} />
                                {errors.page_id && (
                                    <p className="text-xs mt-1 font-semibold text-red-500">
                                        {errors.page_id.message as string}
                                    </p>
                                )}
                            </div>
                        )
                    ) : null}


                    <ScheduleTime initialDays={95} initialTime="" onUpdate={(v: any) => {
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


