"use client";

import { SERVER_ROUTES } from "@config/routes";
import { useState } from "react";

export default function SignIn() {
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUpWithEmail = async (e: any) => {
    e.preventDefault();
    setError("");

    const body = JSON.stringify({
      email,
      password,
    });

    const req = await fetch(SERVER_ROUTES.SIGNIN, {
      method: "POST",
      body,
    });

    const res = await req.json();

    if (!req.ok) {
      setError(res.message);
    }
  };
  return (
    <div className="flex items-center justify-center">
      <div className="max-w-sm mx-auto mt-8 p-4 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold mb-4">Sign In</h2>
        <form className="grid grid-cols-1 gap-4">
          <label className="block">
            Email:
            <input
              type="email"
              className="mt-1 p-2 w-full border rounded"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>

          <label className="block">
            Password:
            <input
              type="password"
              className="mt-1 p-2 w-full border rounded"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>

          <button
            onClick={handleSignUpWithEmail}
            className="bg-green-500 text-white p-2 rounded hover:bg-green-600 cursor-pointer"
          >
            Login
          </button>
        </form>
        <p>{error}</p>
      </div>
    </div>
  );
}
