'use client';

import React from 'react';
import { Menu } from 'lucide-react';
import { Button } from '../components/ui/button';
import { useRouter } from 'next/navigation'; 

interface NavbarProps {
  toggleSidebar: () => void;
}

const Navbar = ({ toggleSidebar }: NavbarProps) => {
  const router = useRouter(); 

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
      <div className="px-4 h-16 flex items-center justify-between">
        <div className="flex items-center">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleSidebar} 
            className="mr-2"
            aria-label="Toggle sidebar"
          >
            <Menu className="h-5 w-5" />
          </Button>
          <h1 
            className="text-xl font-heading font-bold cursor-pointer" 
            style={{color: "#2e86c1"}}
            onClick={() => router.push('/')} 
          >
            Course Hub
          </h1>
        </div>
        <nav className="flex items-center space-x-4">
          <Button 
            variant="ghost"
            onClick={() => router.push('/help')}
            className="hover:bg-blue-50 transition-colors"
          >
            Help
          </Button>
          <Button 
            variant="ghost"
            onClick={() => router.push('/profile')}
            className="hover:bg-blue-50 transition-colors"
            aria-label="User profile"
          >
            Profile
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;