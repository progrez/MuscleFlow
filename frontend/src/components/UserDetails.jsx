import React, { useState, useEffect } from "react";

const UserDetails=()=>{
    const [userDetails, setUserDetails] = useState(null);

    useEffect(()=>{
        const userData=JSON.parse(localStorage.getItem("userDetails"));
        if (userData && userData.userDetails && userData.userDetails.length > 0) {
            setUserDetails(userData.userDetails[0]);
        }
    },[]);

    if(!userDetails){
        return(
        <div>Loading</div>)}
    

    return (
        <div className="bg-neutralDark-secondary p-5 rounded-lg">
          
          <p className="text-lg text-neutraLight"><strong>Username:</strong> {userDetails.username}</p>
          <p className="text-lg text-neutraLight"><strong>Height:</strong> {userDetails.height} cm</p>
          <p className="text-lg text-neutraLight"><strong>Weight:</strong> {userDetails.weight} kg</p>
        </div>
      );

}

export default UserDetails