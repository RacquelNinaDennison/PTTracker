import { http, HttpResponse } from 'msw'
import type { Client } from '../models/clients/client_zod_models'
import { CreateClientSchema } from '../models/clients/client_zod_models'

// in-memory "database" — just an array
let clients: Client[] = [
  {
    id: '1',
    name: 'Jane Doe',
    email: 'jane@example.com',
    goal: 'Lose 5kg by June',
    isActive: true,
    createdAt: '2024-01-15T10:00:00Z',
  },
  {
    id: '2',
    name: 'Marcus Webb',
    email: 'marcus@example.com',
    goal: 'Build strength',
    isActive: false,
    createdAt: '2024-02-01T09:00:00Z',
  },
]

export const handlers = [

  // GET all clients
  http.get('/api/clients', () => {
    return HttpResponse.json(clients)
  }),

  // POST create a client
  http.post('/api/clients', async ({ request }) => {
    const raw = await request.json()
    const body = CreateClientSchema.parse(raw)
    const newClient: Client = {
      ...body,
      id: String(Date.now()),
      createdAt: new Date().toISOString(),
    }
    clients.push(newClient)
    return HttpResponse.json(newClient, { status: 201 })
  }),

  // PATCH toggle status
  http.patch('/api/clients/:id', async ({ params, request }) => {
    const body = await request.json() as { isActive: boolean }
    clients = clients.map(c =>
      c.id === params.id ? { ...c, isActive: body.isActive } : c
    )
    const updated = clients.find(c => c.id === params.id)
    return HttpResponse.json(updated)
  }),
]
