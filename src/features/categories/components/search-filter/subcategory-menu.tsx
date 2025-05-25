import { Link } from '@tanstack/react-router'

import type { Category } from '@/types/api'

type Props = {
  category: Category
  isOpen: boolean
  position: { top: number; left: number }
}

export const SubcategoryMenu = ({ category, isOpen, position }: Props) => {
  if (!isOpen || !category.subcategories.length) return null

  const backgroundColor = category.color

  return (
    <div
      className="fixed z-100"
      style={{ top: position.top, left: position.left }}
    >
      {/* Invisible bridge to maintain hover */}
      <div className="h-3 w-60" />
      <div
        style={{ backgroundColor }}
        className="w-60 text-black rounded-md overflow-hidden border shodow-[4px_4px_0px_0px_rgba(0,0,0,1)] -translate-x-[2px] -translate-y-[2px]"
      >
        <div>
          {category.subcategories.map((subcategory) => (
            <Link
              key={subcategory.slug}
              to="/"
              className="text-left p-4 hover:bg-black hover:text-white block underline font-medium"
            >
              {subcategory.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
