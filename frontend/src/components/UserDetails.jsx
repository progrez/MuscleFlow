import React, { useState, useEffect } from "react";

const UserDetails = () => {
	const [userDetails, setUserDetails] = useState(null);

	useEffect(() => {
		const userData = JSON.parse(localStorage.getItem("userDetails"));
		if (userData && userData.userDetails && userData.userDetails.length > 0) {
			setUserDetails(userData.userDetails[0]);
		}
	}, []);

	if (!userDetails) {
		return <div>Loading</div>;
	}

	return (
		<div className="block max-w-sm p-6 bg-neutralDark-secondary  rounded-lg shadow-sm min-h-[172px] ml-[20px]">
			<p className="text-lg text-neutraLight">
				<strong>Name: </strong> {userDetails.username}
			</p>
			<p className="text-lg text-neutraLight">
				<strong>Height: </strong> {userDetails.height} cm
			</p>
			<p className="text-lg text-neutraLight">
				<strong>Weight: </strong> {userDetails.weight} kg
			</p>
		</div>
	);
};

export default UserDetails;
