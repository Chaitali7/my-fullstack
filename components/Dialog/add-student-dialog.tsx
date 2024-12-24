"use client"

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Student } from '@/lib/types'

type AddStudentDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (student: Omit<Student, 'id' | 'date_joined' | 'last_login' | 'courses'>) => Promise<void>
}

export function AddStudentDialog({ open, onOpenChange, onSubmit }: AddStudentDialogProps) {
  const [name, setName] = useState('')
  const [cohort, setCohort] = useState('AY 2024-25')
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await onSubmit({
        name,
        cohort,
        status: true
      })
      
      // Reset form
      setName('')
      setCohort('AY 2024-25')
    } catch (error) {
      console.error('Error submitting student:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Student</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">Student Name</label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="cohort" className="text-sm font-medium">Cohort</label>
            <Select value={cohort} onValueChange={setCohort}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="AY 2024-25">AY 2024-25</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Adding...' : 'Add Student'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}