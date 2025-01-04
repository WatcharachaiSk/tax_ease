import React, { FC } from "react";

interface HomePageProps {}

const HomePage: FC<HomePageProps> = async ({}) => {
  return (
    <div className="w-full flex justify-center">
      <button
        type="button"
        className="text-2xl py-1 px-6 me-2 mb-2 font-medium text-gray-900 focus:outline-none bg-white rounded-xl border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 "
      >
        TEX Ease
      </button>
    </div>
  );
};

export default HomePage;
