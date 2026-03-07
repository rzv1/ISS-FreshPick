interface HeaderProps{
    title: string
}

export const Header = ({title}: HeaderProps) => {
    return (
        <div>
            <img src="../../public/logo-harvest.png" alt="Logo" height={64}/>
            <h3>{title}</h3>
        </div>
    )
}