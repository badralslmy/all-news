// Edit Version: 1.0.3
import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { BottomNav } from './components/BottomNav';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { AddFeed } from './pages/AddFeed';
import { Terms } from './pages/Terms';
import { DeveloperInfo } from './pages/DeveloperInfo';
import { NewsDetails } from './pages/NewsDetails';
import { NewsFeed } from './pages/NewsFeed';
import { FeedProvider } from './context/FeedContext';
import { SavedNewsProvider } from './context/SavedNewsContext';

function App() {
  return (
    <FeedProvider>
      <SavedNewsProvider>
        <Router>
          <div className="min-h-screen flex flex-col bg-gray-50 font-sans group/app overflow-x-hidden">
            <style>{`
              @media print {
                @page { margin: 2cm; size: auto; }
                .no-print, nav, footer, .bottom-nav, .toolbar { display: none !important; }
                body, html, #root, .group\\/app { 
                  background: white !important; 
                  height: auto !important; 
                  overflow: visible !important; 
                  width: 100% !important;
                }
                .print-only { display: block !important; }
                main { padding: 0 !important; margin: 0 !important; }
              }
              .print-only { display: none; }
            `}</style>
            
            <div className="no-print">
              <Navbar />
            </div>
            
            <main className="flex-grow pb-24 md:pb-0 w-full max-w-[100vw]">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/news" element={<NewsFeed />} />
                <Route path="/news/details" element={<NewsDetails />} />
                <Route path="/add-rss" element={<AddFeed />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/developer" element={<DeveloperInfo />} />
              </Routes>
            </main>
            
            <div className="no-print">
              <Footer />
              <BottomNav />
            </div>
          </div>
        </Router>
      </SavedNewsProvider>
    </FeedProvider>
  );
}

export default App;