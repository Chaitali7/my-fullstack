import { useStore } from "@/store/useStore"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function SearchFilters() {
  const { filters, setFilters, resetFilters } = useStore()

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <div className="flex-1">
          <Input
            placeholder="Search students..."
            value={filters.search}
            onChange={(e) => setFilters({ search: e.target.value })}
          />
        </div>
        <Select
          value={filters.year}
          onValueChange={(value) => setFilters({ year: value })}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select year" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="AY 2024-25">AY 2024-25</SelectItem>
          </SelectContent>
        </Select>
        <Select
          value={filters.class}
          onValueChange={(value) => setFilters({ class: value })}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select class" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="CBSE 9">CBSE 9</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}