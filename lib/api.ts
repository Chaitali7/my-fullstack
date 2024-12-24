import { supabase } from './supabase'
import { Student, NewStudent } from './types'

export const studentApi = {
  async getStudents(): Promise<Student[]> {
    const { data, error } = await supabase
      .from('students')
      .select(`
        *,
        student_courses(
          course:courses(*)
        )
      `)
      .order('name')
    
    if (error) throw error
    
    return data.map(student => ({
      ...student,
      courses: student.student_courses.map((sc: any) => sc.course)
    }))
  },

  async createStudent(student: NewStudent): Promise<string> {
    // Start a Supabase transaction
    const { data, error } = await supabase
      .from('students')
      .insert({
        name: student.name,
        cohort: student.cohort,
        status: student.status
      })
      .select()
      .single()

    if (error) throw error

    // If courses are provided, create course associations
    if (student.courseIds?.length) {
      const courseAssociations = student.courseIds.map(courseId => ({
        student_id: data.id,
        course_id: courseId
      }))

      const { error: courseError } = await supabase
        .from('student_courses')
        .insert(courseAssociations)

      if (courseError) throw courseError
    }

    return data.id
  },

  async updateStudent(id: string, updates: Partial<NewStudent>): Promise<void> {
    const { courseIds, ...studentUpdates } = updates

    // Update student details
    if (Object.keys(studentUpdates).length > 0) {
      const { error } = await supabase
        .from('students')
        .update(studentUpdates)
        .eq('id', id)

      if (error) throw error
    }

    // Update course associations if provided
    if (courseIds) {
      // First delete existing associations
      const { error: deleteError } = await supabase
        .from('student_courses')
        .delete()
        .eq('student_id', id)

      if (deleteError) throw deleteError

      // Then create new ones
      if (courseIds.length > 0) {
        const { error: insertError } = await supabase
          .from('student_courses')
          .insert(courseIds.map(courseId => ({
            student_id: id,
            course_id: courseId
          })))

        if (insertError) throw insertError
      }
    }
  },

  async deleteStudent(id: string): Promise<void> {
    const { error } = await supabase
      .from('students')
      .delete()
      .eq('id', id)

    if (error) throw error
  }
}