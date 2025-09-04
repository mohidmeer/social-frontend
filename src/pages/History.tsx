import TopBar from '../components/TopBar'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../components/ui/table"


import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "../components/ui/select"
import { useEffect, useState } from 'react';
import { apiService } from '../api/client';
import { HistoryItem, Schedule, SocialAccount } from '../types';
import {  LinkIcon, Trash } from 'lucide-react';
import { Button } from '../components/ui/button';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '../components/ui/hover-card';
import { ImSortAmountAsc, ImSortAmountDesc } from "react-icons/im";
import { getPlatformLogo } from '../lib/utils';


const History = () => {


    const [historyData, setHistoryData] = useState<{
        history: HistoryItem[];
        schedules: Schedule[];
        accounts: SocialAccount[];
    }>({ history: [], schedules: [], accounts: [] });
    // const [ setLoading] = useState(true);

    const [filter, setFilter] = useState({
        accounts: 'all',
        schedules: 'all',
        sort: 'desc'
    })

    useEffect(() => {
        (async () => {
            apiService.getHistory(new URLSearchParams(filter).toString())
                .then((history) => {
                    console.log(history)
                    setHistoryData(history);
                    // setLoading(false);
                })
                .catch((err) => {
                    console.error('Failed to fetch social accounts:', err);
                    // setLoading(false)
                });
        })();
    }, [filter]);


    async function removeHistoryItem(id: string) {
        apiService.DeleteHistory(id).then(() => {
            setHistoryData((prev) => ({
                ...prev,
                history: prev.history.filter((item) => item._id !== id)
            }))
        })
    }



    return (
        <>
            <TopBar pageName="Posting History" />
            <div className='my-6 flex flex-wrap gap-10 mt-20 mb-10 '>
                <div className='font-semibold flex items-center gap-2 text-xs '>
                    Filter By Accounts
                    <Select defaultValue="all" onValueChange={(value: string) => setFilter((prev) => ({ ...prev, accounts: value }))}>
                        <SelectTrigger className="w-[250px] text-xs ">
                            <SelectValue placeholder="Select Accounts" />
                        </SelectTrigger>
                        <SelectContent >
                            <SelectGroup>
                                <SelectLabel>Accounts</SelectLabel>
                                <SelectItem value="all">All</SelectItem>
                                {
                                    historyData.accounts.map((i) => (
                                        <SelectItem key={i._id} value={i._id} className='flex items-center gap-1' >
                                            <img src={i.avatar_url} className='size-7 rounded-full ' />
                                            <div className='text-xs'>
                                                <p className=''>
                                                    {i.name}
                                                </p>
                                                <p className='capitalize font-semibold flex items-center gap-1 '>
                                                    <span>{i.platform}</span>
                                                </p>
                                            </div>
                                        </SelectItem>
                                    ))
                                }
                            </SelectGroup>
                        </SelectContent>
                    </Select>

                </div>
                <div className='font-semibold flex items-center gap-2 text-xs'>
                    Filter By Schedules
                    <Select defaultValue="all" onValueChange={(value: string) => setFilter((prev) => ({ ...prev, schedules: value }))}>
                        <SelectTrigger className="w-[250px] " >
                            <SelectValue placeholder="All" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Schedules</SelectLabel>
                                <SelectItem value="all">All</SelectItem>
                                {
                                    historyData.schedules.map((i) => (
                                        <SelectItem key={i._id} value={i._id} className=''>
                                            <p>{i.title}</p>
                                        </SelectItem>
                                    ))
                                }
                            </SelectGroup>
                        </SelectContent>
                    </Select>

                </div>
                <div className='font-semibold flex items-center gap-2 text-xs'>
                    Sort By
                    <Select defaultValue="desc" onValueChange={(value: string) => setFilter((prev) => ({ ...prev, sort: value }))}>
                        <SelectTrigger className="w-[150px]">
                            <SelectValue placeholder="All" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Sorting Order</SelectLabel>
                                <SelectItem value="asc"> <ImSortAmountAsc /> Ascending </SelectItem>
                                <SelectItem value="desc" >  <ImSortAmountDesc /> Descending</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>

            </div>
            <Table>
                <TableCaption>A list of your recent post history.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Account</TableHead>
                        <TableHead>Caption Instructions</TableHead>
                        <TableHead>Image Instructions</TableHead>
                        <TableHead>Generated Post</TableHead>
                        <TableHead>Time </TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {historyData.history.map((item) => (
                        <TableRow key={item._id}>
                            <TableCell className='flex gap-1 min-w-[180px] items-center'>

                                <img src={item.social_account_id.avatar_url} className='size-8 rounded-full ' />

                                <div>
                                    <p className='font-bold'>
                                        {item.social_account_id.name}
                                    </p>
                                    <p className='capitalize font-semibold flex items-center gap-1'>
                                        <img src={getPlatformLogo(item.platform)} className='size-4' />
                                        <span>{item.platform}</span>
                                    </p>
                                </div>

                            </TableCell>
                            <TableCell className='whitespace-normal break-words max-w-sm'>
                                <p> {item.caption_instructions}</p>
                            </TableCell>
                            <TableCell className='whitespace-normal break-words max-w-sm'>
                                <p className='line-clamp-2'> {item.image_instructions}</p>
                            </TableCell>
                            <TableCell className='whitespace-normal break-words  max-w-sm'>
                                <p className='line-clamp-2'>{item.generated_caption}</p>


                            </TableCell>
                            <TableCell>{new Date(item.createdAt).toLocaleString()}</TableCell>
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
                                        <p className="text-gray-800 font-semibold text-base whitespace-pre-line">
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


        </>
    )
}

export default History




