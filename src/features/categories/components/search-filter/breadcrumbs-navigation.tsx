import { Link } from '@tanstack/react-router'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/shadcn/ui/breadcrumb'

type Props = {
  activeCategorySlug: string | null
  activeCategoryName: string | null
  activeSubcategoryName: string | null
}

export const BreadcrumbsNavigation = ({
  activeCategorySlug,
  activeCategoryName,
  activeSubcategoryName,
}: Props) => {
  console.log(activeCategorySlug, activeCategoryName, activeSubcategoryName)
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {activeSubcategoryName ? (
          <>
            <BreadcrumbItem>
              <BreadcrumbLink
                className="text-xl font-medium underline text-primary"
                asChild
              >
                <Link to={`/${activeCategorySlug}`}>{activeCategoryName}</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>/</BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbPage className="text-xl font-medium">
                {activeSubcategoryName}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </>
        ) : (
          <BreadcrumbItem>
            <BreadcrumbPage className="text-xl font-medium">
              {activeCategoryName}
            </BreadcrumbPage>
          </BreadcrumbItem>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
