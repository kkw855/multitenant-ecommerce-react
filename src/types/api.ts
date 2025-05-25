export type Category = {
  id: string
  name: string
  slug: string
  color: string
  subcategories: {
    categoryId: string
    name: string
    slug: string
  }[]
}
