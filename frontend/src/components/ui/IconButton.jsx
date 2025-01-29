const IconButton = (props) => {
  // Create a size configuration object that contains all size-related styles
  const sizeConfig = {
    sm: {
      icon: 'w-4 h-4',
      button: 'p-1.5'
    },
    md: {
      icon: 'w-6 h-6',
      button: 'p-2'
    },
    lg: {
      icon: 'w-8 h-8',
      button: 'p-2.5'
    },
    xl: {
      icon: 'w-10 h-10',
      button: 'p-3'
    }
  };

  // Set default values by creating a config object that combines defaults with provided props
  const config = {
    icon: {
      path: props.icon?.path || '',
      size: props.icon?.size || 'md',
      color: props.icon?.color || 'currentColor'
    },
    button: {
      onClick: props.button?.onClick || (() => {}),
      className: props.button?.className || ''
    }
  };

  // Get the size configuration based on the icon size
  const currentSize = sizeConfig[config.icon.size];

  return (
    <button
      onClick={config.button.onClick}
      className={`
        ${currentSize.button}
        p-2
        rounded-full 
        hover:bg-neutralDark-secondary
        focus:outline-none 
        focus:ring-2 
        focus:bg-neutralDark-secondary
        ${config.button.className}
      `}
    >
      <svg 
        viewBox="0 0 24 24"
        fill={config.icon.color}
        className={currentSize.icon}
      >
        <path d={config.icon.path} />
      </svg>
    </button>
  );
};

export default IconButton;