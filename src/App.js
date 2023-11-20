import {Home, Search, Docs} from './pages';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import NavBar from './NavBar';
import './NavBar.css';
import BotRow from './BotRow';

export default function App() {
  return (
    <div>
      <>
        <BrowserRouter>  
        <NavBar />        
          <Routes>
            <Route index element={<Home />} />
            <Route path="/:pdbid" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/docs" element={<Docs />} />
          </Routes>
        <BotRow />
        </BrowserRouter>
      </>
    </div>
  );
}