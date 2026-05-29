import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center px-6 text-center">

      {/* Wordmark */}
      <Link
        to="/"
        className="absolute top-6 left-6 text-xl font-black text-white tracking-tight hover:text-lime-400 transition-colors"
        style={{ fontFamily: 'Syne, sans-serif' }}
      >
        Sprintix
      </Link>

      {/* 404 */}
      <p
        className="text-[10rem] sm:text-[14rem] font-black leading-none text-zinc-800 select-none"
        style={{ fontFamily: 'Syne, sans-serif' }}
        aria-hidden="true"
      >
        404
      </p>

      {/* Heading */}
      <h1
        className="text-3xl sm:text-4xl font-black text-white mt-2 mb-4"
        style={{ fontFamily: 'Syne, sans-serif' }}
      >
        Page not found
      </h1>

      {/* Subtext */}
      <p className="text-zinc-400 text-base max-w-sm mb-10">
        The page you're looking for doesn't exist or may have moved.
      </p>

      {/* CTA */}
      <Link
        to="/"
        className="inline-flex items-center gap-2 px-6 py-3 bg-lime-400 text-zinc-900 text-sm font-bold rounded-xl hover:bg-lime-300 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Home
      </Link>
    </div>
  )
}

export default NotFoundPage
