export interface Message {
  role: 'user' | 'assistant'
  content: string
}

export interface Document {
  id: string
  name: string
  uploadedAt: string
  status: 'active' | 'processing' | 'error'
} 