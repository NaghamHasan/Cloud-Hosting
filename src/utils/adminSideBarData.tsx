import { GrDashboard } from 'react-icons/gr';
import { FiFileText } from 'react-icons/fi';
import { BiMessageSquare } from 'react-icons/bi';

export const menuItems = [
    { name: 'Dashboard', icon: <GrDashboard size={20} />, href: '/admin' },
    { name: 'Articles', icon: <FiFileText size={20} />, href: '/admin/articles-table' },
    { name: 'Comments', icon: <BiMessageSquare size={20} />, href: '/admin/comments-table' },
  ];