"use client";

import { useState } from "react";
import Loader from "@/components/Loader";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Manifesto from "@/components/Manifesto";
import Work from "@/components/Work";
import Experience from "@/components/Experience";
import Research from "@/components/Research";
import Lab from "@/components/Lab";
import Skills from "@/components/Skills";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import SystemMode from "@/components/SystemMode";
import SectionProgress from "@/components/SectionProgress";

export default function Home() {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {!loaded && <Loader onDone={() => setLoaded(true)} />}
      <div className="grain" />
      <CustomCursor />
      <SystemMode />
      <SectionProgress />
      <SmoothScroll>
        <Navbar />
        <main>
          <Hero />
          <Manifesto />
          <Work />
          <Experience />
          <Research />
          <Lab />
          <Skills />
          <About />
          <Contact />
        </main>
        <Footer />
      </SmoothScroll>
    </>
  );
}
