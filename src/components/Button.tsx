import { ReactElement } from "react";

interface ButtonProps {
    variant : "primary" | "secondary",
    text: string, 
    startIcon?: ReactElement,
    onClick?: () => void
}

const variantClasses = {
    "primary" : "bg-blue-primary text-white",
    "secondary" : "bg-blue-secondary text-tertiary"
}

const defaultStyles = "px-4 py-2 rounded-md flex cursor-pointer items-center text-lg"

export function Button ({variant, text, startIcon, onClick}: ButtonProps){

    return <button onClick={onClick} className={variantClasses[variant] + " " + defaultStyles}>
        <div className="pr-2">{startIcon}</div> {text}
    </button>
}