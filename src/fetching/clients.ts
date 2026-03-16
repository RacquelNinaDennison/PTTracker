import { clientZodScheme, type CreateClientSchemaType} from "../models/clients/client_zod_models";


export async function getClients(){
    const res = await fetch('/api/clients')
    if (!res.ok) throw new Error('Failed to fetch clients')
    return clientZodScheme.array().parse(await res.json())
}


export async function createClient(client: CreateClientSchemaType){
    const res = await fetch('/api/clients', {
        method: 'POST',
        body: JSON.stringify(client),
    })
    if (!res.ok) throw new Error('Failed to create client')
    return clientZodScheme.parse(await res.json())
}

export async function toggleClientStatus(id: string, isActive: boolean) {
    const res = await fetch(`/api/clients/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ isActive }),
    })
    if (!res.ok) throw new Error('Failed to update client')
    return clientZodScheme.parse(await res.json())
  }