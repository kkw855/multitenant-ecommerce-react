import { Link, useNavigate } from '@tanstack/react-router'

import { useAuth } from '@/components/layouts/auth-provider'
import { ScrollArea } from '@/components/shadcn/ui/scroll-area'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/shadcn/ui/sheet'
import { Button } from '@/components/ui/button'

type Props = {
  items: { href: string; children: string }[]
  open: boolean
  onOpenChange: (open: boolean) => void
}

export const NavbarSidebar = ({ items, open, onOpenChange }: Props) => {
  const { user, logout } = useAuth()

  const navigate = useNavigate()

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="p-0 transition-none">
        <SheetHeader className="p-4 border-b">
          <SheetTitle>Menu</SheetTitle>
          <SheetDescription />
        </SheetHeader>
        <ScrollArea className="flex flex-col h-full pb-2 overflow-y-auto">
          {items.map(({ href, children }) => (
            <Link
              key={href}
              to={href}
              className="block p-4 hover:bg-black hover:text-white text-base font-medium"
              onClick={() => onOpenChange(false)}
            >
              {children}
            </Link>
          ))}
          <div className="border-t">
            {user ? (
              <Button
                type="button"
                variant="ghost"
                className="w-full h-[56px] rounded-none block text-left p-4 hover:bg-black hover:text-white text-base font-medium"
                onClick={async () => {
                  await logout()
                  onOpenChange(false)
                  navigate({ to: '/sign-in' })
                }}
              >
                Log out
              </Button>
            ) : (
              <>
                <Link
                  to="/sign-in"
                  className="block p-4 hover:bg-black hover:text-white text-base font-medium"
                  onClick={() => onOpenChange(false)}
                >
                  Log in
                </Link>
                <Link
                  to="/sign-up"
                  className="block p-4 hover:bg-black hover:text-white text-base font-medium"
                  onClick={() => onOpenChange(false)}
                >
                  Start selling
                </Link>
              </>
            )}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}
