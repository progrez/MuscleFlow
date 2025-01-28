import IconButton from "./ui/IconButton"
import {editIcon, deleteIcon} from '../utils/iconPaths'
import Badge from "./ui/Badge"
import Button from './ui/Button'

const WorkoutCard = (props) => {
    return(
        <a href="#" className="block max-w-sm p-6 bg-neutralDark-secondary  rounded-lg shadow-sm">
            <header className="flex justify-between">
                <h5 className="mb-2 text-xl font-bold tracking-tight text-neutraLight dark:text-white">{props.title}</h5>                
                <div className="flex gap-1">
                    <IconButton
                        icon={{
                            path: editIcon,
                            size: "sm",
                            color: "#F0F0F0"
                        }}
                        button={{
                            onClick: () => console.log('clicked'),
                            className: "my-custom-class"
                        }}
                    />  
                    <IconButton
                        icon={{
                            path: deleteIcon,
                            size: "sm",
                            color: "#F0F0F0"
                        }}
                        button={{
                            onClick: () => console.log('clicked'),
                            className: "my-custom-class"
                        }}
                    />  
                </div>
            </header>
            <p className="font-normal text-gray-700 dark:text-gray-400"><Badge label='Push-up' /><Badge label='Push-up' /></p>
            <Button label="Train"/>
        </a>
    )
}

export default WorkoutCard