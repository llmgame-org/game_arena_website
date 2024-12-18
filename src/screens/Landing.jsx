import React from "react";
// Sections
import TopNavbar from "../components/Nav/TopNavbar";
import Header from "../components/Sections/Header";
import Services from "../components/Sections/Services";
import Projects from "../components/Sections/Projects";
import Blog from "../components/Sections/Blog";
import Footer from "../components/Sections/Footer"
import Contact from "../components/Sections/Contact"
import AboutUs from "../components/Sections/AboutUs"



export default function Landing() {
  return (
    <>
      <TopNavbar />
      <div id="top"></div>
      <Header />
      <AboutUs />
      <Services />
      <Projects />
      <Blog />
      <Contact />
      <Footer />
    </>
  );
}


