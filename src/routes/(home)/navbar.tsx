import { Link, useLocation } from '@tanstack/react-router'
import { MenuIcon } from 'lucide-react'
import { type ReactNode, useState } from 'react'

import { Button } from '@/components/ui/button.tsx'
import { cn } from '@/lib/utils.ts'
import { NavbarSidebar } from '@/routes/(home)/navbar-sidebar.tsx'

const NavbarItem = ({
  href,
  children,
  isActive,
}: {
  href: string
  children: ReactNode
  isActive?: boolean
}) => {
  return (
    <Button
      asChild
      variant="outline"
      className={cn(
        'bg-transparent hover:bg-transparent rounded-full hover:border-primary border-transparent px-3.5 text-lg',
        isActive && 'bg-black text-white hover:bg-white hover:text-black',
      )}
    >
      <Link to={href}>{children}</Link>
    </Button>
  )
}

const navbarItems = [
  { href: '/', children: 'Home' },
  { href: '/about', children: 'About' },
  { href: '/features', children: 'Features' },
  { href: '/pricing', children: 'Pricing' },
  { href: '/Contact', children: 'Contact' },
]

export const Navbar = () => {
  const location = useLocation()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <nav className="h-20 flex border-b justify-between font-medium bg-white">
      <Link to="/" className="pl-6 content-center">
        <span className={cn('text-5xl font-semibold font-poppins')}>
          funroad
        </span>
      </Link>

      <NavbarSidebar
        items={navbarItems}
        open={isSidebarOpen}
        onOpenChange={setIsSidebarOpen}
      />

      <div className="items-center gap-4 hidden lg:flex">
        {navbarItems.map((item) => (
          <NavbarItem
            key={item.href}
            href={item.href}
            isActive={location.pathname === item.href}
          >
            {item.children}
          </NavbarItem>
        ))}
      </div>

      <div className="hidden lg:flex">
        <Button
          asChild
          className="border-l px-12 h-full rounded-none bg-white text-black hover:bg-pink-400 text-lg transition-colors"
        >
          <Link to="/sign-in">Log in</Link>
        </Button>
        <Button
          asChild
          className="border-l px-12 h-full rounded-none bg-black text-white hover:bg-pink-400 hover:text-black text-lg transition-colors"
        >
          <Link to="/sign-up">Start selling</Link>
        </Button>
      </div>

      <div className="lg:hidden">
        <Button
          variant="ghost"
          className="size-12 border-transparent bg-white"
          onClick={() => setIsSidebarOpen(true)}
        >
          <MenuIcon />
        </Button>
      </div>
    </nav>
  )
}
