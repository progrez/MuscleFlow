import React, { useState, useEffect } from "react";
import Button from "./ui/Button";
import ReactModal from "react-modal";
import CreateWorkoutForm from "./CreateWorkoutForm";
import { useNavigate } from "react-router-dom";

const backendURL = import.meta.env.VITE_BACKEND_URL;

const AddExerciseToWorkout = ({ exercise }) => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedWorkout, setSelectedWorkout] = useState(null);
	const [workouts, setWorkouts] = useState([]);
	const [repetitions, setRepetitions] = useState(0);
	const [weight, setWeight] = useState(0);
	const [sets, setSets] = useState(0);
	const [restTime, setRestTime] = useState(0);
	const navigate = useNavigate();

	const openModal = () => {
		if (!localStorage.getItem("token")) {
			alert("You must be logged in to add an exercise to a workout.");
			navigate("/login");
			return;
		}
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
	};

	// Taking workouts from localstorage
	useEffect(() => {
		const storedWorkouts =
			JSON.parse(localStorage.getItem("userDetails"))?.savedWorkouts || [];
		setWorkouts(storedWorkouts);
	}, []);

	const handleAddExerciseToWorkout = async () => {
		if (selectedWorkout) {
			const response = await fetch(
				`${backendURL}/api/user/workout/edit/${selectedWorkout}`,
				{
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${localStorage.getItem("token")}`,
					},
					body: JSON.stringify({
						exercises: [
							{
								name: exercise.name,
								weight,
								sets,
								repetitions,
								rest_time: restTime,
							},
						],
					}),
				}
			);

			const data = await response.json();
			if (response.ok) {
				console.log("Exercise added");
				closeModal();
			} else {
				console.log("Failed to add exercise:", data.error);
			}
		}
	};

	const handleWorkoutCreated = (newWorkout) => {
		setWorkouts((prevWorkouts) => [...prevWorkouts, newWorkout]);
		const updatedUserDetails = JSON.parse(localStorage.getItem("userDetails"));
		updatedUserDetails.savedWorkouts = [
			...updatedUserDetails.savedWorkouts,
			newWorkout,
		];
		localStorage.setItem("userDetails", JSON.stringify(updatedUserDetails));
	};

	return (
		<>
			<Button
				label="Add to workout"
				onClick={openModal}
				className="w-auto m-auto"
			/>
			<ReactModal
				isOpen={isModalOpen}
				onRequestClose={closeModal}
				ariaHideApp={false}
				className="bg-neutralDark-secondary text-neutraLight p-5 rounded-lg shadow-lg max-w-md mx-auto"
			>
				<header className="flex justify-between">
					<h5 className="mb-2 text-xl font-bold tracking-tight text-neutraLight dark:text-white">
						Choose workout and add exercise details
					</h5>
				</header>
				<h2 className="text-2xl font-bold mb-4">{exercise.name}</h2>
				<select
					onChange={(e) => setSelectedWorkout(e.target.value)}
					className="w-full p-1 rounded-md mb-2 bg-neutralDark text-neutraLight"
				>
					<option value={null}>Choose a workout</option>
					{workouts.map((workout) => (
						<option key={workout.id} value={workout.id}>
							{workout.name}
						</option>
					))}
				</select>

				<CreateWorkoutForm onWorkoutCreated={handleWorkoutCreated} />

				<div className="space-y-3">
					<label className="block font-medium">Repetitions</label>
					<input
						type="number"
						value={repetitions}
						onChange={(e) => setRepetitions(e.target.value)}
						className="w-full p-1 rounded-md bg-neutralDark text-neutraLight"
					/>

					<label className="block font-medium">Weight</label>
					<input
						type="number"
						value={weight}
						onChange={(e) => setWeight(e.target.value)}
						className="w-full p-1 rounded-md bg-neutralDark text-neutraLight"
					/>

					<label className="block font-medium">Sets</label>
					<input
						type="number"
						value={sets}
						onChange={(e) => setSets(e.target.value)}
						className="w-full p-1 rounded-md bg-neutralDark text-neutraLight"
					/>

					<label className="block font-medium">Rest time</label>
					<input
						type="number"
						value={restTime}
						onChange={(e) => setRestTime(e.target.value)}
						className="w-full p-1 rounded-md bg-neutralDark text-neutraLight"
					/>
				</div>

				<Button
					label="Add Exercise"
					onClick={handleAddExerciseToWorkout}
					className="w-auto m-auto"
				/>
				<Button label="Close" onClick={closeModal} className="w-auto m-auto" />
			</ReactModal>
		</>
	);
};

export default AddExerciseToWorkout;
