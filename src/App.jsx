import './App.css';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';

function App() {
    return (
        <Router>
            <div className="flex justify-center space-x-4 mt-10">
                <Link to="/login" className="bg-blue-500 text-white px-4 py-2 rounded">
                    Login
                </Link>
                <Link to="/signup" className="bg-green-500 text-white px-4 py-2 rounded">
                    Sign Up
                </Link>
            </div>
            <Routes>
                <Route path="/login" component={Login} />
                <Route path="/signup" component={Signup} />
            </Routes>
        </Router>
    );
}

export default App;