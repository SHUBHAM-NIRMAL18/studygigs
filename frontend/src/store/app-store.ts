import { create } from 'zustand'

export type ViewMode = 'marketplace' | 'post-task' | 'task-detail' | 'my-tasks' | 'my-bids' | 'admin' | 'profile'

export interface User {
  id: string
  email: string
  name: string
  avatar: string | null
  bio: string | null
  role: string
  rating: number
  completedTasks: number
  totalEarnings: number
  onTimeRate: number
  _count?: { postedTasks: number; bids: number }
}

export interface Task {
  id: string
  posterId: string
  title: string
  description: string
  category: string
  academicLevel: string
  budgetMin: number
  budgetMax: number
  deadline: string
  status: string
  acceptedBidId: string | null
  revisionCount: number
  platformFee: number
  createdAt: string
  updatedAt: string
  poster?: User
  bids?: Bid[]
  deliverables?: Deliverable[]
  reviews?: Review[]
  disputes?: Dispute[]
  messages?: Message[]
  _count?: { bids: number; messages: number }
}

export interface Bid {
  id: string
  taskId: string
  solverId: string
  proposedPrice: number
  deliveryDays: number
  message: string
  status: string
  createdAt: string
  solver?: User
  task?: { id: string; title: string; status: string }
}

export interface Deliverable {
  id: string
  taskId: string
  solverId: string
  content: string
  version: number
  status: string
  createdAt: string
  solver?: User
}

export interface Review {
  id: string
  taskId: string
  reviewerId: string
  revieweeId: string
  rating: number
  comment: string
  createdAt: string
  reviewer?: User
  reviewee?: User
}

export interface Dispute {
  id: string
  taskId: string
  initiatorId: string
  reason: string
  status: string
  resolution: string | null
  createdAt: string
  updatedAt: string
}

export interface Message {
  id: string
  taskId: string
  senderId: string
  content: string
  createdAt: string
  sender?: User
}

interface AppState {
  // Auth
  currentUser: User | null
  users: User[]
  setCurrentUser: (user: User) => void
  setUsers: (users: User[]) => void
  isAuthenticated: boolean
  setIsAuthenticated: (v: boolean) => void

  // Navigation
  currentView: ViewMode
  setCurrentView: (view: ViewMode) => void

  // Task detail
  selectedTaskId: string | null
  setSelectedTaskId: (id: string | null) => void

  // Data
  tasks: Task[]
  setTasks: (tasks: Task[]) => void
  selectedTask: Task | null
  setSelectedTask: (task: Task | null) => void

  // Filters
  filters: {
    category: string
    academicLevel: string
    status: string
    search: string
    sortBy: string
  }
  setFilters: (filters: Partial<AppState['filters']>) => void

  // UI
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
  sidebarCollapsed: boolean
  setSidebarCollapsed: (collapsed: boolean) => void
  isLoading: boolean
  setIsLoading: (loading: boolean) => void
}

export const useAppStore = create<AppState>((set) => ({
  currentUser: null,
  users: [],
  setCurrentUser: (user) => set({ currentUser: user, isAuthenticated: true }),
  setUsers: (users) => set({ users }),
  isAuthenticated: false,
  setIsAuthenticated: (v) => set({ isAuthenticated: v }),

  currentView: 'marketplace',
  setCurrentView: (view) => set({ currentView: view }),

  selectedTaskId: null,
  setSelectedTaskId: (id) => set({ selectedTaskId: id }),

  tasks: [],
  setTasks: (tasks) => set({ tasks }),
  selectedTask: null,
  setSelectedTask: (task) => set({ selectedTask: task }),

  filters: {
    category: '',
    academicLevel: '',
    status: '',
    search: '',
    sortBy: 'newest'
  },
  setFilters: (filters) => set((state) => ({ filters: { ...state.filters, ...filters } })),

  sidebarOpen: false,
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  sidebarCollapsed: false,
  setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),
  isLoading: false,
  setIsLoading: (loading) => set({ isLoading: loading }),
}))
