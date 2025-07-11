import { apiService } from "../api/client";
import { toast } from "sonner";

const SocialMediaAccounts = () => {
    function connectSocial(provider: string) {
        toast.promise(
            apiService.SocailConnect(provider, window.location.href).then(res => {
                window.location.href = res;
            }),
            {
                loading: `Connecting ${provider}...`,
                success: `Redirecting to ${provider}...`,
                error: 'Failed to initiate connection.',
            }
        );
    }

    return (
        <div className="flex flex-col gap-4">

            <div className="grid-cols-4 grid gap-4 items-center justify-center p-4">
                <button className="p-4 flex items-center flex-col gap-2 cursor-pointer border-dashed border-2 rounded-md group w-full h-full" onClick={() => { connectSocial('facebook') }}>
                    <img src="/images/facebooklogoprimary.png" className="size-17 group-hover:scale-110 transition-all" />
                    <div className="border-t border-dashed  border-2 w-full mt-2" />
                    <p className="text-sm font-semibold text-center">
                        Connect with <br /> Facebook
                    </p>
                </button>
                <button className="p-4 flex items-center flex-col gap-2 cursor-pointer border-dashed border-2 rounded-md group w-full h-full " onClick={() => { connectSocial('instagram') }}>
                    <img src="/images/instagram.png" className="size-17 group-hover:scale-110 transition-all" />
                    <div className="border-t border-dashed  border-2 w-full mt-2" />
                    <p className="text-sm font-semibold text-center">
                        Connect with <br /> Instagram
                    </p>
                </button>
                <button className="p-4 flex items-center flex-col gap-2 cursor-pointer border-dashed border-2 rounded-md group w-full h-full ">
                    <img src="/images/xlogo.png" className="size-17 group-hover:scale-110 transition-all" />
                    <div className="border-t border-dashed  border-2 w-full mt-2" />
                    <p className="text-sm font-semibold text-center">
                        Connect with <br />  X  <br /> (formerly Twitter)
                    </p>
                </button>
                <button className="p-4 flex items-center flex-col gap-2 cursor-pointer border-dashed border-2 rounded-md group w-full h-full ">
                    <img src="/images/pint.png" className="size-17 group-hover:scale-110 transition-all" />
                    <div className="border-t border-dashed  border-2 w-full mt-2" />
                    <p className="text-sm font-semibold text-center">
                        Connect with <br />  Pinterest
                    </p>
                </button>

            </div>

        </div >
    )
}

export default SocialMediaAccounts
