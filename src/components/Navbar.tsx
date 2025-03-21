import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">Admin Panel</h1>
        <div className="space-x-6">
          <Link href="/" className="hover:underline">
            Dashboard
          </Link>
          <Link href="/admin/agents" className="hover:underline">
            Agents
          </Link>
          <Link href="/admin/upload-list" className="hover:underline">
            Upload List
          </Link>
          <Link href="/admin/distributed-lists" className="hover:underline">
            Distributed Lists
          </Link>
        </div>
      </div>
    </nav>
  );
}