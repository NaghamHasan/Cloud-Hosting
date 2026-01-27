"use client";
import { menuItems } from '@/utils/adminSideBarData';
import Link from 'next/link';
import { usePathname } from 'next/navigation';


const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="fixed w-20 md:w-60 z-9 left-0 top-14 pt-10 h-screen shadow backdrop-blur-xl border-r border-white/10 flex flex-col">
      <nav className="flex-1 px-4 space-y-2">
        {menuItems.map((item) => {
        const isActive = item.href==="/admin" ? pathname==="/admin" : pathname.startsWith(item.href);
          return (
            <Link
              key={item.name}
              href={item.href==="/admin/articles-table"? "/admin/articles-table?pageNumber=1" : item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group ${ isActive ? 'bg-cyan-500/10 special-text border border-[#00d1ff] shadow-[inset_0_0_10px_[#00d1ff]]' : 'text-gray-400 hover:bg-white/5 hover:text-[#ffffff]'}`}
            >
              <span className={`${isActive ? 'special-text' : 'group-hover:text-[#00d1ff]'}`}>
                {item.icon}
              </span>
              <span className="font-medium hidden md:block">{item.name}</span>
              {isActive && (
                <div className="ml-auto hidden md:block w-1.5 h-1.5 rounded-full main-bg shadow-[0_0_10px_#22d3ee]"></div>
              )}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
