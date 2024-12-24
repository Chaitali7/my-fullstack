import { create } from 'zustand'
import { Student, NewStudent } from '@/lib/types'
import { studentApi } from '@/lib/api'
import { Calendar, Home, Inbox, LucideIcon, Search, Settings } from 'lucide-react'

// Type definitions
interface MenuItem {
  title: string
  url: string
  icon: LucideIcon
}

interface StudentFilters {
  year: string
  class: string
  search: string
}

interface AppState {
  // UI State
  sidebarItems: MenuItem[]
  activePage: string
  selectedStudent: string | null

  // Student State
  students: Student[]
  isLoading: boolean
  error: string | null
  filters: StudentFilters

  // UI Actions
  setActivePage: (page: string) => void
  setSelectedStudent: (studentId: string | null) => void
  
  // Student Actions
  setStudents: (students: Student[]) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  setFilters: (filters: Partial<StudentFilters>) => void
  resetFilters: () => void
  
  // Computed Properties
  filteredStudents: () => Student[]
  getStudentById: (id: string) => Student | undefined
  
  // Async Student Actions
  fetchStudents: () => Promise<void>
  addStudent: (student: NewStudent) => Promise<void>
  updateStudent: (id: string, updates: Partial<Student>) => Promise<void>
  deleteStudent: (id: string) => Promise<void>
}

// Default filter values
const DEFAULT_FILTERS: StudentFilters = {
  year: 'AY 2024-25',
  class: 'CBSE 9',
  search: '',
}

// Create the store
export const useStore = create<AppState>((set, get) => ({
  // UI Initial State
  sidebarItems: [
    {
      title: "Home",
      url: "/",
      icon: Home,
    },
    {
      title: "Inbox",
      url: "/inbox",
      icon: Inbox,
    },
    {
      title: "Calendar",
      url: "/calendar",
      icon: Calendar,
    },
    {
      title: "Search",
      url: "/search",
      icon: Search,
    },
    {
      title: "Settings",
      url: "/settings",
      icon: Settings,
    },
  ],
  activePage: 'Home',
  selectedStudent: null,

  // Student Initial State
  students: [],
  isLoading: false,
  error: null,
  filters: DEFAULT_FILTERS,

  // UI Actions
  setActivePage: (page) => set({ activePage: page }),
  setSelectedStudent: (studentId) => set({ selectedStudent: studentId }),

  // Student Actions
  setStudents: (students) => set({ students }),
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
  setFilters: (filters) => set((state) => ({
    filters: { ...state.filters, ...filters }
  })),
  resetFilters: () => set({ filters: DEFAULT_FILTERS }),

  // Computed Properties
  filteredStudents: () => {
    const { students, filters } = get()
    return students.filter(student => {
      const matchesYear = !filters.year || student.cohort === filters.year
      const matchesClass = !filters.class || 
        student.courses.some(c => c.name.includes(filters.class))
      const matchesSearch = !filters.search || 
        student.name.toLowerCase().includes(filters.search.toLowerCase())
      return matchesYear && matchesClass && matchesSearch
    })
  },
  getStudentById: (id) => get().students.find(s => s.id === id),

  // Async Student Actions
  fetchStudents: async () => {
    const { setLoading, setStudents, setError } = get()
    try {
      setLoading(true)
      setError(null)
      const students = await studentApi.getStudents()
      setStudents(students)
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to fetch students')
    } finally {
      setLoading(false)
    }
  },

  addStudent: async (student) => {
    const { setLoading, setError, fetchStudents } = get()
    try {
      setLoading(true)
      setError(null)
      await studentApi.createStudent(student)
      await fetchStudents()
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to add student')
      throw error
    } finally {
      setLoading(false)
    }
  },

  updateStudent: async (id, updates) => {
    const { setLoading, setError, fetchStudents } = get()
    try {
      setLoading(true)
      setError(null)
      await studentApi.updateStudent(id, updates)
      await fetchStudents()
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to update student')
      throw error
    } finally {
      setLoading(false)
    }
  },

  deleteStudent: async (id) => {
    const { setLoading, setError, fetchStudents } = get()
    try {
      setLoading(true)
      setError(null)
      await studentApi.deleteStudent(id)
      await fetchStudents()
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to delete student')
      throw error
    } finally {
      setLoading(false)
    }
  },
}))