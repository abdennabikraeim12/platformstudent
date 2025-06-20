import React from 'react';
import { BookOpen, Users, FileText, LayoutDashboard, Upload, UserPlus } from 'lucide-react';
import { cn } from '@/app/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation'; 

interface SidebarProps {
  isOpen: boolean;
}

const SidebarLink = ({ to, icon: Icon, label, isActive = false }: { to: string; icon: React.ElementType; label: string; isActive?: boolean }) => (
  <Link
    href={to} 
    className={cn(
      'flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors',
      isActive
        ? 'bg-primary text-primary-foreground'
        : 'text-gray-700 hover:bg-gray-100'
    )}
  >
    <Icon className="mr-3 h-5 w-5" />
    <span>{label}</span>
  </Link>
);

const Sidebar = ({ isOpen }: SidebarProps) => {
  const pathname = usePathname(); 

  return (
    <aside
      className={cn(
        'bg-white border-r border-gray-200 fixed top-16 bottom-0 left-0 z-20 w-64 transition-transform duration-300 ease-in-out transform',
        isOpen ? 'translate-x-0' : '-translate-x-full'
      )}
    >
      <div className="py-4 px-3 h-full overflow-y-auto">
        <nav className="space-y-1 pb-4">
          <SidebarLink
            to="/"
            icon={LayoutDashboard}
            label="Dashboard"
            isActive={pathname === '/'}
          />
          <SidebarLink
            to="/courses"
            icon={BookOpen}
            label="Courses"
            isActive={pathname.includes('/courses')}
          />
          <SidebarLink
            to="/students"  
            icon={Users}
            label="Students"
            isActive={pathname.includes('/students')}
          />
          <SidebarLink
            to="/assignements"
            icon={FileText}
            label="Assignments"
            isActive={pathname.includes('/assignments')}
          />
          <SidebarLink
            to="/submissions"
            icon={Upload}
            label="Submissions"
            isActive={pathname.includes('/submissions')}
          />
          <SidebarLink
            to="/enrollments"
            icon={UserPlus}
            label="Enrollments"
            isActive={pathname.includes('/enrollments')}
          />
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;