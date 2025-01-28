import React, { useState, useEffect } from 'react';
import auth from "../utils/auth";
import Workout from "../components/Workout"

const backendURL = import.meta.env.VITE_BACKEND_URL;

const DashBoardScreen = () => {
    // State to store the fetched data
    const [data, setData] = useState(null);

    // State to handle loading state
    const [isLoading, setIsLoading] = useState(true);

    // State to handle error
    const [error, setError] = useState(null);

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
        <Workout title='Workout name'/>
    )
}

export default DashBoardScreen