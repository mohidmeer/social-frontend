import { Link } from "react-router-dom"
import Logo from "../components/Logo"
import { buttonVariants } from "../components/ui/button"
import Footer from "../components/Footer"
import { Link as LinkIcon, Sparkles, CalendarClock, Share2, LayoutDashboard, Infinity } from "lucide-react"

const features = [
    {
        title: "Connect Multiple Social Accounts",
        description: "Link as many Facebook and Instagram profiles as you want, all in one place.",
        icon: LinkIcon,
        color: "text-blue-600"
    },
    {
        title: "AI-Generated Captions & Image Ideas",
        description: "Provide instructions and let AI generate unique captions and content ideas.",
        icon: Sparkles,
        color: "text-green-600"
    },
    {
        title: "Flexible Scheduling",
        description: "Set precise times and days to automatically post your content.",
        icon: CalendarClock,
        color: "text-purple-600"
    },
    {
        title: "Multi-Platform Posting",
        description: "Publish content across multiple platforms with a single click.",
        icon: Share2,
        color: "text-yellow-600"
    },
    {
        title: "Dashboard Management",
        description: "View, edit, pause, or delete scheduled posts from a simple dashboard.",
        icon: LayoutDashboard,
        color: "text-pink-600"
    },
    {
        title: "Unlimited Scheduling",
        description: "No limits — schedule as many posts as you need.",
        icon: Infinity,
        color: "text-red-600"
    }
];

const Landing = () => {
    return (
        <>
            <nav className="border p-6 w-full flex items-center justify-between">
                <Logo size={50} textOrientation={'flex-row'} />
                <div></div>
                <div className="flex gap-2">
                    <Link to={"/auth/login"} className={buttonVariants({ variant: "default" })}>
                        Login
                    </Link>
                    <Link to={"/auth/register"} className={buttonVariants({ variant: "outline" })}>
                        Signup
                    </Link>
                </div>
            </nav>
            <main className="min-h-screen flex flex-col gap-20">
                <section className="grid grid-cols-2 max-w-7xl mx-auto mt-10 min-h-[80vh]">
                    <div className="max-w-6xl mx-auto px-6  flex flex-col gap-3  justify-center">
                        <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                            Automate Your Social Media Like a Pro
                        </h1>
                        <p className="mt-6 text-lg md:text-xl text-gray-600 ">
                            Connect, schedule, and manage Facebook & Instagram posts effortlessly — with AI-generated captions and image ideas tailored to your content.
                        </p>

                        <div className="mt-8">
                            <Link to={"/auth/login"} className={buttonVariants({ variant: "default" })}>
                                Start Scheduling Now
                            </Link>
                        </div>
                    </div>
                    <div className="flex items-center justify-center">
                        <img src="/images/schedule.png" width={500} className="rounded-lg overflow-hidden shadow-2xl" />
                    </div>
                </section>


                <section className="max-w-7xl mx-auto ">
                    <h2 className="text-5xl font-bold text-center">
                        Features
                    </h2>
                    <div className="grid grid-cols-3 gap-8 mt-10">
                        {features.map((feature, index) => {
                            const Icon = feature.icon;
                            return (
                                <div key={index} className="flex flex-col items-center text-center p-4">
                                    <Icon className={`w-10 h-10 mb-4 ${feature.color}`} />
                                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                                    <p className="text-gray-600">{feature.description}</p>
                                </div>
                            );
                        })}
                    </div>
                </section>
                <HowitWorks />
                <PricingAndDownload />
                <div className="text-center my-16 bg-blue-100 py-20 mx-auto max-w-6xl rounded-lg w-full">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Automate Your Socials?</h2>
                    <p className="text-lg mb-6 ">Start scheduling your posts in minutes — no stress, no manual work.</p>
                    <a href="/auth/login" className={buttonVariants({ variant: 'default' })}>
                        Get Started Now
                    </a>
                </div>
            </main>

            <Footer />
        </>
    )
}

export default Landing




function PricingAndDownload() {
    return (
        <div className="max-w-7xl w-full mx-auto mt-32 px-6 ">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                {/* Download CTA Box */}
                <div className="rounded-xl shadow-lg  flex items-center">
                    <div className="p-10 rounded-xl ">
                        <h2 className="text-4xl font-bold mb-4 ">🚀 Ready to Get Started?</h2>
                        <h2 className="text-3xl font-bold mb-3 text-black"></h2>
                        <p className="text-md mb-4 text-black">
                            Simple pricing: <strong>Free to start</strong>, with premium features when you need them.
                        </p>
                        <a href="/auth/login" className={buttonVariants({ variant: 'default' })}>
                            Get Started Now
                        </a> </div>

                </div>
                {/* Pricing Box */}
                <div className="p-10 rounded-xl shadow-lg ">
                    <h2 className="text-4xl font-bold mb-4 ">💰 Simple Pricing</h2>
                    <p className="text-lg mb-4">
                        Pay only for what you use, with no subscriptions or hidden fees.
                    </p>
                    <div className="mt-6">
                        <p className="text-5xl font-extrabold ">$12</p>
                        <p className="text-md ">For 60 Credits</p>
                    </div>
                    <ul className="mt-6 text-light text-left list-disc list-inside">
                        <li>1 Post = 2 Credit</li>
                        <li>Pay-as-you-go model</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}



function HowitWorks() {
    return (
        <section className="max-w-7xl mx-auto w-full ">
            <h2 className="text-5xl font-bold text-center">
                How it works
            </h2>


            <div className="grid grid-cols-2  my-20 gap-30">
                <div className="flex items-center">

                    <ul className="space-y-4 text-lg list-disc pl-5">
                        <li><strong>Give your schedule a title</strong> for easy reference.</li>
                        <li><strong>Describe your post</strong> — AI writes the caption & generate an image.</li>
                        <li><strong>Connect</strong> your Facebook or Instagram account.</li>
                        <li><strong>Pick the platform</strong> to post on.</li>
                        <li><strong>Choose days & time</strong> for automatic posting.</li>
                        <li><strong>Click “Submit”</strong> — we handle the rest.</li>

                    </ul>

                </div>

                <div className="flex items-center justify-center relative">
                    <img src="/images/schedule2.png" width={500} className="border shadow" />


                </div>
                <div className="flex items-center justify-left relative">
                    <img src="/images/manage.png" width={500} className="border shadow" />


                </div>
                <div className="flex items-center">

                    <ul className="space-y-4 text-lg list-disc pl-5">
                        <li><strong>Manage all schedules</strong> easily from your dashboard.</li>
                        <li><strong>Edit or pause</strong> any post anytime.</li>
                        <li><strong>Delete</strong> schedules you no longer need.</li>
                    </ul>

                </div>


            </div>

        </section>
    )
}