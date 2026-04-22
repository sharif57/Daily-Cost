'use client'

import { useState, useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
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
  LogOut,
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
    id: 'Guest List',
    label: 'Guest List',
    icon: Users,
    href: '/config'
  },
  {
    id: 'profit-loss',
    label: 'Profit & Loss Summary',
    icon: Wallet,
    href: '/finance/profit-loss',
    // children: [
    //   // { id: 'global-dashboard', label: 'Global Financial Dashboard', href: '/finance/dashboard', activePath: '/finance/dashboard' },
    //   // { id: 'income-overview', label: 'Income Overview', href: '/users', activePath: '/finance/income' },
    //   // { id: 'expense-overview', label: 'Expense Overview', href: '/users', activePath: '/finance/expenses' },
    //   // { id: 'profit-loss', label: 'Profit & Loss Summary', href: '/finance/profit-loss', activePath: '/finance/profit-loss' },
    // ],
  },
  {
    id: 'reminders',
    label: 'Reminders',
    icon: Bell,
    href: '/reminders',
  },
  // {
  //   id: 'reports',
  //   label: 'Reports',
  //   icon: BarChart3,
  //   submenu: true,
  //   href: '/reports',
  //   children: [
  //     { id: 'generate-report', label: 'Generate Report', href: '/reports/generate' },
  //     { id: 'report-history', label: 'Report History', href: '/reports/history' },
  //     { id: 'download-center', label: 'Download Center', href: '/reports/download' },
  //   ],
  // },
  // {
  //   id: 'analytics',
  //   label: 'Analytics',
  //   icon: Zap,
  //   href: '/analytics',
  // },
  // {
  //   id: 'system-alerts',
  //   label: 'System Alerts',
  //   icon: Zap,
  //   href: '/alerts',
  // },
  {
    id: 'settings',
    label: 'Settings',
    icon: Settings,
    submenu: true,
    href: '/settings',
    children: [
      { id: 'Admin Settings', label: 'Admin Settings', href: '/settings/platform' },
      // { id: 'Guest List', label: 'Guest List', href: '/settings/config' },
      { id: 'Profile Settings', label: 'Profile Settings', href: '/settings/profile' },
    ]
  },
  // {
  //   id: 'security',
  //   label: 'Security Access Logs',
  //   icon: Shield,
  //   href: '/security',
  // },
]

export default function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const [expandedItems, setExpandedItems] = useState<string[]>([])
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false)

  // Expand submenu if current route matches any child
  useEffect(() => {
    const expanded: string[] = []
    menuItems.forEach((item) => {
      if (item.submenu && item.children) {
        if (
          item.children.some((child) => {
            const matchPath = 'activePath' in child ? child.activePath : child.href
            return pathname === matchPath || pathname.startsWith(matchPath + '/')
          }) ||
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

  const handleLogout = async () => {
    try {

      localStorage.removeItem('accessToken')
      document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; samesite=lax'
      setIsLogoutModalOpen(false)
      router.replace('/login')
      router.refresh()
    } catch (error) {

    }
  }

  return (
    <aside className="hidden md:flex w-60 bg-[#090A58] text-sidebar-foreground flex-col">
      {/* Logo */}
      <Link href="/" className="px-6 py-6 border-b border-sidebar-border">
        <Logo />
      </Link>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-4">
        {menuItems.map((item) => {
          const IconComponent = item.icon
          const isExpanded = expandedItems.includes(item.id)
          // Active if current route matches parent or any child
          const isActive =
            pathname === item.href ||
            pathname.startsWith(item.href + '/') ||
            (item.children && item.children.some((child) => {
              const matchPath = 'activePath' in child ? child.activePath : child.href
              return pathname === matchPath || pathname.startsWith(matchPath + '/')
            }))

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
                    const matchPath = 'activePath' in child ? child.activePath : child.href
                    const isChildActive =
                      pathname === matchPath || pathname.startsWith(matchPath + '/')
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

      <div className="px-3 py-4 border-t border-sidebar-border">
        <button
          type="button"
          onClick={() => setIsLogoutModalOpen(true)}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-[#FCA5A5] hover:bg-[#F7F4FD1A] transition-all"
        >
          <LogOut className="w-5 h-5 shrink-0" />
          <span className="text-sm font-semibold">Logout</span>
        </button>
      </div>

      {isLogoutModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="w-full max-w-sm rounded-xl bg-white p-6 shadow-xl">
            <h3 className="text-lg font-bold text-gray-900">Confirm Logout</h3>
            <p className="mt-2 text-sm text-gray-600">
              Are you sure you want to logout?
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsLogoutModalOpen(false)}
                className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleLogout}
                className="rounded-lg bg-[#090A58] px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </aside>
  )
}