import { Facebook, Instagram } from 'lucide-react'
import { apiService } from '../api/client'

const AddSocialAccounts = () => {

    async function connectSocial(provider:string){
        const callback_url =  window.location.href
        const res  = await apiService.SocailConnect(provider,callback_url)
        window.location.href=res 
    }
  return (
    <div className="flex  gap-2 justify-center">
    <button type="button" className='border bg-primary text-primary-foreground flex flex-col gap-1 items-center justify-center cursor-pointer p-4 rounded-md hover:bg-primary/90' onClick={()=>{connectSocial('facebook')}} >
        <Facebook size={32} />
       <span className=''>Facebook</span>  
    </button>
    <button type="button" className='border bg-primary text-primary-foreground flex flex-col gap-1 items-center justify-center cursor-pointer p-4 rounded-md hover:bg-primary/90' onClick={()=>{connectSocial('instagram')}} >
        <Instagram size={32} />
       <span className=''>Instagram</span>  
    </button>


</div>
  )
}

export default AddSocialAccounts



