import React from "react";
import Header from "./components/Header";
import InstagramFeed from "./components/InstagramFeed";
import "./index.css";

export default function App() {
  return (
    <div className="wrapper">
      < Header />
      < InstagramFeed />
    </div>
  );
}
