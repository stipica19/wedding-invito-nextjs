import Link from "next/link";

export default function NavBar() {
  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-lg font-semibold">
          Invitations
        </Link>
        <nav className="flex items-center gap-5 text-sm font-medium text-gray-700">
          <Link href="/templates">Templates</Link>
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/admin">Admin</Link>
          <Link href="/login">Login</Link>
        </nav>
      </div>
    </header>
  );
}
