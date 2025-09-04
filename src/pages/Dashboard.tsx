import TopBar from "../components/TopBar";
import Modal from "../components/Modal";
import SocialMediaAccounts from "../components/SocialMediaAccounts";
import AddScheduleForm from "../components/AddSchedule";
import { useEffect, useState } from "react";
import { apiService } from "../api/client";
import { DashboardStats, HistoryItem, SocialAccount, Schedule } from "../types";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../components/ui/table"
import { getPlatformLogo, utcToLocalTime } from "../lib/utils";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "../components/ui/hover-card";
import { Button } from "../components/ui/button";
import { Edit, LinkIcon, Trash } from "lucide-react";
import { DeleteSchedule, PauseSchedule, RunSchedule } from "../components/Schedules";
import EditScheduleForm from "../components/EditSchedule";
import { Link } from "react-router-dom";
import moment from "moment";

const Dashboard = () => {

    const [stats, setStats] = useState<DashboardStats>({
        totalSchedules: 0,
        activeSchedules: 0,
        pausedSchedules: 0,
        totalPosts: 0,
        failedPosts: 0,
        connectedAccounts: 0,
    })

    const [accounts, setAccounts] = useState<SocialAccount[]>([])
    const [history, setHistory] = useState<HistoryItem[]>([])
    const [schedules, setSchedules] = useState<Schedule[]>([])

    useEffect(() => {
        (async () => {
            try {
                const data = await apiService.getDashboardStats()
                setStats(data.stats)
                setAccounts(data.connected_accounts)
                setHistory(data.history)
                setSchedules(data.schedules)
            } catch {
                console.error("Failed to fetch dashboard stats:")
            }
        })()
    }, [])


    async function removeHistoryItem(id: string) {
        try {
            await apiService.DeleteHistory(id);
            setHistory((prev) => prev.filter((item) => item._id !== id));
        } catch (error) {
            console.error("Failed to delete history item:", error);
        }
    }

    return (
        <>
            <TopBar pageName={'Dashboard'} />
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 mt-10 cursor-pointer">
                <div className="bg-primary text-white p-6 rounded-lg text-center">
                    <p className="text-2xl font-bold">{stats.totalSchedules || 0}</p>
                    <p className="text-sm font-semibold">Total Schedules</p>
                </div>
                <div className="bg-primary text-white p-6 rounded-lg text-center">
                    <p className="text-2xl font-bold">{stats.activeSchedules || 0}</p>
                    <p className="text-sm font-semibold">Active Schedules</p>
                </div>
                <div className="bg-primary text-white p-6 rounded-lg text-center">
                    <p className="text-2xl font-bold">{stats.pausedSchedules || 0}</p>
                    <p className="text-sm font-semibold">Paused Schedules</p>
                </div>
                <div className="bg-primary text-white p-6 rounded-lg text-center">
                    <p className="text-2xl font-bold">{stats.totalPosts || 0}</p>
                    <p className="text-sm font-semibold">Total Posts</p>
                </div>
                <div className="bg-primary text-white p-6 rounded-lg text-center">
                    <p className="text-2xl font-bold">{stats.failedPosts || 0}</p>
                    <p className="text-sm font-semibold">Failed Posts</p>
                </div>
                <div className="bg-primary text-white p-6 rounded-lg text-center ">
                    <p className="text-2xl font-bold">{stats.connectedAccounts || 0}</p>
                    <p className="text-sm font-semibold">Connected Accounts</p>
                </div>
            </div>
            <hr className="my-8" />
            <div className="grid grid-cols-12 gap-8">

                <div className="col-span-full lg:col-span-6 border-2 border-dashed p-4 rounded-lg">
                    <div className="">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold">Recent Posts</h3>
                        </div>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Account</TableHead>
                                    <TableHead>Time </TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {history.map((item) => (
                                    <TableRow key={item._id}>
                                        <TableCell className='flex gap-1 min-w-[180px] items-center'>
                                            <img src={item.social_account_id.avatar_url} className='size-8 rounded-full ' />
                                            <div>
                                                <p className='font-bold'>
                                                    {item.social_account_id.name}
                                                </p>
                                                <div className='capitalize font-semibold flex items-center gap-1'>
                                                    <img src={getPlatformLogo(item.platform)} className='size-4' />
                                                    <span>{item.platform}</span>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>{moment(new Date(item.createdAt)).local().fromNow()}</TableCell>
                                        <TableCell>
                                            <HoverCard openDelay={100}>
                                                <HoverCardTrigger asChild className='max-w-[600px]'>
                                                    <div className="inline-flex items-center gap-1 cursor-pointer">
                                                        <span className={`size-3 rounded-full ${item.status.type === 'failed' ? 'bg-red-700' : 'bg-green-700'}`}></span>
                                                        <p className="text-sm font-semibold text-black">
                                                            {item.status.type === 'failed' ? 'Error' : 'Success'}
                                                        </p>
                                                    </div>
                                                </HoverCardTrigger>

                                                <HoverCardContent className="flex flex-col gap-2 w-fit whitespace-normal break-words z-50 bg-white shadow-md rounded-lg p-3 max-w-sm">
                                                    <p className="text-gray-800 font-semibold  whitespace-pre-line">
                                                        {item.status.message}
                                                    </p>
                                                </HoverCardContent>
                                            </HoverCard>

                                        </TableCell>
                                        <TableCell>
                                            <div className='flex gap-2 items-center'>
                                                <Button variant={'outline'} size={'sm'} className='cursor-pointer' disabled={!item.post_url} onClick={() => window.open(item.post_url, '_blank')} >
                                                    <LinkIcon />
                                                </Button>

                                                <Button variant={'outline'} size={'sm'} className='cursor-pointer' onClick={() => { removeHistoryItem(item._id) }} >
                                                    <Trash className='text-destructive' />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        {
                            history.length == 0 ?
                                <div className="col-span-full flex items-center justify-center mt-5 text-sm font-semibold">
                                    <p className="text-center text-primary/60"> No Recent Posts</p>
                                </div>
                                :
                                <div className="flex justify-center">
                                    <Link to={'/dashboard/history'} className="text-xs font-semibold underline">View all</Link>
                                </div>
                        }
                    </div>
                </div>

                <div className="col-span-full lg:col-span-6 border-2 border-dashed p-4 rounded-lg">
                    <div className="">
                        <h3 className="text-lg font-semibold">Active Schedules</h3>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Account</TableHead>
                                    <TableHead>Title</TableHead>
                                    <TableHead>Schedule Time</TableHead>
                                    <TableHead className='text-center'>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {schedules.map((item) => (
                                    <TableRow key={item._id}>
                                        <TableCell className='flex gap-1 min-w-[180px] items-center'>
                                            {(() => {
                                                switch (item.platform) {
                                                    case 'facebook':
                                                        return (
                                                            <div className="flex items-center gap-2">
                                                                <img src={item.page?.picture} className="size-8 rounded-full" />
                                                                <div>
                                                                    <p className="font-bold text-sm">{item.page?.name}</p>
                                                                    <div className="flex gap-1 items-center">
                                                                        <img src={getPlatformLogo(item.platform)} className="size-4 rounded-full" />
                                                                        <p className="capitalize font-semibold">{item.platform}</p>
                                                                    </div>
                                                                </div>
                                                            </div>)
                                                    case 'instagram':
                                                        return (
                                                            <div className="flex items-center gap-2">
                                                                <img src={(item.social_account_id as SocialAccount).avatar_url}className="size-8 rounded-full" />
                                                                <div>
                                                                    <p className="font-bold text-sm">{(item.social_account_id as SocialAccount).name}</p>
                                                                    <div className="flex gap-1 items-center">
                                                                        <img src={getPlatformLogo(item.platform)} className="size-4 " />
                                                                        <p className="capitalize font-semibold">{item.platform}</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )
                                                        
                                                    case 'x':
                                                        return (
                                                            <div className="flex items-center gap-2">
                                                                <img src={(item.social_account_id as SocialAccount).avatar_url}className="size-8 rounded-full" />
                                                                <div>
                                                                    <p className="font-bold text-sm">{(item.social_account_id as SocialAccount).name}</p>
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

                                        <TableCell>{item.title}</TableCell>
                                        <TableCell>{
                                            utcToLocalTime(item.schedule.split(',')[1])
                                        }</TableCell>

                                        <TableCell>
                                            <div className="flex gap-2">
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
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>

                        {
                            schedules.length == 0 ?
                                <div className="col-span-full flex items-center justify-center mt-5 text-sm font-semibold">
                                    <Modal id="schedule-id" title="Add Social Accounts" content={<AddScheduleForm />}>
                                        <p className="text-center text-primary/60"> No Active Schedule <br /> <span className="text-xs underline"> Create One </span>  </p>
                                    </Modal>
                                </div>
                                :
                                <div className="flex justify-center">
                                    <Link to={'/dashboard/schedules'} className="text-xs font-semibold underline">View all</Link>
                                </div>
                        }
                    </div>
                </div>

                <div className="col-span-full lg:col-span-6 border-2 border-dashed p-4 rounded-lg">
                    <div className="">
                        <h3 className="text-lg font-semibold">Connected Accounts</h3>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Account</TableHead>
                                    <TableHead>Posts Created</TableHead>
                                    <TableHead>Linked Schedules</TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {accounts.map((i) => (
                                    <TableRow key={i._id} >
                                        <TableCell className='flex gap-1 min-w-[180px] items-center'>
                                            <img src={i.avatar_url} className='size-8 rounded-full ' />
                                            <div>
                                                <p className='font-bold'>
                                                    {i.name}
                                                </p>
                                                <p className='capitalize font-semibold flex items-center gap-1'>
                                                    <img src={getPlatformLogo(i.platform)} className='size-4 ' />
                                                    <span>{i.platform}</span>
                                                </p>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            {i.posts_made}
                                        </TableCell>
                                        <TableCell>
                                            {i.linked_schedules}
                                        </TableCell>
                                        <TableCell>
                                            <DeleteAccount setAccounts={setAccounts} id={i._id} title={i.name} />
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        {
                            accounts.length == 0 ?
                                <div className="col-span-full flex items-center justify-center mt-5 text-sm font-semibold">
                                    <Modal width="max-w-2xl" id="schedule-id" title="Add Social Accounts" content={<SocialMediaAccounts />}>
                                        <p className="text-center text-primary/60"> No Account Connected <br /> <span className="text-xs underline"> Connect One </span>  </p>
                                    </Modal>
                                </div>
                                :
                                <div className="flex justify-center">
                                    <Link to={'/dashboard/accounts'} className="text-xs font-semibold underline">View all</Link>
                                </div>
                        }
                    </div>
                </div>

            </div>
        </>
    )
}


function DeleteAccount({ title, id, setAccounts }: { title: string, id: string, setAccounts: any }) {
    async function del() {
        try {
            const response = await apiService.DeleteSocialAccount(id);
            if (response) {
                setAccounts((prevSchedules: any) =>
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
            id="delete"
            title={title}
            content={
                <>
                    <p className="text-sm text-muted-foreground font-semibold whitespace-normal">Are you sure you want to delete this account all the connected schedules will be removed as well ?</p>
                    <Button variant={'destructive'} onClick={() => { del() }}>
                        Delete Account
                    </Button>
                </>
            }>
            <Button variant={'outline'}>
                <Trash size={20} className="text-destructive cursor-pointer" />
            </Button>
        </Modal>
    )
}


export default Dashboard


