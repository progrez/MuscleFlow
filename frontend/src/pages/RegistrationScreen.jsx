import { Link } from 'react-router-dom';
import RegistrationForm from "../components/RegistrationForm";

const RegistrationScreen = () => {
    return(
        <div className="min-h-screen flex flex-col items-center justify-center bg-neutralDark px-4 text-neutraLight">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight"> Sign Up</h2>            
          </div>
          <RegistrationForm/>
          <p className="mt-10 text-center text-sm/6">
                Already have an account? <Link to="/login" className="text-primary">Log In</Link>
          </p>
        </div>
    )
}

export default RegistrationScreen