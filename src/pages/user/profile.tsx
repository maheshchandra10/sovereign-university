import { type NextPage } from "next";
import Head from "next/head";
import { useState } from "react";

import { api } from "utils/api";

const UserProfile: NextPage = () => {
  const user = api.user.query();

  return (
    <>
      <Head>
        <title>Bitcoin Academy</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            Bitcoin Academy
          </h1>
          <div className="flex flex-col items-center justify-center gap-4">
            <input
              type="email"
              placeholder="Username"
              className="w-96 rounded-md p-2"
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="w-96 rounded-md p-2"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              className="flex items-center justify-center rounded-md bg-[#ffcd00] px-8 py-3 text-base font-medium text-white shadow-lg hover:bg-[#ffcd00]"
              onClick={async () => {
                const res = await login.mutateAsync({
                  username,
                  password,
                });

                setResult(res.message);
              }}
            >
              Login
            </button>
          </div>
          <div className="text-white">{result}</div>
        </div>
      </main>
    </>
  );
};

export default UserProfile;
