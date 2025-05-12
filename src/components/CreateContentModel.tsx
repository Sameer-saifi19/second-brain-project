import { useRef, useState } from "react";
import { Button } from "./Button";
import { CrossIcon } from "./icons/CrossIcon";
import { InputBox } from "./InputBox";
import axios from "axios";
import { BACKEND_URL } from "../config";

enum ContentType {
  Youtube = "youtube",
  Twitter = "twitter",
}

export function CreateContentModel({ open, onClose }) {
  const titleRef = useRef<HTMLInputElement>();
  const linkRef = useRef<HTMLInputElement>();
  const [type, setType] = useState(ContentType.Youtube);

  async function addContent() {
    const title = titleRef.current?.value;
    const link = linkRef.current?.value;

    await axios.post(`${BACKEND_URL}/create`,{title, link, type},{headers:{
      "Authorization" : localStorage.getItem("token")
    }});

    onClose();
  }

  return <>
  {open && <div >

    <div className="w-screen h-screen bg-black fixed top-0 left-0 z-40 opacity-70 flex justify-center items-center">
          
        </div>
    <div className="w-screen h-screen  fixed top-0 left-0 z-40 flex justify-center items-center">
            <div className="bg-white p-4 flex gap-4 justify-center w-xs rounded-xl flex-col absolute z-40">
            <div onClick={onClose} className="cursor-pointer flex justify-end">
              <CrossIcon />
            </div>
            <InputBox refrence={titleRef} placeholder="Enter title"/>
            <InputBox refrence={linkRef} placeholder="Enter Link"/>
            <h1 className="text-md font-medium text-black text-center">Type</h1>
            <div className="flex gap-2 justify-center">
                  <Button text="Youtube" variant={type === ContentType.Youtube ? 'primary' : 'secondary'} onClick={()=>{
                    setType(ContentType.Youtube)
                  }} />
                  <Button text="twitter" variant={type === ContentType.Twitter ? 'primary' : 'secondary'} onClick={()=>{
                    setType(ContentType.Twitter)
                  }} />
            </div>
            <div className="flex justify-center">
                <Button onClick={addContent} variant="primary" text="Submit" />
            </div>
          </div>
        </div>

    </div>}
  </>;
}
