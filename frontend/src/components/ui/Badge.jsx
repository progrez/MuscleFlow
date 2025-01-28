const Badge = (props) => {
    return (
        <span className="bg-neutralDark text-neutraLight-secondary text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm">{props.label}</span>
    )
}

export default Badge