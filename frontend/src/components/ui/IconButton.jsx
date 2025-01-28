const IconButton = (props) => {

  const sizeClasses = {
    sm: 'w-4 h-4',     // Small: 16px
    md: 'w-6 h-6',     // Medium: 24px
    lg: 'w-8 h-8',     // Large: 32px
    xl: 'w-10 h-10'    // Extra Large: 40px
  };

  return (
    <button
      onClick={props.onClick}
      className={`p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200`}
    >
      <svg 
        viewBox="0 0 24 24"        
        fill={props.color}
        className={sizeClasses[size]}
      >
        <path d={props.svgPath} />
      </svg>
    </button>
  );
};

export default IconButton;