import { useEffect, useState } from "react";
import { Schedule } from "../types";
import { apiService } from "../api/client";
import AddScheduleForm from "./AddSchedule";
import Modal from "./Modal";
import { Button } from "./ui/button";
import { Edit, Pause, Play, Trash,  } from "lucide-react";
import { getPlatformLogo, utcToLocalTime, utcToLocalTime24HoursFormat } from "../lib/utils";
import EditScheduleForm from "./EditSchedule";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";
import moment from "moment";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "./ui/table"
import { toast } from "sonner";



const Schedules = () => {
    const [schedules, setSchedules] = useState<Schedule[]>([]);
    const [refresh, setRefresh] = useState(true)
    const [loadingSchedules, setLoadingSchedules] = useState(true);
    const [scheduleError, setScheduleError] = useState<string | null>(null);
    const fetchSchedules = async () => {
        try {
            const data = await apiService.GetAllSchedules();
            setSchedules(data.schedules);
        } catch (error: any) {
            setScheduleError(error.message || "An error occurred while fetching schedules.");
        } finally {
            setLoadingSchedules(false);
        }
    };
    useEffect(() => {    
        fetchSchedules();
    }, [refresh]);

    if (loadingSchedules) return (
        <div role="status" className="flex justify-center items-center w-full">
            <svg aria-hidden="true" className="size-36  text-gray-200 animate-spin  fill-primary" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
            </svg>
            <span className="sr-only">Loading...</span>
        </div>
    );
    if (scheduleError) return <p className="text-red-500">{scheduleError}</p>;
    return (

        <>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Account</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Caption Instructions</TableHead>
                        <TableHead>Image Instructions</TableHead>
                        <TableHead>Schedule Time </TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className='text-right mr-10'>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {schedules.map((item) => (

                        <ScheduleItemTable key={item._id} item={item}  setSchedules={setSchedules} setRefresh={setRefresh} />
                    ))}
                </TableBody>
            </Table>


            {
                !loadingSchedules && schedules.length === 0 &&
                <div className="col-span-full flex items-center justify-center font-semibold   rounded-md h-[80px]  p-4 ">
                    <div className="p-8 text-xl">
                        <Modal id="schedule-id" title="Add Post Schedule" content={<AddScheduleForm />}>
                            <div className="text-center  flex flex-col gap-2">
                                <p> <span className="text-center font-medium ">No schedules found </span> <br /> </p>
                                <Button className="">Create one</Button>
                            </div>
                        </Modal>

                    </div>
                </div>
            }


        </>
    )
}
export default Schedules

export function PauseSchedule({ title, id, setSchedules }: { title: string, id: string, setSchedules: any }) {
    async function pause() {
        try {
            const response = await apiService.StopSchedule(id);
            console.log(response);
            if (response.success) {
                setSchedules((prevSchedules: any) =>
                    prevSchedules.map((schedule: any) =>
                        schedule._id === id ? { ...schedule, active: false } : schedule
                    )
                );
            } else {


            }
        } catch (error: any) {
            console.error(error);

        }
    }
    return (
        <Modal
            id="pause"
            title={title}
            content={
                <>
                    <p className="text-sm text-muted-foreground font-semibold whitespace-normal">Are you sure you want to pause this schedule ?</p>

                    <Button variant={'outline'} className="bg-amber-300 hover:bg-amber-400" onClick={() => { pause() }}>
                        Pause Schedule
                    </Button>
                </>
            }>
            <Button variant={'outline'}>
                <Pause size={20} className="text-amber-400 cursor-pointer" />
            </Button>

        </Modal>
    )
}
export function RunSchedule({ id, setSchedules, message }: { id: string, setSchedules: any, message: string | null; }) {
    async function run() {
        try {
            const response = await apiService.RunSchedule(id);

            if (response.success) {
                setSchedules((prevSchedules: any) =>
                    prevSchedules.map((schedule: any) =>
                        schedule._id === id ? {
                            ...schedule, active: true, last_run: {
                                ...schedule.last_run,
                                status: true
                            }
                        } : schedule
                    )
                );
            } else {
                throw new Error("Failed to stop schedule.");
            }
        } catch (error: any) {
            console.error(error);

        }
    }
    return (
        <Modal
            id="run"
            title={'Are you sure you want to run this schedule ?'}
            content={
                <>
                    <p className="text-sm font-semibold whitespace-normal ">{message}</p>
                    <Button onClick={() => { run() }}>
                        Start Schedule
                    </Button>
                </>
            }>
            <Button variant={'outline'}>
                <Play size={20} className="text-green-600 cursor-pointer" />
            </Button>

        </Modal>
    )
}
export function DeleteSchedule({ title, id, setSchedules }: { title: string, id: string, setSchedules: any }) {
    async function del() {
        try {
            const response = await apiService.DeleteSchedule(id);
            console.log(response);
            if (response.success) {
                setSchedules((prevSchedules: any) =>
                    prevSchedules.filter((schedule: any) => schedule._id !== id)
                );
            } else {
                throw new Error("Failed to stop schedule.");
            }
        } catch (error: any) {
            console.error(error);

        }
    }
    return (
        <Modal
            id="run"
            title={title}
            content={
                <>
                    <p className="text-sm text-muted-foreground font-semibold whitespace-normal">Are you sure you want to run this schedule ?</p>

                    <Button variant={'destructive'} onClick={() => { del() }}>
                        Delete Schedule
                    </Button>
                </>
            }>
            <Button variant={'outline'}>
                <Trash size={20} className="text-destructive cursor-pointer" />
            </Button>

        </Modal>
    )
}



