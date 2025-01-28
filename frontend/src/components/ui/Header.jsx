import { logo, profileIcon } from "../../utils/iconPaths"
import IconButton from './IconButton'


const Header = () => {
    return(
        <header className="flex justify-between h-16 items-center w-full">
            <img src="src/assets/MF-logo.png" alt="" srcset="" width={24} height={24}/>
            <IconButton svgPath={profileIcon} color="#F0F0F0" size='xl'/>
        </header>
    )
}

export default Header