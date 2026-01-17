import type { ReactElement } from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render } from '@testing-library/react'
import { store } from '../app/store'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: false }
  }
})

export function renderWithProviders(ui: ReactElement) {
  return render(
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>{ui}</BrowserRouter>
      </QueryClientProvider>
    </Provider>
  )
}
