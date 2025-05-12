
interface InputProps {
    placeholder: string,
    refrence? : any
}

export function InputBox({ placeholder, refrence }: InputProps){
    return <input type="text" ref={refrence} placeholder={placeholder} className="p-2 outline-1 outline-slate-600 rounded-md">
        
    </input>
}