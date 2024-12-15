'use client'

import { ArrowLeft } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation'

const GoBackButton = () => {
  const router = useRouter()
  
  return (
    <Button
      variant="ghost"
      onClick={() => router.push('/')}
      className=" group bg-gray-900 hover:bg-gray-800 text-gray-200 hover:text-white border border-gray-700 hover:border-gray-600 transition-all duration-300 ease-in-out rounded-lg px-4 py-2 shadow-lg hover:shadow-xl"
    >
      <ArrowLeft 
        className="mr-2 h-4 w-4 transition-all duration-300 group-hover:-translate-x-1 group-hover:scale-110" 
        strokeWidth={2}
      />
      <span className="font-medium">Go to blogs</span>
    </Button>
  )
}

export default GoBackButton;