import { useEffect, useState } from "react";
import "../App.css";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { CreateContentModel } from "../components/CreateContentModel";
import { PlusIcon } from "../components/icons/Plusicon";
import { ShareIcon } from "../components/icons/Shareicon";
import { SideBar } from "../components/Sidebar";
import { useContent } from "../hooks/useContent";

export function DashBoard() {
  const [model, setModel] = useState(false);
  const {content, refresh } = useContent();
  
  useEffect(() => {
    refresh();
  }, [model])

  return (
    <>
      <SideBar />
      <div className="p-4 ml-72 min-h-screen bg-gray-100 ">
        <div className="px-8 py-4">
          <CreateContentModel
            open={model}
            onClose={() => {
              setModel(false);
            }}
          />
          <div className="flex justify-end gap-4 ">
            <Button
              onClick={() => {
                setModel(true);
              }}
              variant="primary"
              text="Add Content"
              startIcon={<PlusIcon />}
            ></Button>
            <Button
              variant="secondary"
              text="Share Brain"
              startIcon={<ShareIcon />}
            ></Button>
          </div>
          <div className="flex mt-4 gap-4 flex-wrap">
              
            {content.map(({ type, title, link }) => 
              <Card 
              type={type}
              title={title} 
              link={link} 
              />)
            }
          </div>  
        </div>
      </div>
    </>
  );
}
