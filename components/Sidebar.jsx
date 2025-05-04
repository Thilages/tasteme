'use client'

import React, { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { CgProfile } from "react-icons/cg";
import { RiAiGenerate2 } from "react-icons/ri";
import { FaSearch } from "react-icons/fa";
import { useAuth } from '@/context/AuthContext';

const navItems = [
  { href: '/', icon: CgProfile, size: 24 },
  { href: '/generate', icon: RiAiGenerate2, size: 24 },
  { href: '/search', icon: FaSearch, size: 20 },
];

const LAPTOP_BREAKPOINT_PX = 500;

const Sidebar = () => {
  const [isLaptop, setIsLaptop] = useState(null);
  const pathname = usePathname();
  const { user } = useAuth()
  useEffect(() => {
    const checkSize = () => window.innerWidth > LAPTOP_BREAKPOINT_PX;
    setIsLaptop(checkSize());

    const handleResize = () => setIsLaptop(checkSize());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (isLaptop === null) {
    return (
      <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
        <p className="text-foreground text-lg animate-pulse">Loading...</p>
      </div>
    );
  }

  const getLinkClasses = (href) => {
    const isActive = pathname === href;
    return `
      flex items-center justify-center rounded-lg cursor-pointer group
      transition-all duration-200 ease-in-out transform hover:scale-105
      ${isActive
        ? 'text-primary'
        : 'text-gray-500 hover:text-primary hover:bg-primary/10'
      }
    `;
  };

  return (
    <>{user ? <>
      {isLaptop ? (
        <aside className="fixed left-0 top-0 h-screen w-20 bg-background p-4 rounded-r-lg flex flex-col items-center justify-center gap-8 z-40 border-r border-border">
          {navItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <Link key={item.href} href={item.href} aria-label={item.href}>
                <div className={`${getLinkClasses(item.href)} p-3`}>
                  <IconComponent size={item.size} />
                </div>
              </Link>
            );
          })}
        </aside>
      ) : (
        <nav className="fixed bottom-0 left-0 w-full bg-background p-2 rounded-t-lg flex items-center justify-center gap-10 z-40 border-t border-border">
          {navItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <Link key={item.href} href={item.href}>
                <div className={`${getLinkClasses(item.href)} p-2.5`}>
                  <IconComponent size={item.size} />
                </div>
              </Link>
            );
          })}
        </nav>
      )}
    </> : <></>}</>
  );
}

export default Sidebar;
