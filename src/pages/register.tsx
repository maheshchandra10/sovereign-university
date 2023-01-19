// Next Login Page

import { type NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import { useRouter } from "next/router";
import type { FormEvent } from "react";

import { api } from "../utils/api";

const Login: NextPage = () => {
  const router = useRouter();
  const register = api.auth.credentials.register.useMutation();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState<string | undefined>(undefined);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    register
      .mutateAsync({
        username,
        password,
        email,
      })
      .then(async (res) => {
        if (res.status === 200 || res.status === 401) {
          await router.push("/", undefined, { shallow: true });
        }
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  return (
    <>
      <Head>
        <title>The Sovereign Academy</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex h-full flex-col items-center justify-center gap-12 bg-purple px-4 py-16 ">
        <h1 className="text-5xl font-bold tracking-tight text-white">
          Register
        </h1>
        <form
          className="flex flex-col items-center justify-center gap-4"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
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
          <input
            type="email"
            placeholder="Email (optional)"
            className="w-96 rounded-md p-2"
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            type="submit"
            className="flex items-center justify-center rounded-md bg-orange px-8 py-3 text-base font-medium text-white shadow-lg hover:bg-[#ffcd00]"
          >
            Sign Up
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
