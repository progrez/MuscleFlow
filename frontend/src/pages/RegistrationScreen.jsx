import { Link } from 'react-router-dom';
import RegistrationForm from "../components/RegistrationForm";
import Header from '../components/ui/Header';

const RegistrationScreen = () => {
    return(
        <div className='min-h-screen px-0 flex flex-col bg-neutralDark text-neutraLight'>
          <Header />
          <div className="flex flex-col items-center justify-start mt-auto mb-auto w-full h-full">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight"> Sign Up</h2>            
            </div>
            <RegistrationForm/>
            <p className="mt-10 text-center text-sm/6">
                  Already have an account? <Link to="/login" className="text-primary">Log In</Link>
            </p>
          </div>
        </div>
    )
}

export default RegistrationScreen