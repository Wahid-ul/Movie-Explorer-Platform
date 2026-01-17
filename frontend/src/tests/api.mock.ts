import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'

export const server = setupServer(
  http.get('/api/movies', () => {
    return HttpResponse.json([
      { id: 1, title: 'Inception', release_year: 2010, industry: 'Hollywood' },
      { id: 2, title: '3 Idiots', release_year: 2009, industry: 'Bollywood' },
      { id: 3, title: 'RRR', release_year: 2022, industry: 'Tamil' }
    ])
  }),

  http.get('/api/movies/:id', ({ params }) => {
    return HttpResponse.json({
      id: Number(params.id),
      title: 'Inception',
      release_year: 2010,
      industry: 'Hollywood'
    })
  })
)
