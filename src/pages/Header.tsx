import {Link} from "react-router-dom";

interface HeaderProps{
    title: string
}

export const Header = ({title}: HeaderProps) => {
    return (
        <div className="flex flex-col items-start mb-3">
            <Link to="/login" className="transition-opacity active:opacity-70 self-center">
                <img src="/ISS-FreshPick/logo-harvest-removebg-preview.png" alt="Logo" className="w-32 h-auto self-center"/>
            </Link>
            <p className="text-3xl mt-8 font-medium">{title}</p>
        </div>
    )
}