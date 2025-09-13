'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import ToggleTheme from '../ToggleTheme';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: '/upload', label: 'Upload' },
    { href: '/clusters', label: 'Clusters' },
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/insights', label: 'Insights' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'border-b border-gray-200 bg-white/70 backdrop-blur-md dark:border-gray-700 dark:bg-gray-900/70'
            : 'border-b border-transparent bg-white dark:bg-gray-900'
        } `}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link href="/" passHref>
            <div className="flex items-center gap-2">
              <img src="favicon.ico" alt="ClusterCart Logo" className="h-8 w-8" />
              <span className="bg-gradient-to-r from-blue-500 via-emerald-500 to-indigo-500 bg-clip-text text-xl font-bold text-transparent">
                ClusterCart
              </span>
            </div>
          </Link>

          <div className="hidden items-center gap-4 md:flex">
            <SignedIn>
              {navLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className={`px-2 py-1 transition ${
                    pathname === href
                      ? 'font-semibold text-indigo-600 dark:text-indigo-400'
                      : 'text-gray-800 hover:text-indigo-600 dark:text-gray-200 dark:hover:text-indigo-400'
                  }`}
                >
                  {label}
                </Link>
              ))}
            </SignedIn>
          </div>

          <div className="hidden items-center gap-4 md:flex">
            <SignedOut>
              <Link href="/sign-in">
                <Button className="rounded-md border border-gray-300 px-4 py-2 text-gray-800 transition hover:bg-gray-100 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-800">
                  Sign In
                </Button>
              </Link>
            </SignedOut>
            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
            <ToggleTheme aria-label="Toggle dark/light mode" />
          </div>

          <button
            className="rounded-md p-2 hover:bg-gray-100 dark:hover:bg-gray-800 md:hidden"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open mobile menu"
          >
            <Menu className="h-6 w-6 text-gray-800 dark:text-gray-200" aria-hidden="true" />
          </button>
        </div>
      </nav>

      <div
        className={`fixed right-0 top-0 z-50 h-full w-64 transform bg-white shadow-lg transition-transform duration-300 dark:bg-gray-900 ${
          sidebarOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile menu"
      >
        <div className="flex items-center justify-between border-b border-gray-200 p-4 dark:border-gray-700">
          <span className="text-lg font-bold text-gray-900 dark:text-gray-100">Menu</span>
          <button onClick={() => setSidebarOpen(false)} aria-label="Close mobile menu">
            <X className="h-6 w-6 text-gray-800 dark:text-gray-200" aria-hidden="true" />
          </button>
        </div>

        <div className="flex flex-col gap-4 p-4">
          <SignedIn>
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`px-2 py-1 transition ${
                  pathname === href
                    ? 'font-semibold text-indigo-600 dark:text-indigo-400'
                    : 'text-gray-800 hover:text-indigo-600 dark:text-gray-200 dark:hover:text-indigo-400'
                }`}
              >
                {label}
              </Link>
            ))}
          </SignedIn>
          <SignedOut>
            <Link href="/sign-in">
              <Button className="w-full" variant="outline">
                Log In
              </Button>
            </Link>
          </SignedOut>
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
          <ToggleTheme aria-label="Toggle dark/light mode" />
        </div>
      </div>

      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
}
