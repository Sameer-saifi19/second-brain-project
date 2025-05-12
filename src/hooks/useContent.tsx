import axios from "axios";
import { useState, useEffect } from "react";
import { BACKEND_URL } from "../config";


export function useContent(){
    const [content, setContent] = useState([]);

    function refresh(){
        axios.get(`${BACKEND_URL}/your-content`, {headers : {
            "Authorization" : localStorage.getItem("token")
        }})
            .then((response) =>{
                setContent(response.data.content)
            })
    }

    useEffect(() => {
        refresh()
        const interval = setInterval(() => {
            refresh()
        }, 5*1000);

        return () => [
            clearInterval(interval)
        ]
    }, [])

    return { content, refresh };
    
}