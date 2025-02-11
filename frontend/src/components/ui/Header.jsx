import { Link } from "react-router-dom"
import { logo, profileIcon, deleteIcon, editIcon } from "../../utils/iconPaths"
import IconButton from './IconButton'
import { Logo } from "./Logo"
import { useState } from "react"

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);}

    return(
        <header className="flex justify-between h-16 items-center w-full pt-8 pr-4 pl-4">
            <Link to="/">
                <button className="p-2 rounded-full hover:bg-neutralDark-secondary focus:outline-none focus:ring-2  focus:bg-neutralDark-secondary">
                    <img src="src/assets/MF-logo.png" alt="logo" className="w-8 h-8"/>
                </button>
            </Link>
            <div className="relative">
        <IconButton
          icon={{
            path: profileIcon,
            size: "lg",
            color: "#F0F0F0"
          }}
          button={{
            onClick: toggleMenu,
            className: "my-custom-class"
          }}
        />
        
        {/* Dropdown menu */}
        {isMenuOpen && (
          <div className="absolute right-0 mt-2 p-2 bg-neutralDark-secondary rounded-md shadow-lg z-50">
            <ul className="text-neutraLight">
              <li>
                <Link to="/login" className="block px-4 py-2 hover:bg-neutralDark rounded">
                  Sign in / Sign up
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="block px-4 py-2 hover:bg-neutralDark rounded">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>      
        </header>
    )
}

export default Header