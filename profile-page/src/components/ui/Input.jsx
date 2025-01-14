import React from "react";

const Input = ({ label, type, name, value, onChange, error }) => {
    return(
        <div >
        <label>{label}:</label>
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
        />
        {error && <span>{error}</span>}
      </div>
    )
}

export default Input