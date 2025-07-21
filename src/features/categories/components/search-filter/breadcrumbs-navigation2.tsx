import { Link } from '@tanstack/react-router'
import { Slash } from 'lucide-react'

type Props = {
  activeCategorySlug: string | null
  activeCategoryName: string | null
  activeSubcategoryName: string | null
}

export const BreadcrumbsNavigation2 = ({
  activeCategorySlug,
  activeCategoryName,
  activeSubcategoryName,
}: Props) => {
  console.log(activeCategorySlug, activeCategoryName, activeSubcategoryName)

  if (!activeCategorySlug) return null

  return (
    <ul className="flex gap-2 text-xl font-medium text-primary items-center">
      {activeSubcategoryName ? (
        <>
          <li>
            <Link
              to="/$category"
              params={{ category: activeCategorySlug }}
              className="underline"
            >
              {activeCategoryName}
            </Link>
          </li>
          <Slash className="size-3 text-gray-500" />
          <li>{activeSubcategoryName}</li>
        </>
      ) : (
        <li>{activeCategoryName}</li>
      )}
    </ul>
  )
}
