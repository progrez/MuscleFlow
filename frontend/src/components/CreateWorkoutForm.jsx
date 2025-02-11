import React, { useState } from "react";
import auth from "../utils/auth";
import Button from "./ui/Button";
import Input from "./ui/Input";
import ReactModal from "react-modal";

const backendURL = import.meta.env.VITE_BACKEND_URL;

const CreateWorkoutForm = ({ onWorkoutCreated }) => {
  const [workoutName, setWorkoutName] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenFormModal = () => {
    setIsOpen(true);
  };

  const handleCloseFormModal = () => {
    setIsOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const workout = { name: workoutName, exercises: [] };

    try {
      const userId = auth.getUserId();
      const response = await fetch(`${backendURL}/api/user/${userId}/workouts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.getToken()}`,
        },
        body: JSON.stringify(workout),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Workout created:", result);
        onWorkoutCreated(result);
        handleCloseFormModal(); 
      }
    } catch (error) {
      console.error("Network error while creating workout:", error);
    }
  };

  return (
    <>
      <Button label="Create new workout" onClick={handleOpenFormModal} className="w-auto m-auto"/>
      <ReactModal isOpen={isOpen} onRequestClose={handleCloseFormModal} className="bg-neutralDark-secondary text-neutraLight p-6 rounded-lg shadow-lg max-w-md mx-auto">
      
        <form onSubmit={handleSubmit}>
          <Input
            label="Workout Name"
            type="text"
            name="workout_name"
            value={workoutName}
            onChange={(e) => setWorkoutName(e.target.value)}
            required
          />
          <Button label="Create Workout" className="w-auto m-auto"/>
        </form>
        <Button label="X" onClick={handleCloseFormModal} className="w-auto m-auto"/>
      </ReactModal>
    </>
  );
};

export default CreateWorkoutForm;