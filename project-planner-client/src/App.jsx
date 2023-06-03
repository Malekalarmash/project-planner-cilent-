import './App.css'
import Home from './pages/Home';
import { setLoggedIn } from './redux/actions'
import { useSelector } from 'react-redux';
import Signin from './pages/signin';
import DashboardImg from '../src/img/Dashboard.svg'


// Render compnent based on a state 
// Usestate have or not have token 
// If they dont have have a token, then it renders 
// Landing page 
// Home comp and if they have a token, then redirect to the home page
// Dashboard comp renders in the App and if (toke) redirect to Home comp 
function App() {
  const loggedIn = useSelector((state) => state.setLogIn);
  return (
    <>
    
      {loggedIn ? <Home /> : <Signin />}
   

    </>






  );
}

export default App;
