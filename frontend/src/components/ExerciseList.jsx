import { useState } from "react";
import AddExerciseToWorkout from "./AddExerciseToWorkout";


function ExerciseList({ exercise, selectedExercise, onExerciseClick }) {
	const isOpen = selectedExercise === exercise;
	// const [isModalOpen, setIsModalOpen] = useState(false);

	const handleCardClick = (event) => {
		// onExerciseClick(exercise);
    if (event.target.closest('.clickField')) {
      onExerciseClick(exercise);
	};}

	return (
		<div
			className={`exercise-card ${isOpen ? "open" : ""}`}
			onClick={handleCardClick}
			style={{ cursor: "pointer" }}
		>
			<div className="clickField">
        <h2>{exercise.name}</h2>
			<p>
				<strong>Level:</strong> {exercise.level}
			</p>
      </div>

			{isOpen && (
				<div>
					<div className="image-slider">
						{exercise.images.map((image, index) => (
							<img
								key={index}
								src={`https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/${exercise.images[index]}`}
								alt={exercise.name}
								style={{
									maxWidth: "200px",
									maxHeight: "200px",
									objectFit: "cover",
								}}
							/>
						))}
					</div>

					<h3>Instructions</h3>
					<ol>
						{exercise.instructions.map((instruction, index) => (
							<li key={index}>{instruction}</li>
						))}
					</ol>
					<AddExerciseToWorkout exercise={exercise}/>
				</div>
			)}
		</div>
	);
}

export default ExerciseList;
