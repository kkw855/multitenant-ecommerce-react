import { useNavigate } from '@tanstack/react-router'
import { useRef, useState } from 'react'

import { Button } from '@/components/ui/button'
import { SubcategoryMenu } from '@/features/categories/components/search-filter/subcategory-menu'
import { useDropdownPosition } from '@/features/categories/components/search-filter/use-dropdown-position'
import { cn } from '@/lib/utils'

import type { Category } from '@/types/api'

type Props = {
  category: Category
  isActive: boolean
  isNavigationHovered: boolean
}

export const CategoryDropdown = ({
  category,
  isActive,
  isNavigationHovered,
}: Props) => {
  const navigate = useNavigate()

  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const { getDropdownPosition } = useDropdownPosition(dropdownRef)

  const onMouseEnter = () => {
    if (category.subcategories.length) {
      setIsOpen(true)
    }
  }

  const onMouseLeave = () => {
    setIsOpen(false)
  }

  const handleClick = (category: Category) => {
    void navigate({ to: '/$category', params: { category: category.slug } })
  }

  const dropdownPosition = getDropdownPosition()

  return (
    <div
      role="button"
      tabIndex={0}
      className="relative"
      ref={dropdownRef}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="relative">
        <Button
          variant="elevated"
          className={cn(
            'h-11 px-4 bg-transparent border-transparent rounded-full hover:bg-white hover:border-primary text-black',
            isActive && !isNavigationHovered && 'bg-white border-primary',
            isOpen &&
              'bg-white border-primary shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] -translate-x-[4px] -translate-y-[4px]',
          )}
          onClick={() => handleClick(category)}
        >
          <span>{category.name}</span>
        </Button>
        {category.subcategories.length !== 0 && (
          <div
            className={cn(
              'opacity-0 absolute -bottom-3 w-0 h-0 border-l-[10px] border-r-[10px] border-b-[10px] border-l-transparent border-r-transparent border-b-black left-1/2 -translate-x-1/2',
              isOpen && 'opacity-100',
            )}
          />
        )}
      </div>

      <SubcategoryMenu
        category={category}
        isOpen={isOpen}
        position={dropdownPosition}
      />
    </div>
  )
}
