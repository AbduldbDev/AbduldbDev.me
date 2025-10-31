import React, { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

import Home from "./Pages/Home";
import About from "./Pages/About";
import AnimatedBackground from "./components/Background";
import Navbar from "./components/Navbar";
import Portofolio from "./Pages/Portofolio";
import ContactPage from "./Pages/Contact";
import ProjectDetails from "./components/ProjectDetail";
import WelcomeScreen from "./Pages/WelcomeScreen";
import VisitNotifier from "./components/VisitNotifier";
import Footer from "./components/Footer";
import { AnimatePresence } from "framer-motion";

const LandingPage = ({ showWelcome, setShowWelcome }) => (
  <>
    <AnimatePresence mode="wait">
      {showWelcome && (
        <WelcomeScreen onLoadingComplete={() => setShowWelcome(false)} />
      )}
    </AnimatePresence>

    {!showWelcome && (
      <>
        {/* <VisitNotifier /> */}
        <Navbar />
        <AnimatedBackground />
        <Home />
        <About />
        <Portofolio />
        <ContactPage />
        <Footer />
      </>
    )}
  </>
);

const ProjectPageLayout = () => (
  <>
    <ProjectDetails />
    <Footer />
  </>
);

function App() {
  const [showWelcome, setShowWelcome] = useState(true);

  const router = createBrowserRouter(
    [
      {
        path: "/",
        element: (
          <LandingPage
            showWelcome={showWelcome}
            setShowWelcome={setShowWelcome}
          />
        ),
      },
      {
        path: "/project/:id",
        element: <ProjectPageLayout />,
      },
    ],
    {
      future: {
        v7_startTransition: false,
        v7_relativeSplatPath: true,
        v7_fetcherPersist: true,
        v7_normalizeFormMethod: true,
        v7_partialHydration: true,
        v7_skipActionErrorRevalidation: true,
      },
    }
  );

  return (
    <RouterProvider router={router} future={{ v7_startTransition: true }} />
  );
}

export default App;
