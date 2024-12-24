import { create } from 'zustand'
import { Student } from '@/lib/types'
import { studentApi } from '@/lib/api'
import { Calendar, Inbox, LucideIcon, Search, Settings } from 'lucide-react'

// Add interface for sidebar menu items
interface MenuItem {
  title: string
  url: string
  icon: LucideIcon
}

interface AppState {
  // UI State
  sidebarItems: MenuItem[]
  activePage: string

  // Student State
  students: Student[]
  isLoading: boolean
  error: string | null
  filters: {
    year: string
    class: string
    search: string
  }

  // UI Actions
  setActivePage: (page: string) => void

  // Student Actions
  setStudents: (students: Student[]) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  setFilters: (filters: Partial<AppState['filters']>) => void
  
  // Async Student Actions
  fetchStudents: () => Promise<void>
  addStudent: (student: Omit<Student, 'id' | 'date_joined' | 'last_login' | 'courses'>) => Promise<void>
  updateStudent: (id: string, updates: Partial<Student>) => Promise<void>
  deleteStudent: (id: string) => Promise<void>
}

export const useStore = create<AppState>((set, get) => ({
  // UI Initial State
  sidebarItems: [
    {
      title: "Home",
      url: "/",
      icon: Inbox,
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

  // Student Initial State
  students: [],
  isLoading: false,
  error: null,
  filters: {
    year: 'AY 2024-25',
    class: 'CBSE 9',
    search: '',
  },

  // UI Actions
  setActivePage: (page) => set({ activePage: page }),

  // Student Actions
  setStudents: (students) => set({ students }),
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
  setFilters: (filters) => set((state) => ({
    filters: { ...state.filters, ...filters }
  })),

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