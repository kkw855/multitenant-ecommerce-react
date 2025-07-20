import { Link } from '@tanstack/react-router'
import { BookmarkCheckIcon, ListFilterIcon, SearchIcon } from 'lucide-react'
import { useState } from 'react'

import { useAuth } from '@/components/layouts/auth-provider'
import { Button } from '@/components/shadcn/ui/button'
import { Input } from '@/components/shadcn/ui/input'
import { CategoriesSidebar } from '@/features/categories/components/search-filter/categories-sidebar'

import type { Category } from '@/types/api'

export const SearchInput = ({
  data,
  disabled,
}: {
  data: Category[]
  disabled?: boolean
}) => {
  const { user } = useAuth()

  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <div className="flex items-center gap-2 w-full">
      <CategoriesSidebar
        open={isSidebarOpen}
        onOpenChange={setIsSidebarOpen}
        data={data}
      />
      <div className="relative w-full">
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-neutral-500" />
        <Input
          className="pl-8"
          placeholder="Search products"
          disabled={disabled}
        />
      </div>
      <Button
        variant="elevated"
        className="size-12 shrink-0 flex lg:hidden"
        onClick={() => setIsSidebarOpen(true)}
      >
        <ListFilterIcon />
      </Button>
      {user && (
        <Button variant="elevated" asChild>
          <Link to="/library">
            <BookmarkCheckIcon /> Library
          </Link>
        </Button>
      )}
    </div>
  )
}
