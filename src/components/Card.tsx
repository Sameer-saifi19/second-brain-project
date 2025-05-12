import { DeleteIcon } from "./icons/Deleteicon";
import { NotebookIcon } from "./icons/Notebookicon";
import { ShareIcon } from "./icons/Shareicon";

interface CardProps{
    title: string,
    link: string,
    type: "twitter" | "youtube"
} 

export function Card({title, link, type}: CardProps ){
    return <div className="bg-white p-4 shadow-xl max-w-72 min-h-48  min-w-72 rounded-xl outline-1 outline-slate-200">
        <div className="flex justify-between items-center">
            <div className="flex gap-2" >
                <NotebookIcon/>
                <h3 className="text-lg">{title}</h3>
            </div>
            <div className="flex justify-between items-center gap-6 ">
                <div className="cursor-pointer hover:scale-110">
                    <ShareIcon />
                </div>
                <div className=" hover:scale-110">
                    <DeleteIcon/>
                </div>
            </div>
        </div>
        <div className="pt-8 ">
            {type === 'youtube' && <iframe className="w-full h-full rounded-md" src={link.replace('watch', 'embed').replace('?v=', '/')} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>}

            {type === 'twitter' && <blockquote className="twitter-tweet">
                <a href={link.replace('x','twitter')}></a>
            </blockquote> }
        </div>

    </div>
}