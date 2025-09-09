'use client';

export default function NotFound() {
  return (
    <section className="flex h-screen flex-col items-center justify-center px-4 dark:bg-dark-900 dark:text-white">
      <h1 className="animate-bounce-slow mb-4 text-9xl font-extrabold">404</h1>

      <p className="animate-fade-in mb-6 text-xl md:text-2xl">Oops! Page not found.</p>

      <div className="animate-wave mb-8 h-1 w-40 bg-gradient-to-r from-blue-500 via-emerald-500 to-indigo-500"></div>

      <a
        href="/"
        className="animate-fade-in-up rounded-lg bg-blue-500 px-6 py-3 text-lg font-semibold text-white transition-all duration-300 hover:bg-blue-600"
      >
        Go Home
      </a>

      <style jsx>{`
        @keyframes bounce-slow {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-15px);
          }
        }
        .animate-bounce-slow {
          animation: bounce-slow 2s infinite ease-in-out;
        }

        @keyframes fade-in {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }
        .animate-fade-in {
          animation: fade-in 1.5s ease forwards;
        }

        @keyframes fade-in-up {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 1.5s ease forwards;
        }

        @keyframes wave {
          0% {
            transform: scaleX(1);
          }
          50% {
            transform: scaleX(1.3);
          }
          100% {
            transform: scaleX(1);
          }
        }
        .animate-wave {
          animation: wave 1.5s infinite ease-in-out;
        }
      `}</style>
    </section>
  );
}
