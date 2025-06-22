import { useEffect, useState } from "react"
import { apiService } from "../api/client"
import TopBar from "../components/TopBar"
import { Button } from "../components/ui/button"
import { Search, Trash } from "lucide-react"
import { Input } from "../components/ui/input"

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../components/ui/table"
import { SocialAccount } from "../types"
import Modal from "../components/Modal"
import SocialMediaAccounts from "../components/SocialMediaAccounts"
import { getPlatformLogo } from "../lib/utils"

const Accounts = () => {

    const [accounts, setAccounts] = useState<SocialAccount[]>([])
    const [filteredAccounts, setFilteredAccounts] = useState<SocialAccount[]>([])
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        (async () => {
            apiService.getSocailAccounts()
                .then((accounts) => {
                    setAccounts(accounts);
                    setLoading(false);
                })
                .catch((err) => {
                    console.error('Failed to fetch social accounts:', err);
                });
        })();
    }, []);

    useEffect(() => {
        const filtered = accounts.filter((account) =>
            account.name?.toLowerCase().includes(search.toLowerCase())
        );
        setFilteredAccounts(filtered);
    }, [search, accounts]);


    const removeAccount = async (id: string) => {
        await apiService.DeleteSocialAccount(id)
        window.location.reload()
    }
    return (
        <>
            <TopBar pageName="Social Account Management" />
            <div className="flex py-4 mt-10 mb-5 gap-5 items-center justify-start">
                <div className="flex flex-col gap-2  p-2 w-[300px] relative">
                    <Search className="w-5 h-5 absolute mt-2 ml-2" />
                    <Input value={search}
                        placeholder="Search accounts..."
                        className="pl-8"
                        onChange={(e) => setSearch(e.target.value)} type="text" />
                </div>
                <Modal width="max-w-2xl" id="das" title={"Select social media platform"} content={<SocialMediaAccounts />}>
                    <Button type="button">
                        Link Social Media Accounts
                    </Button>
                </Modal>

            </div>

            <Table>
                <TableCaption className='text-xl'> {accounts.length == 0 && loading == false ? 'No Accounts Connected' : 'Connected Accounts' }</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Account Name</TableHead>
                        <TableHead>Posts Created</TableHead>
                        <TableHead>Linked Schedules</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredAccounts.length > 0 && filteredAccounts.map((i) => (
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
                                <Button  variant={'destructive'} className="cursor-pointer" onClick={() => removeAccount(i._id)}>
                                    <Trash /> Remove Account
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                    
                    {
                        loading &&
                        <TableRow >
                            <TableCell colSpan={6} className=' text-lg text-center font-semibold'>
                                <div role="status" className="flex justify-center items-center w-full overflow-hidden">
                                    <svg aria-hidden="true" className="size-20  text-gray-200 animate-spin  fill-primary" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                    </svg>
                                    <span className="sr-only">Loading...</span>
                                </div>
                            </TableCell>
                        </TableRow>
                    }
                </TableBody>
            </Table>









        </>
    )
}

export default Accounts

