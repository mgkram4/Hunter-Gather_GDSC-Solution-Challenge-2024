import { SERVER_ROUTES } from "@config/routes";

export default function SignIn() {
  return (
    <div className="flex items-center justify-center ">
      <div className="max-w-sm mx-auto mt-8 p-4 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold mb-4">Sign In</h2>
        <form className="grid grid-cols-1 gap-4" action={SERVER_ROUTES.SIGNIN}>
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
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
