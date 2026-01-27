import React from "react";

const Loading = () => {
  const num = [1, 2, 3, 4, 5, 6];
  return (
    <div className="flex relative justify-center w-full m-h-screen pb-16 lg-pb-0 animate-pulse">
      <div className="container">
        <div className="w-[100%] md:w-100 m-auto h-[60px] rounded black-bg mb-7 mt-8"></div>
        <div className="flex items-center justify-center m-auto">
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {num.map((el, key) => (
              <div
                key={key}
                className="black-bg relative h-[200px] p-4 rounded mb-4 md-mb-0 w-[100%] md:w-xs lg:w-2xs"
              >
                <h1 className="h-[20px] mt-2 bg-gray-400"></h1>
                <p className="py-2 h-[60px] mt-5 bg-gray-400"></p>
                <div className="bg-gray-300 h-[30px] mt-4 m-auto rounded py-2 px-3 w-4/6"></div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-center w-[100%] items-center left-0 h-[50px} gap-1 absolute bottom-7 m-auto">
        <div className="py-1 px-2 bg-gray-300 h-[50px] rounded w-[200px]"></div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
