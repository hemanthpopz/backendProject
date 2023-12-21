import {Route,Routes,BrowserRouter} from 'react-router-dom'
import './App.css';

import Home from './Components/Register'
import Login from './Components/Login';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<Home/>}/>
        <Route exact path='/login' element={<Login/>}/>
      </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
