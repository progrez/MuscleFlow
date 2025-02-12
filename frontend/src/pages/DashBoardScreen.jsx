import { useState, useEffect } from "react";
import auth from "../utils/auth";
import WorkoutCard from "../components/WorkoutCard";
import Header from "../components/ui/Header";
import CardCarousel from "../components/CardCarousel";
import CreateWorkoutForm from "../components/CreateWorkoutForm";
import UserDetails from "../components/UserDetails";

const backendURL = import.meta.env.VITE_BACKEND_URL;

const DashBoardScreen = () => {
	// State to store the fetched data
	const [data, setData] = useState(null);

	// State to handle loading state
	const [isLoading, setIsLoading] = useState(true);

	// State to handle error
	const [error, setError] = useState(null);

	// example workouts
	const exampleWorkouts = [
		{ id: 1, name: "Push-up Routine" },
		{ id: 2, name: "Full Body Workout" },
		{ id: 3, name: "Cardio Burn" },
	];

	// Fetch data when the component mounts
	useEffect(() => {
		const fetchData = async () => {
			try {
				const userId = auth.getUserId();
				const response = await fetch(
					`${backendURL}/api/user/${userId}/dashboard`,
					{
						method: "GET",
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${auth.getToken()}`,
						},
					}
				);

				if (response.ok) {
					const fetchedData = await response.json();
					localStorage.setItem("userDetails", JSON.stringify(fetchedData));
					console.log("Data for Dashboard recived ", fetchedData);
					setData(fetchedData.savedWorkouts);
					setIsLoading(false);
				} else {
					setError("Failed to fetch data");
					setIsLoading(false);
				}
			} catch (error) {
				setError("Network error", error);
				setIsLoading(false);
			}
		};

		fetchData();
	}, []);

	// Render loading state, error message, or the actual data
	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>Error: {error}</div>;
	}

	return (
		<div className="min-h-screen px-0 flex flex-col bg-neutralDark text-neutraLight">
			<Header />
			<CardCarousel
				cards={
					data?.savedWorkouts?.length > 0
						? data.savedWorkouts.map((workout) => (
								<WorkoutCard key={workout.id} workout={workout} />
						  ))
						: exampleWorkouts.map((workout) => (
								<WorkoutCard key={workout.id} workout={workout} />
						  ))
				}
			/>
			<CreateWorkoutForm />
			<header className="flex justify-between">
				<h5 className="p-3 mb-3 text-xl font-bold tracking-tight text-neutraLight dark:text-white ml-[20px]">
					Your details: 
				</h5>
			</header>
			<UserDetails />
		</div>
	);
};

export default DashBoardScreen;
