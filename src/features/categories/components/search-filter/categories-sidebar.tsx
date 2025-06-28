import { useNavigate } from '@tanstack/react-router'
import { Option, pipe } from 'effect'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import { useState } from 'react'

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'

import type { Category, Subcategory } from '@/types/api'

type Option<A> = Option.Option<A>

type Props = {
  open: boolean
  onOpenChange: (open: boolean) => void
  data: Category[]
}

type Menu = {
  name: string
  slug: string
  color?: string
  subcategories?: Subcategory[]
}

export const CategoriesSidebar = ({ open, onOpenChange, data }: Props) => {
  const navigate = useNavigate()

  const [subcategories, setSubcategories] = useState<Option<Menu[]>>(
    Option.none(),
  )
  const [selectedCategory, setSelectedCategory] = useState<Option<Menu>>(
    Option.none(),
  )

  // If we have parent categories, show those, otherwise show root categories
  const currentCategories: Menu[] = Option.getOrElse(subcategories, () => data)

  const backgroundColor = pipe(
    selectedCategory,
    Option.flatMapNullable((_) => _.color),
    Option.getOrElse(() => 'white'),
  )

  const handleOpenChange = (open: boolean) => {
    setSubcategories(Option.none())
    setSelectedCategory(Option.none())
    onOpenChange(open)
  }

  const handleCategoryClick = async (category: Menu) => {
    pipe(
      Option.fromNullable(category.subcategories),
      Option.filter((subcategories) => subcategories.length > 0),
      Option.match({
        onSome: (subcategories) => {
          setSubcategories(Option.some(subcategories))
          setSelectedCategory(Option.some(category))
        },
        onNone: async () => {
          const url = pipe(
            Option.product(selectedCategory, subcategories),
            Option.match({
              onSome: ([selectedCategory]) => {
                // This is a Subcategory - navigate to /category/subcategory
                return `/${selectedCategory?.slug}/${category.slug}`
              },
              onNone: () => {
                // This is a Category - navigating to /category
                return category.slug === 'all' ? '/' : `/${category.slug}`
              },
            }),
          )

          handleOpenChange(false)
          await navigate({ to: url })
        },
      }),
    )
  }

  const handleBackClick = () => {
    setSubcategories(Option.none())
    setSelectedCategory(Option.none())
  }

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetContent
        side="left"
        className="p-0 transition-none"
        style={{ backgroundColor }}
      >
        <SheetHeader className="p-4 border-b">
          <SheetTitle>Categories</SheetTitle>
        </SheetHeader>
        <div className="overflow-y-auto">
          {Option.isSome(subcategories) && (
            <button
              onClick={() => handleBackClick()}
              className="w-full text-left p-4 hover:bg-black hover:text-white flex items-center text-base font-medium cursor-pointer"
            >
              <ChevronLeftIcon className="size-4 mr-2" />
              Back
            </button>
          )}
          {currentCategories.map((category) => (
            <button
              key={category.slug}
              onClick={() => handleCategoryClick(category)}
              className="w-full text-left p-4 hover:bg-black hover:text-white flex justify-between items-center text-base font-medium cursor-pointer"
            >
              {category.name}
              {category?.subcategories && category.subcategories.length > 0 && (
                <ChevronRightIcon className="size-4" />
              )}
            </button>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  )
}
