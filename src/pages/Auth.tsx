import { useState } from "react";

export default function Auth() {
  const [mode, setMode] = useState<"login" | "signup">("login");

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-8 w-full max-w-md">

        <h1 className="text-2xl text-white font-semibold mb-6 text-center">
          {mode === "login" ? "Sign In" : "Sign Up"}
        </h1>

        <form className="space-y-4">
          {mode === "signup" && (
            <input
              placeholder="Full Name"
              className="w-full bg-black border border-zinc-700 rounded-lg px-4 py-2 text-white"
            />
          )}

          <input
            type="email"
            placeholder="Email"
            className="w-full bg-black border border-zinc-700 rounded-lg px-4 py-2 text-white"
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full bg-black border border-zinc-700 rounded-lg px-4 py-2 text-white"
          />

          <button
            type="button"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg"
          >
            {mode === "login" ? "Sign In" : "Create Account"}
          </button>
        </form>

        <p className="text-sm text-zinc-400 mt-4 text-center">
          {mode === "login" ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            onClick={() => setMode(mode === "login" ? "signup" : "login")}
            className="text-indigo-500"
          >
            {mode === "login" ? "Sign up" : "Sign in"}
          </button>
        </p>

      </div>
    </div>
  );
}
