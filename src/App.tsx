import "./App.css";
import { Route, Routes } from "react-router-dom";
import Header from "./containers/Header/Header.tsx";
import SearchBar from "./containers/SearchBar/SearchBar";
import ShowBar from "./containers/ShowBar/ShowBar.tsx";

const App = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<SearchBar />} />
        <Route path="/shows/:id" element={<ShowBar />} />
      </Routes>
    </div>
  );
};

export default App;
