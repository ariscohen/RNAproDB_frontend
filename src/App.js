import { Home, Search, Docs, Landing, Upload } from './pages';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainNavBar from './NavBar';
import './NavBar.css';
import BotRow from './BotRow';
import Table from './Table'

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <MainNavBar />
        <Routes>
          <Route index element={<Landing />} />
          <Route path="/rnaprodb/" element={<Landing />} />
          <Route path="/rnaprodb/:pdbid/:urlAlgorithm" element={<Home />} />
          <Route path="/rnaprodb/:pdbid" element={<Home />} />
          <Route path="/rnaprodb/search" element={<Search />} />
          <Route path="/rnaprodb/docs" element={<Docs />} />
          <Route path="/rnaprodb/upload" element={<Upload />} />
          <Route path="/table" element={<Table />} />
        </Routes>
        <BotRow />
      </BrowserRouter>
    </div>
  );
}
