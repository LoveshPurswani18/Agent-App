import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return <p className="text-center text-lg mt-5 text-gray-700">Loading...</p>;
  }

  return (
    <div className="flex flex-col items-center h-screen bg-gradient-to-b from-gray-50 to-gray-200 p-8">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-3xl text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Welcome, {session?.user?.name || "Admin"}
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <button
            onClick={() => router.push("/admin/agents")}
            className="p-4 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition transform hover:scale-105"
          >
            Manage Agents
          </button>
          <button
            onClick={() => router.push("/admin/add-agent")}
            className="p-4 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition transform hover:scale-105"
          >
            Add Agent
          </button>
          <button
            onClick={() => router.push("/admin/upload-list")}
            className="p-4 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition transform hover:scale-105"
          >
            Upload CSV
          </button>
          <button
            onClick={() => router.push("/admin/distributed-lists")}
            className="p-4 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition transform hover:scale-105"
          >
            View Distributed Lists
          </button>
        </div>
      </div>
    </div>
  );
}