import Footer from "@/components/landing/Footer";
import Header from "@/components/landing/Header";
import WrappedCard from "@/components/landing/WrappedCard";
import React from "react";

// Created a getServersideProps function to get the session and user data

const Wrapped: React.FC = () => {
  return (
    <main className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-grow bg-backgroundColor-dark px-5">
        <WrappedCard />
      </div>
      <Footer />
    </main>
  );
};

export default Wrapped;
