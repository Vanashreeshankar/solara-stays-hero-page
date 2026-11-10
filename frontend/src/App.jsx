import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import HangingChair from "./components/HangingChair/HangingChair";
import BookingPanel from "./components/BookingPanel/BookingPanel";
import './App.css'

function App() {
  return (
    <main className="landing-page">
      <Navbar />
      <Hero/>
      <HangingChair />
      <BookingPanel />
    </main>
  );
}

export default App;