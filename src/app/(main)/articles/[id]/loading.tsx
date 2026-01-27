import React from "react";

const Loading = () => {
  const commentsNumber = [1, 2];
  return (
    <div className="pt-9 flex justify-center animate-pulse">
      <div className="container px-6 mt-6">
        <div className="w-[100%] lg:w-2/3  m-auto ">
          <div className="shadow-lg black-bg w-full h-[250px] border-gray-200 my-3 rounded-lg py-8 px-11">
            <div className="w-1/4 h-[50px] my-2 rounded bg-gray-500"></div>
            <span className="block w-1/6 rounded h-[30px] my-3 bg-gray-500"></span>
            <p className="w-[80%] h-[70px] rounded my-2 bg-gray-500"></p>
          </div>
          <div className="flex justify-center items-center">
            <div className="w-[50%] h-[50px] rounded mt-3 bg-gray-300"></div>
          </div>
          <h1 className="w-[150px] rounded h-[20px] my-5 py-4 bg-gray-300"></h1>
          {commentsNumber.map((key) => {
            return (
              <div
                key={key}
                className="w-[100%] h-[220px] p-5 black-bg shadow-lg rounded mb-3 m-auto"
              >
                <div className=" flex justify-between items-center my-2">
                  <h1 className="w-[200px] h-[40px] bg-gray-500"></h1>
                  <span className="w-1/6 rounded h-[30px] my-3 bg-gray-500"></span>
                </div>
                <div className="w-[80%] h-[50px] rounded my-2 bg-gray-500"></div>
                <div className="flex items-center justify-end gap-5">
                  <div className="w-[30px] h-[30px] rounded bg-gray-500"></div>
                  <div className="w-[30px] h-[30px] rounded bg-gray-500"></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Loading;
