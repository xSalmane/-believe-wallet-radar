"use client"

import { useEffect } from "react"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Unhandled application error:", error)
    // You can add additional error reporting here
  }, [error])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-[#003B20] to-[#002010] p-4 text-center">
      <h2 className="mb-4 text-2xl font-bold text-white">Une erreur s'est produite</h2>
      <p className="mb-6 text-gray-300">Nous rencontrons un problème lors du chargement de l'application.</p>
      {process.env.NODE_ENV === 'development' && (
        <div className="mb-4 rounded bg-red-900/50 p-4 text-left text-sm text-red-200">
          <p className="font-mono">{error.message}</p>
        </div>
      )}
      <button 
        onClick={() => {
          reset()
          window.location.reload()
        }} 
        className="rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700 transition-colors"
      >
        Réessayer
      </button>
    </div>
  )
}
