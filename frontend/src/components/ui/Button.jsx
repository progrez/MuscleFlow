import React from 'react';

const Button = (props) => {
    return(
        <div className="mt-6">
            <button 
                onClick={props.onClick}
                type={props.type}
                className={`flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm/6 font-semibold text-neutraLight shadow-sm hover:bg-primary-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-focus ${props.className}`}
            >{props.label}</button>
        </div>

    )
}

export default Button