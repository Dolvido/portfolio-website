export const config = {
  llmServer: process.env.LLM_SERVER_URL || 'http://localhost:3001',
  debug: process.env.NODE_ENV === 'development'
} 