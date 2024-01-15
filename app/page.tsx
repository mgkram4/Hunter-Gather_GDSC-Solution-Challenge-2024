import SignUpForm from "@components/signup-form";

export default function Home() {
  return (
    <main>
      <div className="bg-cover m-4 rounded-xl bg-[url('/kitchen.jpg')]">
        <div className="px-4 mx-auto max-w-screen-xl text-center py-24 lg:py-56">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-black md:text-5xl lg:text-6xl">
            Explore Culinary Delights with Us
          </h1>
          <p className="mb-8 text-lg font-normal text-gray-600 lg:text-xl sm:px-16 lg:px-48">
            Welcome to a world of flavors and recipes where every dish is a
            masterpiece waiting to be crafted. Join us on a gastronomic journey
            filled with culinary wonders.
          </p>
          <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
            <button className="text-xl p-2 rounded-xl hover:opacity-90 hover:text-black  hover:shadow-md bg-green-600 text-white">
              Discover Recipes
            </button>
            <button className="text-xl p-2 hover:bg-slate-50 hover:opacity-90 rounded-xl hover:text-green-600  hover:shadow-md text-black">
              Feeling Hangry?
            </button>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center h-screen bg-slate-100">
        test
      </div>
    </main>
  );
}