function buildDateTime(timeStr: string) {
    const [hours, minutes] = timeStr.split(':');
    const now = new Date();
    const dateTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), Number(hours), Number(minutes));
    return dateTime;
}





function ScheduleItemTable({ item, setSchedules, setRefresh }: { item: any, setSchedules:any , setRefresh: any }) {

    const [animate, setAnimate] = useState(false);
    useEffect(()=>{},[animate])
    useEffect(() => {
        const timeStr = utcToLocalTime24HoursFormat(item.schedule.split(',')[1]);
        const timeOfSchedule = buildDateTime(timeStr);
        const now = new Date();
        const delay = timeOfSchedule.getTime() - now.getTime();

        let timeout1: any, timeout2: any;

        if (delay > 0) {
            timeout1 = setTimeout(() => {
                console.log('⏱️ Timeout 1 triggered');
                setAnimate(true)
            }, delay);
        }

        if (delay + 1500 > 0) {
            timeout2 = setTimeout(() => {
                console.log('🔄 Timeout 2 triggered — reloading');
                setRefresh((prev:boolean)=>(!prev));
                setAnimate(false);
            }, delay + 15000);
        }

        return () => {
            clearTimeout(timeout1);
            clearTimeout(timeout2);
        };

    }, [item]);


    animate && toast.loading(
    <div className="flex flex-col gap-1">
       <p>Executing Schedule</p>
       <p>{item.title}</p> 
    </div>
    )

    return (
        <TableRow >
            <TableCell className='flex gap-2 items-center align-middle relative overflow-hidden '>
                {
                    animate &&
                    <div role="status" className="flex justify-center items-center absolute left-1 top-2">
                        <svg aria-hidden="true" className="size-12  text-gray-200 animate-spin  fill-primary" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                        </svg>
                        <span className="sr-only">Loading...</span>
                    </div>
                }
                {(() => {
                    switch (item.platform) {
                        case 'facebook':
                            return (
                                <div className="flex items-center gap-2">
                                    <img src={item.page.picture} className="size-10 rounded-full" />
                                    <div>
                                        <p className="font-bold text-sm">{item.page.name}</p>
                                        <div className="flex gap-1 items-center">
                                            <img src={getPlatformLogo(item.platform)} className="size-4 rounded-full" />
                                            <p className="capitalize font-semibold">{item.platform}</p>
                                        </div>
                                    </div>
                                </div>)
                        case 'instagram':
                            return (
                                <div className="flex items-center gap-2">
                                    <img src={item.social_account_id.avatar_url} className="size-10 rounded-full" />
                                    <div>
                                        <p className="font-bold text-sm">{item.social_account_id.name}</p>
                                        <div className="flex gap-1 items-center">
                                            <img src={getPlatformLogo(item.platform)} className="size-4 " />
                                            <p className="capitalize font-semibold">{item.platform}</p>
                                        </div>
                                    </div>
                                </div>
                            )
                        default:
                            return <span>Unknown Platform</span>;
                    }
                })()}
            </TableCell>
            <TableCell>
                {item.title}
            </TableCell>
            <TableCell className='whitespace-normal break-words max-w-sm'>
                <p className="line-clamp-2">{item.caption_instructions}</p>
            </TableCell>
            <TableCell className='whitespace-normal break-words max-w-sm'>
                <p className="line-clamp-2">{item.image_instructions}</p>
            </TableCell>
            <TableCell>
                {utcToLocalTime(item.schedule.split(',')[1])}
            </TableCell>
            <TableCell>
                <HoverCard openDelay={100} >
                    <HoverCardTrigger>
                        {
                            item.last_run.error ?
                                <div className="flex items-center gap-1">
                                    <span className="size-3 bg-red-700 rounded-full"></span>
                                    <p className="text-sm font-bold text-black">Error</p>
                                </div>
                                :
                                <div className="flex gap-2 items-center">
                                    <span className={`${item.active ? "bg-green-600" : "bg-yellow-500"} size-3 rounded-full`}></span>
                                    <p className="text-sm font-bold text-black">{item.active ? "Active" : "Paused"}</p>
                                </div>
                        }
                    </HoverCardTrigger>
                    {
                        item.last_run.time &&
                        (
                            <HoverCardContent className="w-[400px] flex flex-col gap-2 font-normal  whitespace-normal break-words z-50 bg-white shadow-md rounded-lg p-3 max-w-sm">
                                <p className="text-gray-800 font-semibold ">
                                    Last run <span className=""> {moment(item.last_run.time).fromNow()} </span>
                                </p>
                                <p className=" font-semibold items-center">{item.last_run.message}

                                    {
                                        item.last_run.post_url && <button onClick={() => window.open(item.last_run.post_url, '_blank')}
                                            className="w-fit text-xs ml-2  font-bold inline-flex items-center gap-1 bg-primary text-primary-foreground px-2 py-1 rounded-md" > View Post </button>
                                    }
                                </p>
                            </HoverCardContent>
                        )
                    }
                </HoverCard>
            </TableCell>
            <TableCell className='flex items-center gap-2 justify-end'>
                <Modal id="update" title="Update Schedule" content={<EditScheduleForm schedule={item} />}>
                    <Button variant={'outline'} className="cursor-pointer">
                        <Edit size={20} />
                    </Button>
                </Modal>
                {
                    item.active ?
                        <PauseSchedule id={item._id} title={item.title} setSchedules={setSchedules} /> :
                        <RunSchedule message={item.last_run.message} id={item._id} setSchedules={setSchedules} />
                }
                <DeleteSchedule id={item._id} title={item.title} setSchedules={setSchedules} />

            </TableCell>
        </TableRow>

    )
}
