import './App.css'
import { Route, Routes } from 'react-router-dom';
import Header from './containers/Header/Header.tsx';
import SearchBar from './containers/SearchBar/SearchBar';

const App = () => {


  return (
 <div>

   <Routes>
     <Route path="/" element={<Header />}/>

   </Routes>
   <SearchBar />
 </div>
  )
};

export default App;
