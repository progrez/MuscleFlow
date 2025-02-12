import { Link, useNavigate } from "react-router-dom";
import { logo, profileIcon, deleteIcon, editIcon } from "../../utils/iconPaths";
import IconButton from "./IconButton";
import { Logo } from "./Logo";
import { useState, useEffect } from "react";
import Button from "./Button";

const Header = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		const token = localStorage.getItem("token");
		setIsLoggedIn(!!token);
	}, []);

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	const handleLogOut = () => {
		localStorage.removeItem("token");
		localStorage.removeItem("userDetails");
		setIsLoggedIn(false);
		navigate("/login");
	};

	const handleIconClick = () => {
		if (isLoggedIn) {
			toggleMenu();
		} else {
			navigate("/login");
		}
	};

	return (
		<header className="flex justify-between h-16 items-center w-full pt-8 pr-4 pl-4">
			<Link to="/">
				<button className="p-2 rounded-full hover:bg-neutralDark-secondary focus:outline-none focus:ring-2  focus:bg-neutralDark-secondary">
					<img src="src/assets/MF-logo.png" alt="logo" className="w-8 h-8" />
				</button>
			</Link>
			<div className="relative">
				<IconButton
					icon={{
						path: profileIcon,
						size: "lg",
						color: "#F0F0F0",
					}}
					button={{
						onClick: handleIconClick,
						className: "my-custom-class",
					}}
				/>

				{/* Dropdown menu */}
				{isMenuOpen && isLoggedIn && (
					<div className="absolute right-0 mt-2 p-2 bg-neutralDark-secondary rounded-md shadow-lg z-50">
						<ul className="text-neutraLight">
							<li>
								<Link
									to="/dashboard"
									className="block px-4 py-2 hover:bg-neutralDark rounded"
								>
									Dashboard
								</Link>
								<li>
									<Button label="Log out" onClick={handleLogOut} />
								</li>
							</li>
						</ul>
					</div>
				)}
			</div>
		</header>
	);
};

export default Header;
