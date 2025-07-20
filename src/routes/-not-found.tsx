import { useCanGoBack, useRouter } from '@tanstack/react-router'

import notFoundImage from '@/assets/images/page-not-found.png'
import { Button } from '@/components/shadcn/ui/button'

export const NotFound = () => {
  const router = useRouter()
  const canGoBack = useCanGoBack()

  return (
    <div className="flex-1 flex flex-col justify-center items-center">
      <img src={notFoundImage} alt="not-found" className="w-[500px]" />
      {canGoBack && (
        <Button onClick={() => router.history.back()}>Go back</Button>
      )}
    </div>
  )
}
