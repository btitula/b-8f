import { Skeleton } from '@/components/ui/skeleton'

interface FormSkeletonProps {
  fields?: number
}

export const FormSkeleton = ({ fields = 2 }: FormSkeletonProps) => {
  return (
    <div className="w-full space-y-2 animate-in fade-in duration-300">
      {/* Logo skeleton */}
      <div className="flex justify-center mb-8">
        <Skeleton className="h-12 w-44" />
      </div>

      {/* Input fields skeleton */}
      {Array.from({ length: fields }).map((_, index) => (
        <Skeleton key={index} className="h-10 w-full" />
      ))}

      {/* Button skeleton */}
      <Skeleton className="h-10 w-full mt-4" />

      {/* Divider skeleton */}
      <div className="flex items-center w-full my-4">
        <Skeleton className="flex-1 h-px" />
        <Skeleton className="h-4 w-8 mx-4" />
        <Skeleton className="flex-1 h-px" />
      </div>

      {/* OAuth button skeleton */}
      <Skeleton className="h-10 w-full" />
    </div>
  )
}
