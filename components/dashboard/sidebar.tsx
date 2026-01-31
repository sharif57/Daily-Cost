'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import {
  LayoutDashboard,
  Users,
  Wallet,
  Bell,
  BarChart3,
  Zap,
  Settings,
  Shield,
  ChevronDown,
} from 'lucide-react'
import Logo from '../icon/logo'

const menuItems = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: LayoutDashboard,
    href: '/',
  },
  {
    id: 'user',
    label: 'User',
    icon: Users,
    href: '/users',
  },
  {
    id: 'finance',
    label: 'Finance',
    icon: Wallet,
    submenu: true,
    href: '/finance',
    children: [
      { id: 'global-dashboard', label: 'Global Financial Dashboard', href: '/finance/dashboard' },
      { id: 'income-overview', label: 'Income Overview', href: '/finance/income' },
      { id: 'expense-overview', label: 'Expense Overview', href: '/finance/expenses' },
      { id: 'profit-loss', label: 'Profit & Loss Summary', href: '/finance/profit-loss' },
    ],
  },
  {
    id: 'reminders',
    label: 'Reminders',
    icon: Bell,
    href: '/reminders',
  },
  {
    id: 'reports',
    label: 'Reports',
    icon: BarChart3,
    submenu: true,
    href: '/reports',
  },
  {
    id: 'analytics',
    label: 'Analytics',
    icon: Zap,
    href: '/analytics',
  },
  {
    id: 'system-alerts',
    label: 'System Alerts',
    icon: Zap,
    href: '/alerts',
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: Settings,
    submenu: true,
    href: '/settings',
  },
  {
    id: 'security',
    label: 'Security Access Logs',
    icon: Shield,
    href: '/security',
  },
]

export default function Sidebar() {
  const pathname = usePathname()
  const [expandedItems, setExpandedItems] = useState<string[]>([])

  // Expand submenu if current route matches any child
  useEffect(() => {
    const expanded: string[] = []
    menuItems.forEach((item) => {
      if (item.submenu && item.children) {
        if (
          item.children.some((child) => pathname === child.href || pathname.startsWith(child.href + '/')) ||
          pathname === item.href ||
          pathname.startsWith(item.href + '/')
        ) {
          expanded.push(item.id)
        }
      }
    })
    setExpandedItems(expanded)
  }, [pathname])

  const toggleExpand = (id: string, hasSubmenu: boolean, href: string, e: React.MouseEvent) => {
    if (hasSubmenu) {
      e.preventDefault()
      setExpandedItems((prev) =>
        prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
      )
    }
  }

  return (
    <aside className="hidden md:flex w-60 bg-[#090A58] text-sidebar-foreground flex-col">
      {/* Logo */}
      <div className="px-6 py-6 border-b border-sidebar-border">
        <Logo />
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-4">
        {menuItems.map((item) => {
          const IconComponent = item.icon
          const isExpanded = expandedItems.includes(item.id)
          // Active if current route matches parent or any child
          const isActive =
            pathname === item.href ||
            pathname.startsWith(item.href + '/') ||
            (item.children && item.children.some((child) => pathname === child.href || pathname.startsWith(child.href + '/')))

          return (
            <div key={item.id}>
              <Link
                href={item.href}
                onClick={(e) => toggleExpand(item.id, !!item.submenu, item.href, e)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-all block relative ${isActive ? 'text-white bg-[#F7F4FD1A]' : 'text-white hover:bg-sidebar-accent'
                  }`}
              >
                <IconComponent className="w-5 h-5 flex-shrink-0" />
                <span className={`flex-1 text-left text-sm ${isActive ? 'text-white font-bold' : 'text-[#9CA3AF] font-medium'}`}>
                  {item.label}
                </span>
                {item.submenu && (
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                  />
                )}
                {isActive && (
                  <span className="absolute right-0 top-1/2 -translate-y-1/2 h-full w-2 rounded-r bg-[#B68F24]"></span>
                )}
              </Link>
              {item.submenu && isExpanded && item.children && (
                <div className="pl-4 space-y-1">
                  {item.children.map((child) => {
                    const isChildActive =
                      pathname === child.href || pathname.startsWith(child.href + '/')
                    return (
                      <Link
                        key={child.id}
                        href={child.href}
                        className={`relative block px-4 py-2 rounded text-sm transition-all ${isChildActive
                            ? ' text-white font-bold'
                            : 'text-[#9CA3AF] hover:bg-sidebar-accent'
                          }`}
                      >
                        {child.label}
                        {isChildActive && (
                          <span className="absolute right-0 top-1/2 -translate-y-1/2 h-full w-2 rounded-r bg-[#B68F24]"></span>
                        )}
                      </Link>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}
      </nav>
    </aside>
  )
}