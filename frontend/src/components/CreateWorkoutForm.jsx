import auth from "../utils/auth"
import Button from "./ui/Button"
import Input from "./ui/Input"

const backendURL = import.meta.env.VITE_BACKEND_URL;

const CreateWorkoutForm = () => {

    

    const handleSubmit = async (formData) => {
        const workoutName = formData.get('workout_name')
        const workout = {
            workout_name: workoutName,
            exercises: [
                {
                    name: 'Push-up',
                    weight: 0,
                    sets: 10,
                    repetitions: 2,
                    rest_time: 5
                }
            ]
        }
        
        try {        
            const userId = auth.getUserId();
            const response = await fetch(`${backendURL}/api/user/${userId}/workout`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',                    
                    'Authorization': `Bearer ${auth.getToken()}`
                },
                body: JSON.stringify(workout)
            });

            if (response.ok) {
                const result = await response.json();
                console.log('Workout created successfully:', result);                
            }
        }
        catch (error) {
            console.error('Network error while creating new workout:', error);
            
        }

        
    }

    return (
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form action={handleSubmit}>
                <Input 
                    label="Workout Name"
                    type="text"
                    name="workout_name"                    
                    required={true}                 
                />
                <Button label="Create Workout"/>
            </form>

        </div>
    )
}

export default CreateWorkoutForm