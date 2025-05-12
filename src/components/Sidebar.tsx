import { TweetIcon } from "./icons/TweetIcon";
import { YoutubeIcon } from "./icons/YoutubeIcon";
import { SideBarItem } from "./SidebarItem";

export function SideBar(){
    return <div className="h-screen bg-white border-r-1 border-slate-200 w-72 mt-8 flex flex-col gap-2 px-2 top-0 left-0 fixed">
        <h2 className="text-3xl font-bold text-black mb-6">Second Brain</h2>
        <SideBarItem text="YouTube" icon={<YoutubeIcon/>}/>
        <SideBarItem text="Twitter" icon={<TweetIcon/>}/>
    </div> 
}