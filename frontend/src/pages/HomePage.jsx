import React, { useState, useEffect, useRef } from "react";
import ExerciseList from "../components/ExerciseList";
import axios from "axios";
import "../index.css";
import MuscleGroupSelector from "./MuscleGroupSelector";
import './HomePage.scss';

function HomePage() {
  const [exercises, setExercises] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMuscleGroup, setSelectedMuscleGroup] = useState(null);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const exerciseRefs = useRef({});

  const muscleGroups = [
    "abdominals",
    "abductors",
    "adductors",
    "biceps",
    "calves",
    "chest",
    "forearms",
    "glutes",
    "hamstrings",
    "lats",
    "lower back",
    "middle back",
    "neck",
    "quadriceps",
    "shoulders",
    "traps",
    "triceps",
  ];

  useEffect(() => {
    const fetchExerciseFiles = async () => {
      try {
        const response = await axios.get(
          "https://api.github.com/repos/yuhonas/free-exercise-db/contents/exercises"
        );

        const exerciseFiles = response.data.filter(file => file.name.endsWith(".json")).map(file => file.name);

        const exerciseData = await Promise.all(
          exerciseFiles.map(async (file) => {
            try {
              const response = await axios.get(
                `https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/${file}`
              );
              return response.data;
            } catch (error) {
              console.error(`Error fetching ${file}:`, error);
              return null;
            }
          })
        );

        const validExercises = exerciseData.filter((exercise) => exercise !== null);

        console.log("Fetched exercises:", validExercises);
        setExercises(validExercises);
      } catch (error) {
        console.error("Error fetching exercises:", error);
      }
    };

    fetchExerciseFiles();
  }, []);

  const handleMuscleGroupClick = (muscleGroup) => {
    setSelectedMuscleGroup(muscleGroup);
    setSelectedExercise(null);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleExerciseClick = (exercise) => {
    const isSameExercise = selectedExercise === exercise;
    setSelectedExercise(isSameExercise ? null : exercise);
    if (!isSameExercise) {
      setTimeout(() => {
        exerciseRefs.current[exercise.id].scrollIntoView({ behavior: "smooth" });
      }, 0);
    }
  };

  const filteredResults = exercises.filter((exercise) => {
    const includesMuscleGroup =
      exercise.primaryMuscles.includes(selectedMuscleGroup) ||
      exercise.secondaryMuscles.includes(selectedMuscleGroup);

    return (
      includesMuscleGroup &&
      exercise.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div className="HomePage">

      
      <MuscleGroupSelector onMuscleGroupClick={handleMuscleGroupClick} />
      {selectedMuscleGroup && (
        <h2>{selectedMuscleGroup.charAt(0).toUpperCase() + selectedMuscleGroup.slice(1)}</h2>
      )}

      <div className="search">
        <input
          type="text"
          placeholder="Search exercises..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>

      <div className="exercise-list">
        {filteredResults.length > 0 ? (
          filteredResults.map((exercise) => (
            <div key={exercise.id} ref={(el) => (exerciseRefs.current[exercise.id] = el)}>
              <ExerciseList
                exercise={exercise}
                selectedExercise={selectedExercise}
                onExerciseClick={handleExerciseClick}
              />
            </div>
          ))
        ) : (
          <p>No exercises found for {selectedMuscleGroup} with that search term.</p>
        )}
      </div>
    </div>
  );
}

export default HomePage;
