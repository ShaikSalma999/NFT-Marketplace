import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Bids from "./pages/Bids";
import MarketGrid from "./pages/MarketGrid";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import { MarketProvider } from "./context/MarketContext";

export default function App() {
  return (
    <MarketProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/bids" element={<Bids/>}/>
          <Route path="/saved" element={<MarketGrid title="Saved Items" subtitle="Welcome Saved Page"/>}/>
          <Route path="/collections" element={<MarketGrid title="Collections" subtitle="Welcome Collections Page"/>}/>
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/settings" element={<Settings/>}/>
        </Routes>
      </Layout>
    </MarketProvider>
  );
}
