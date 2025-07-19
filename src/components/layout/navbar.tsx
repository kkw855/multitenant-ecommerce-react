import { Link, useLocation } from '@tanstack/react-router'
import { MenuIcon } from 'lucide-react'
import { type ReactNode, useState } from 'react'

import { NavbarSidebar } from '@/components/layout/navbar-sidebar'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useAuth } from '@/features/auth/auth-provider'

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
  { href: '/contact', children: 'Contact' },
  { href: '/welcome', children: 'Welcome' },
]

export const Navbar = () => {
  const { accessToken } = useAuth()

  const location = useLocation()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <nav className="h-20 flex border-b justify-between font-medium bg-white">
      <Link to="/" className="pl-6 content-center">
        <span className="text-5xl font-semibold font-poppins">funroad</span>
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

      {/* TODO: 로그인 상태일 때는 Logout 버튼 보여주기 */}
      <div className="hidden lg:flex">
        {accessToken ? (
          <Button
            asChild
            className="border-l px-12 h-full rounded-none bg-black text-white hover:bg-pink-400 hover:text-black text-lg transition-colors"
          >
            <Link to="/sign-up">Dashboard</Link>
          </Button>
        ) : (
          <>
            <Button
              asChild
              className="border-l px-12 h-full rounded-none bg-white text-black hover:bg-pink-400 text-lg transition-colors"
            >
              {/* TODO: prefetch */}
              <Link to="/sign-in">Log in</Link>
            </Button>
            <Button
              asChild
              className="border-l px-12 h-full rounded-none bg-black text-white hover:bg-pink-400 hover:text-black text-lg transition-colors"
            >
              {/* TODO: prefetch */}
              <Link to="/sign-up">Start selling</Link>
            </Button>
          </>
        )}
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
