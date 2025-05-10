"use client";

import { SearchInput } from "@/components/search-input";
import { ThemeToggle } from "@/components/theme-toggle";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function SiteHeader() {
  const currentPath = usePathname();

  const navItems = [
    { name: 'Home', href: '/', },
    { name: 'Projects', href: '/projects', },
    { name: 'Blog', href: '/blog', },
    { name: 'Contact', href: '/contact', },
  ];

  const navLinks = (
    <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
      {navItems.map((item, index) => {
        const isSelected = item.name === "Home"
          ? currentPath === "/"
          : currentPath?.startsWith(item.href);
        return (
          <li key={index}>
            <a
              href={item.href}
              className={`block py-2 px-3 rounded-sm ${isSelected
                ? 'text-white bg-blue-700 md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500'
                : 'text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700'
                }`}
              aria-current={isSelected ? 'page' : undefined}
            >
              {item.name}
            </a>
          </li>
        )
      })}
    </ul>
  );

  return (
    <header className="sticky top-0 shadow bg-background z-50">
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="light:border-b">
          <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
              <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Liam Townsley</span>
            </Link>
            <div className="items-center justify-between hidden w-full md:flex md:w-auto" id="navbar-search">
              {navLinks}
            </div>
            <div className="inline-flex gap-2">
              <SearchInput className="" />
              <ThemeToggle />
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
