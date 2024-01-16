import { signUpWithEmail } from "@api/services/auth";

export default function SignUp() {
  return (
    <div className="flex items-center justify-center ">
      <div className="max-w-sm mx-auto mt-8 p-4 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
        <form className="grid grid-cols-1 gap-4" action={signUpWithEmail}>
          <label className="block">
            Email:
            <input
              type="email"
              className="mt-1 p-2 w-full border rounded"
              name="email"
              required
            />
          </label>

          <label className="block">
            Password:
            <input
              type="password"
              className="mt-1 p-2 w-full border rounded"
              name="password"
              required
            />
          </label>

          <button
            type="submit"
            className="bg-green-500 text-white p-2 rounded hover:bg-green-600 cursor-pointer"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}
