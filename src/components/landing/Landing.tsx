import Footer from "./Footer";
import Header from "./Header";
import Hero from "./Hero";

const Landing: React.FC = () => {
  return (
    <main
      className={`min-h-screen w-screen text-black dark:text-white select-none`}
    >
      <Header />
      <Hero />
      <Footer />
    </main>
  );
};
export default Landing;
