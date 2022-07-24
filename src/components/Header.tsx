import { Logo } from "./Logo";

export function Header(){
    return(
        <header className="w-full py-5 flex items-center justify-center bg-neutral-800 border-b border-gray-600">
            <Logo/>
        </header>
    )
}