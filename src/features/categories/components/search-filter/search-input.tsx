import { ListFilterIcon, SearchIcon } from 'lucide-react'
import { useState } from 'react'

import { Input } from '@/components/ui/input'
import { CategoriesSidebar } from '@/features/categories/components/search-filter/categories-sidebar'

import type { Category } from '@/types/api'
import { Button } from '@/components/ui/button'

export const SearchInput = ({
  data,
  disabled,
}: {
  data: Category[]
  disabled?: boolean
}) => {
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
      {/* TODO: Add categories view all button */}
      <Button
        variant="elevated"
        className="size-12 shrink-0 flex lg:hidden"
        onClick={() => setIsSidebarOpen(true)}
      >
        <ListFilterIcon />
      </Button>
      {/* TODO: Add library button */}
    </div>
  )
}
