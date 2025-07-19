import { ListFilterIcon } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

import { Button } from '@/components/shadcn/ui/button'
import { CategoriesSidebar } from '@/features/categories/components/search-filter/categories-sidebar'
import { CategoryDropdown } from '@/features/categories/components/search-filter/category-dropdown'
import { cn } from '@/lib/utils'

import type { Category } from '@/types/api'

export const Categories = ({ data }: { data: Category[] }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const measureRef = useRef<HTMLDivElement>(null)
  const viewAllRef = useRef<HTMLDivElement>(null)

  const [visibleCount, setVisibleCount] = useState(data.length)
  const [isAnyHovered, setIsAnyHovered] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const activeCategory = 'all'
  const activeCategoryIndex = data.findIndex(
    (cat) => activeCategory === cat.slug,
  )
  const isActiveCategoryHidden =
    activeCategoryIndex !== -1 && activeCategoryIndex >= visibleCount

  useEffect(() => {
    const calculateVisible = () => {
      if (!containerRef.current || !measureRef.current || !viewAllRef.current)
        return

      const containerWidth = containerRef.current.offsetWidth
      const viewAllWidth = viewAllRef.current.offsetWidth
      const availableWidth = containerWidth - viewAllWidth

      const items = Array.from(measureRef.current.children)
      let totalWidth = 0
      let visible = 0

      for (const item of items) {
        const width = item.getBoundingClientRect().width

        if (totalWidth + width > availableWidth) break

        totalWidth += width
        visible++
      }

      setVisibleCount(visible)

      // console.log({
      //   containerWidth,
      //   viewAllWidth,
      //   availableWidth,
      //   items,
      //   totalWidth,
      //   visible,
      // })
    }

    const resizeObserver = new ResizeObserver(calculateVisible)
    if (containerRef.current) resizeObserver.observe(containerRef.current)

    return () => resizeObserver.disconnect()
  }, [])

  return (
    <div className="relative w-full">
      <CategoriesSidebar
        open={isSidebarOpen}
        onOpenChange={setIsSidebarOpen}
        data={data}
      />

      {/* Hidden div to measure all items */}
      <div
        ref={measureRef}
        className="absolute pointer-events-none flex"
        style={{ position: 'fixed', top: -9999, left: -9999 }}
      >
        {data.map((category) => (
          <CategoryDropdown
            key={category.id}
            category={category}
            isActive={activeCategory === category.slug}
            isNavigationHovered={false}
          />
        ))}
      </div>

      {/* Visible items */}
      <div
        ref={containerRef}
        className="flex items-center flex-nowrap"
        onMouseEnter={() => setIsAnyHovered(true)}
        onMouseLeave={() => setIsAnyHovered(false)}
      >
        {data.slice(0, visibleCount).map((category) => (
          <CategoryDropdown
            key={category.id}
            category={category}
            isActive={activeCategory === category.slug}
            isNavigationHovered={isAnyHovered}
          />
        ))}

        <div ref={viewAllRef} className="shrink-0">
          <Button
            variant="elevated"
            className={cn(
              'h-11 px-4 bg-transparent border-transparent rounded-full hover:bg-white hover:border-primary text-black',
              isActiveCategoryHidden &&
                !isAnyHovered &&
                'bg-white border-primary',
            )}
            onClick={() => setIsSidebarOpen(true)}
          >
            View All
            <ListFilterIcon className="ml-2" />
          </Button>
        </div>
      </div>
    </div>
  )
}
