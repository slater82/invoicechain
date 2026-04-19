export default function UserInterfaceLayer() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-blue-100 to-blue-200 py-12 px-4">
      <div className="max-w-3xl mx-auto space-y-8">

        <PortalCard title="MSME Portal" />
        <PortalCard title="Bank / NBFC Portal" />
        <PortalCard title="Buyer Portal" />

      </div>
    </div>
  );
}

function PortalCard({ title }: { title: string }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-center text-lg font-semibold text-blue-700 mb-5">
        {title}
      </h2>

      <div className="space-y-3">
        <input
          type="email"
          placeholder="Email address"
          className="w-full px-4 py-2 bg-transparent border-b border-blue-400
          focus:outline-none focus:border-blue-600"
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full px-4 py-2 bg-transparent border-b border-blue-400
          focus:outline-none focus:border-blue-600"
        />

        <input
          type="text"
          placeholder="Enter captcha"
          className="w-full px-4 py-2 bg-transparent border-b border-blue-400
          focus:outline-none focus:border-blue-600"
        />
      </div>

      <button className="w-full mt-5 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">
        Sign Up
      </button>

      <p className="text-sm text-center mt-4 text-gray-600">
        Already have an account?{" "}
        <span className="text-blue-600 cursor-pointer font-medium">
          Sign In
        </span>
      </p>
    </div>
  );
}
