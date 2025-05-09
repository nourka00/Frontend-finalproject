import React from "react";
import ProfileCart from "../components/ProfileCard";
import ServicesGrid from "../components/ServicesGrid";
import Header from "../components/header";
import Footer from "../components/Footer";
export default function Home() {
  return (
      <>
          <div>
              <Header />
          </div>
          <div>
          <ProfileCart />
          </div>
          <div>
              <Footer />
          </div>
      </>
  );
}