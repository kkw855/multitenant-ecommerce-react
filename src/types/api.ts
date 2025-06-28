export type Category = {
  id: string
  name: string
  slug: string
  color: string
  subcategories: Subcategory[]
}

export type Subcategory = {
  categoryId: string
  name: string
  slug: string
}
