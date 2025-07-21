import { createFileRoute } from '@tanstack/react-router'
import { Slash } from 'lucide-react'

export const Route = createFileRoute('/breadcrumbs')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="bg-white">
      <ul className="flex border p-2 gap-6 text-xl text-[#2E4053] items-center">
        <li className="cursor-pointer hover:bg-[#E8DAEF] p-4 rounded-md">
          Home
        </li>
        <Slash className="size-5 " />
        <li className="cursor-pointer hover:bg-[#E8DAEF] p-4 rounded-md transition-all duration-300">
          Products
        </li>
        <Slash className="size-5 " />
        <li className="cursor-pointer hover:bg-[#E8DAEF] p-4 rounded-md">
          About
        </li>
        <Slash className="size-5 " />
        <li className="cursor-pointer hover:bg-[#E8DAEF] p-4 rounded-md">
          FAQ
        </li>
      </ul>
    </div>
  )
}
