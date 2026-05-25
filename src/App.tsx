import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { SceneCanvas } from './scene/SceneCanvas';
import { Dock } from './components/Dock';
import { HomeHint } from './pages/HomeHint';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ScreenwritingPage } from './pages/ScreenwritingPage';
import { FilmPage } from './pages/FilmPage';
import { ComedyPage } from './pages/ComedyPage';
import { EsportsPage } from './pages/EsportsPage';

export function App() {
  const location = useLocation();
  return (
    <>
      <SceneCanvas />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<HomeHint />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/screenwriting" element={<ScreenwritingPage />} />
          <Route path="/film" element={<FilmPage />} />
          <Route path="/comedy" element={<ComedyPage />} />
          <Route path="/esports" element={<EsportsPage />} />
        </Routes>
      </AnimatePresence>
      <Dock />
    </>
  );
}
