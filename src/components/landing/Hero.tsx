import Link from "next/link";
import TryOut from "./TryOut";

const Hero: React.FC = () => {
  return (
    <section className="flex flex-grow h-auto text-gray-600 body-font bg-gradient-to-r from-black to-[#090909]">
      <div className="container mx-auto flex px-5 py-5 md:flex-row flex-col items-center h-auto">
        <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
          <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-transparent bg-clip-text inline-block bg-gradient-to-r from-spotifyGreen via-green-300 to-green-50">
            Spotify Wrapped Any Time
            <br className="hidden lg:inline-block" />
          </h1>
          <p className="mb-8 leading-relaxed text-white">
            Tired of waiting for Spotify Wrapped? Get your top tracks and
            artists any time you want.
          </p>
          <div className="flex justify-center">
            <Link href="/wrapped">
              <button className="inline-flex text-white rounded-lg bg-spotifyGreen border-0 py-2 px-6 focus:outline-none hover:bg-green-600 text-lg">
                Go to Full Wrapped
              </button>
            </Link>
          </div>
        </div>
        {/* <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 h-5/6"> */}
        <div className="max-w-full md:w-1/2 lg:max-w-2xl w-5/6 h-full">
          <TryOut />
        </div>
      </div>
    </section>
  );
};
export default Hero;
