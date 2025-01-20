import React from "react";

const Input = (props) => {
    return(
        <div className="mt-4">
          <label className="block text-sm/6 font-medium text-gray-900">{props.label}:</label>
          <div className="mt-2">
            <input
              type={props.type}
              name={props.name}
              value={props.value}
              onChange={props.onChange}
              required={props.required}
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline- sm:text-sm/6"
            />
            {props.error && <span>{props.error}</span>}
          </div>

      </div>
    )
}


export default Input