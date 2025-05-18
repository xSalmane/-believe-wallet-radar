import Link from "next/link"

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-[#003B20] to-[#002010] p-4 text-center">
      <h2 className="mb-4 text-2xl font-bold text-white">404 - Page Not Found</h2>
      <p className="mb-6 text-gray-300">The page you are looking for does not exist.</p>
      <Link href="/" className="rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700">
        Return to Dashboard
      </Link>
    </div>
  )
}
