import IconButton from "./ui/IconButton"
import {editIcon, deleteIcon} from '../utils/iconPaths'

const Workout = (props) => {
    return(
        <div className="workout-card">
            <div className="workout-card-header">
                <h2>{props.title}</h2>
                <IconButton svgPath={editIcon}/>
                <IconButton svgPath={deleteIcon} />
            </div>
        </div>
    )
}

export default Workout