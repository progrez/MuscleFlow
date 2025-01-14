import React from "react";

const Input = ({ label, type, name, value, onChange, error, required}) => {
    return(
        <div >
        <label>{label}:</label>
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
        />
        {error && <span>{error}</span>}
      </div>
    )
}

export default Input