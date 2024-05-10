import { Lobster } from "next/font/google";

const lobster = Lobster({ weight:"400", subsets:['latin-ext'] });

export default function Login() {
    return (
        <main className="flex flex-col h-screen">
            <div className="w-full h-10 bg-blue-300">
                <h1>TuneSphere</h1>
            </div>
            <div className="flex flex-row h-full bg-green-300">

                <div className=" flex flex-col flex-grow items-center justify-center bg-slate-300">
                    <button className=" w-[40] h-[32] transition ease-in-out bg-green-500 hover:bg-green-600 rounded-full px-5 py-2">
                        Login to Spotify
                    </button>
                </div>

            </div>
        </main>
    )
}