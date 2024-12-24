// lib/api.ts
import { supabase } from './supabase'
import { Student, NewStudent } from './types'

export const studentApi = {
  async getStudents(): Promise<Student[]> {
    const { data, error } = await supabase
      .from('students')
      .select(`
        *,
        courses:student_courses(
          course:courses(*)
        )
      `)
    
    if (error) throw error
    
    return data.map(student => ({
      ...student,
      courses: student.courses.map((sc: any) => sc.course)
    }))
  },

  async createStudent(student: NewStudent): Promise<void> {
    const { error } = await supabase
      .from('students')
      .insert([{
        name: student.name,
        cohort: student.cohort,
        status: student.status
      }])

    if (error) throw error

    // If courses are provided, create course associations
    if (student.courses?.length) {
      const { error: courseError } = await supabase
        .from('student_courses')
        .insert(
          student.courses.map(courseId => ({
            student_id: student,
            course_id: courseId
          }))
        )

      if (courseError) throw courseError
    }
  },

  async updateStudent(id: string, updates: Partial<Student>): Promise<void> {
    const { error } = await supabase
      .from('students')
      .update(updates)
      .eq('id', id)

    if (error) throw error
  },

  async deleteStudent(id: string): Promise<void> {
    const { error } = await supabase
      .from('students')
      .delete()
      .eq('id', id)

    if (error) throw error
  }
}
