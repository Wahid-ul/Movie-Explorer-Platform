import { http, HttpResponse } from 'msw'

export const handlers = [
  http.get('http://localhost:5000/api/movies', () => {
    return HttpResponse.json([
      {
        id: 1,
        title: 'Inception',
        industry: 'Hollywood',
        release_year: 2010,
        poster_url: '/posters/inception.jpg',
        director: { id: 1, name: 'Christopher Nolan' },
        genres: [
          { id: 1, name: 'Sci-Fi' },
          { id: 2, name: 'Thriller' }
        ]
      },
      {
        id: 2,
        title: 'RRR',
        industry: 'Bollywood',
        release_year: 2022,
        poster_url: '/posters/rrr.jpg',
        director: { id: 2, name: 'S. S. Rajamouli' },
        genres: [
          { id: 3, name: 'Action' },
          { id: 4, name: 'Drama' }
        ]
      },
      {
        id: 3,
        title: 'Vikram',
        industry: 'Tamil',
        release_year: 2022,
        poster_url: '/posters/vikram.jpg',
        director: { id: 3, name: 'Lokesh Kanagaraj' },
        genres: [
          { id: 5, name: 'Action' },
          { id: 6, name: 'Thriller' }
        ]
      }
    ])
  }),
]
