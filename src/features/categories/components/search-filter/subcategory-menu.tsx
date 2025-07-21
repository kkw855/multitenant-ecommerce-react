import { useNavigate } from '@tanstack/react-router'

import type { Category, Subcategory } from '@/types/api'

type Props = {
  category: Category
  isOpen: boolean
  position: { top: number; left: number }
}

export const SubcategoryMenu = ({ category, isOpen, position }: Props) => {
  const navigate = useNavigate()

  if (!isOpen || !category.subcategories.length) return null

  const backgroundColor = category.color

  const handleClick = (subcategory: Subcategory) => {
    void navigate({
      to: '/$category/$subcategory',
      params: { category: category.slug, subcategory: subcategory.slug },
    })
  }

  return (
    <div
      className="fixed z-100"
      style={{ top: position.top, left: position.left }}
    >
      {/* Invisible bridge to maintain hover */}
      <div className="h-3 w-60" />
      <div
        style={{ backgroundColor }}
        className="w-60 rounded-md overflow-hidden border shodow-[4px_4px_0px_0px_rgba(0,0,0,1)] -translate-x-[2px] -translate-y-[2px]"
      >
        <div>
          {category.subcategories.map((subcategory) => (
            <button
              key={subcategory.slug}
              type="button"
              className="w-full text-left p-4 cursor-pointer text-black hover:bg-black hover:text-white block underline font-medium"
              onClick={() => handleClick(subcategory)}
            >
              {subcategory.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
