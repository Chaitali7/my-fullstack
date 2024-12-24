import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface StatusBadgeProps {
  status: boolean
  className?: string
}

export default function StatusBadge({ status, className }: StatusBadgeProps) {
  return (
    <Badge 
      className={cn(
        "min-w-[80px] justify-center",
        status ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700",
        className
      )}
    >
      {status ? 'Active' : 'Inactive'}
    </Badge>
  )
}