import { Home, Search, Docs, Landing } from './pages';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainNavBar from './NavBar';
import './NavBar.css';
import BotRow from './BotRow';

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <MainNavBar />
        <Routes>
          <Route index element={<Landing />} />
          <Route path="/home" element={<Home />} />
          <Route path="/:pdbid/:urlAlgorithm" element={<Home />} />
          <Route path="/:pdbid" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/docs" element={<Docs />} />
        </Routes>
        <BotRow />
      </BrowserRouter>
    </div>
  );
}