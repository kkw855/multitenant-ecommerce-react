import { Link } from '@tanstack/react-router'

import { ScrollArea } from '@/components/shadcn/ui/scroll-area'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/shadcn/ui/sheet'

type Props = {
  items: { href: string; children: string }[]
  open: boolean
  onOpenChange: (open: boolean) => void
}

export const NavbarSidebar = ({ items, open, onOpenChange }: Props) => {
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
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}
