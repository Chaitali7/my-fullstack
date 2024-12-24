
export interface Course {
    id: string
    name: string
  }
  
  export interface Student {
    id: string
    name: string
    cohort: string
    courses: Course[]
    date_joined: string
    last_login: string
    status: boolean
  }
  
  // For creating new students
  export type NewStudent = Omit<Student, 'id' | 'date_joined' | 'last_login' | 'courses'> & {
    courses?: string[] // Course IDs to associate with student
  }

  