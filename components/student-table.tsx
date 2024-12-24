'use client'

import { useStore } from "@/store/useStore"
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import StatusBadge from "./status-badge"
import { formatDate } from "@/lib/utils"
import { Pencil, Trash2 } from "lucide-react"
import { useState } from "react"

export default function StudentTable() {
  const { 
    students,
    deleteStudent, 
    setSelectedStudent,
    isLoading,
    filters 
  } = useStore()
  
  const [deletingId, setDeletingId] = useState<string | null>(null)

  // Filter students based on search term and year
  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(filters.search.toLowerCase())
    const matchesYear = student.cohort === filters.year
    return matchesSearch && matchesYear
  })

  const handleDelete = async (id: string) => {
    try {
      setDeletingId(id)
      await deleteStudent(id)
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Student Name</TableHead>
            <TableHead>Cohort</TableHead>
            <TableHead>Courses</TableHead>
            <TableHead>Date Joined</TableHead>
            <TableHead>Last Login</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center">
                Loading students...
              </TableCell>
            </TableRow>
          ) : filteredStudents.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center">
                No students found
              </TableCell>
            </TableRow>
          ) : (
            filteredStudents.map((student) => (
              <TableRow key={student.id}>
                <TableCell className="font-medium">{student.name}</TableCell>
                <TableCell>{student.cohort}</TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {student.courses.map(course => (
                      <span 
                        key={course.id} 
                        className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700"
                      >
                        {course.name}
                      </span>
                    ))}
                  </div>
                </TableCell>
                <TableCell>{formatDate(student.date_joined)}</TableCell>
                <TableCell>{formatDate(student.last_login)}</TableCell>
                <TableCell>
                  <StatusBadge status={student.status} />
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setSelectedStudent(student.id)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      disabled={deletingId === student.id}
                      onClick={() => handleDelete(student.id)}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}