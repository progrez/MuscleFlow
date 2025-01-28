import { logo, profileIcon, deleteIcon, editIcon } from "../../utils/iconPaths"
import IconButton from './IconButton'
import { Logo } from "./Logo"


const Header = () => {
    return(
        <header className="flex justify-between h-16 items-center w-full pt-8 pr-4 pl-4">
            <button className="p-2 rounded-full hover:bg-neutralDark-secondary focus:outline-none focus:ring-2  focus:bg-neutralDark-secondary">
                <img src="src/assets/MF-logo.png" alt="logo" className="w-8 h-8"/>
            </button>
            <IconButton
                  icon={{
                    path: profileIcon,
                    size: "lg",
                    color: "#F0F0F0"
                  }}
                  button={{
                    onClick: () => console.log('clicked'),
                    className: "my-custom-class"
                  }}/>             
        </header>
    )
}

export default Header