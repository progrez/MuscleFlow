import React, { useState, useEffect } from 'react';
import auth from "../utils/auth";
import WorkoutCard from "../components/WorkoutCard"
import Header from '../components/ui/Header';
import CardCarousel from '../components/CardCarousel';

const backendURL = import.meta.env.VITE_BACKEND_URL;

const DashBoardScreen = () => {
    // State to store the fetched data
    const [data, setData] = useState(null);

    // State to handle loading state
    const [isLoading, setIsLoading] = useState(true);

    // State to handle error
    const [error, setError] = useState(null);


    const cards = [
        <WorkoutCard title='Workout name'/>,
        <WorkoutCard title='Workout name'/>,
        <WorkoutCard title='Workout name'/>,
        <WorkoutCard title='Workout name'/>,
    ]

    // Fetch data when the component mounts
    useEffect(() => {
        const fetchData = async () => {
            try{
                const userId = auth.getUserId();
                const response = await fetch (`${backendURL}/api/user/${userId}/dashboard`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',                    
                        'Authorization': `Bearer ${auth.getToken()}`
                    },                    
                })

                if (response.ok) {
                    const fetchedData = await response.json();
                    console.log('Data for Dashboard recived ', fetchedData);  
                    setIsLoading(false)              
                }

            } catch(error) {
                console.error('Network error:', error);                
            }
        }

        fetchData();
    }, []); 

    // Render loading state, error message, or the actual data
    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }


    return(
        <div className='min-h-screen px-0 flex flex-col bg-neutralDark text-neutraLight'>
            <Header />
            <CardCarousel cards={cards}/>
        </div>
        
    )
}

export default DashBoardScreen