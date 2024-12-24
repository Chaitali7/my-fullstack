"use client"

import { useEffect } from 'react'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { useStore } from '@/store/useStore'
import AddStudentDialog from '@/components/add-student-dialog'
import SearchFilters from '@/components/search-filters'
import StudentTable from '@/components/student-table'

export default function Home() {
  const { 
    sidebarItems,
    activePage,
    fetchStudents,
    setActivePage,
  } = useStore()

  useEffect(() => {
    fetchStudents()
  }, [])

  return (
    <div className="flex h-screen">
      <Sidebar>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Application</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {sidebarItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton 
                      asChild
                      isActive={activePage === item.title}
                      onClick={() => setActivePage(item.title)}
                    >
                      <a href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>

      <div className="flex-1 space-y-6 p-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Students</h1>
          <AddStudentDialog />
        </div>
        
        <SearchFilters />
        <StudentTable />
      </div>
    </div>
  )
}

      {/* <main className="flex-1 p-6 overflow-auto">
        {error ? (
          <div className="text-red-500">Error: {error}</div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <Input 
                  type="search" 
                  placeholder="Search your course" 
                  className="w-64"
                  value={filters.search}
                  onChange={(e) => setFilters({ search: e.target.value })}
                />
                <Select 
                  value={filters.year} 
                  onValueChange={(year) => setFilters({ year })}
                >
                  <SelectTrigger className="w-36">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="AY 2024-25">AY 2024-25</SelectItem>
                  </SelectContent>
                </Select>
                <Select 
                  value={filters.class} 
                  onValueChange={(class_) => setFilters({ class: class_ })}
                >
                  <SelectTrigger className="w-36">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="CBSE 9">CBSE 9</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={() => setDialogOpen(true)}>
                Add Student
              </Button>
            </div>

            {isLoading ? (
              <div className="text-center">Loading...</div>
            ) : (
              <div className="bg-white rounded-lg shadow">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Student Name</th>
                      <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Cohort</th>
                      <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Courses</th>
                      <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Date Joined</th>
                      <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Last login</th>
                      <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredStudents.map((student) => (
                      <tr key={student.id}>
                        <td className="px-6 py-4 text-sm text-gray-900">{student.name}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{student.cohort}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          {student.courses.map(course => course.name).join(", ")}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          {new Date(student.date_joined).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          {new Date(student.last_login).toLocaleString()}
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <span className={`inline-flex rounded-full px-2 text-xs font-semibold ${
                            student.status 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {student.status ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}

        <AddStudentDialog 
          open={dialogOpen} 
          onOpenChange={setDialogOpen}
          onSubmit={async (data) => {
            await addStudent(data)
            setDialogOpen(false)
          }}
        />
      </main> */}
    