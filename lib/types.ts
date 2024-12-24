export interface Course {
    id: string
    name: string
    code: string
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
  export interface NewStudent {
    name: string
    cohort: string
    status: boolean
    courseIds?: string[] // Course IDs to associate with student
  }
  
  // For filtering students
  export interface StudentFilters {
    year: string
    class: string
    search: string
  }