import React from "react";

const Login = () => {
  return (
    <section className="h-min mt-10 mb-10 mx-auto container ">
      <form action="">
        <div className="mx-auto p-2">
          <div className="max-w-sm mx-auto my-10 bg-slate-800 px-5 py-10 rounded shadow-xl">
            <div className="text-center mb-8">
              <h1 className="font-bold text-2xl underline">Login</h1>
            </div>
            <form>
              <div className="mt-5">
                <label for="username">Email Address</label>
                <input
                  type="text"
                  id="username"
                  className="border-none outline-none bg-slate-300 text-black block w-full p-2 border rounded border-gray-500"
                />
              </div>
              <div className="mt-5">
                <label for="password">Password</label>
                <input
                  type="password"
                  id="password"
                  className="border-none outline-none bg-slate-300 text-black block w-full p-2 border rounded border-gray-500"
                />
              </div>
              <div className="mt-10">
                <input
                  type="submit"
                  value="Login"
                  className="py-3 bg-[#0F172A] cursor-pointer rounded text-white font-semibold text-center w-full"
                />
              </div>
            </form>
          </div>
        </div>
      </form>
    </section>
  );
};

export default Login;
