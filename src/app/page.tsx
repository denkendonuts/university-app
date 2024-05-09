import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-1 h-full items-center justify-center p-24 phone:flex-col phone:p-0 phone:px-8 phone:py-0">
      <div className="w-1/2 phone:w-full">
        <Image
          alt="University Finder"
          height={500}
          src="/images/university.jpg"
          width={600}
        />
      </div>
      <div>
        <h1 className="text-4xl font-bold text-center">
          Welcome to the University Finder
        </h1>
        <p className="text-lg text-center mt-4">
          Find universities and colleges from around the world
        </p>
        <div className="flex gap-4 justify-center mt-4 phone:flex-col phone:gap-2">
          <Link
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded text-center"
            href="/search"
          >
            Search For A University
          </Link>
          <Link
            className="mt-4 phone:mt-0 bg-gray-200 text-gray-700 px-4 py-2 rounded text-center"
            href="/favourites"
          >
            View Favorites
          </Link>
        </div>
      </div>
    </main>
  );
}
