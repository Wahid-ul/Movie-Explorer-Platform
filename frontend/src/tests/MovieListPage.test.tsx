import { render, screen, waitFor } from '@testing-library/react'
import { Provider } from 'react-redux'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter } from 'react-router-dom'
import { store } from '../app/store'
import MovieListPage from '../pages/MovieListPage'
import { test, expect } from 'vitest'
const queryClient = new QueryClient()

const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          {ui}
        </BrowserRouter>
      </QueryClientProvider>
    </Provider>
  )
}

test('renders movies grouped by industry with MovieCard data', async () => {
  renderWithProviders(<MovieListPage />)

  await waitFor(() => {
    expect(screen.getByText('Hollywood')).toBeInTheDocument()
    expect(screen.getByText('Bollywood')).toBeInTheDocument()
    expect(screen.getByText('Tamil Movies')).toBeInTheDocument()
  })

  expect(await screen.findByText('Inception')).toBeInTheDocument()
  expect(await screen.findByText('RRR')).toBeInTheDocument()
  expect(await screen.findByText('Vikram')).toBeInTheDocument()

  expect(screen.getByText('2010 • Christopher Nolan')).toBeInTheDocument()
  expect(screen.getByText('2022 • S. S. Rajamouli')).toBeInTheDocument()
})
