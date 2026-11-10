
import { useState } from "react";
import Spline from "@splinetool/react-spline";
import "./HangingChair.css";

const SCENE_URL =
  "https://prod.spline.design/ZmrKhhWqwFVFzY5m/scene.splinecode";

function HangingChair() {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="hanging-chair">
      {!loaded && (
        <div className="chair-loading">
          Loading experience...
        </div>
      )}

      <div className="hanging-chair-scene">
        <Spline
          scene={SCENE_URL}
          onLoad={() => setLoaded(true)}
        />
      </div>
    </div>
  );
}

export default HangingChair;
