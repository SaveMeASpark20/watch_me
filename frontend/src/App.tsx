
import './App.css';
import {Admin} from './admin/index' 
import Navbar from './Components/Navbar';
import Hero from './Components/Hero';

const path = window.location.pathname;

const App = () => {

  return (
    <div className='flex flex-col p-2'>
      {path == "/" ? (
        <>
        <Navbar/>
        <Hero/>
        </>
      ):
        <Navbar />
      }
      
      
    </div>
  )
}

export default App