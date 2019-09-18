import { getBearerToken } from '@/services/identity'

async function generateHeaders () {
  const token = await getBearerToken()
  return {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
}

export default async function api (action, payload) {
  try {
    const headers = {
      ...await generateHeaders(),
      'Controller-Action': action
    }
    const options = {
      method: 'POST',
      headers,
      body: payload && JSON.stringify(payload)
    }
    const response = await fetch('/.netlify/functions/api', options)
    if (response.headers.get('Content-Type') === 'application/json') {
      return response.json()
    }
    return { status: response.status }
  } catch (error) {
    console.log('TCL: api -> error', error)
  }
}
