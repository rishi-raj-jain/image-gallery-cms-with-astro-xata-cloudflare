import { json } from '@/lib/response'
import { getXataClient } from '@/xata'
import type { APIContext } from 'astro'

const xata = getXataClient()

export async function POST({ request }: APIContext) {
  const data = await request.formData()
  const file = data.get('file')
  if (!file) return json({ error: 'No File Provided' }, 400)
  if (!(file instanceof File)) return json({ error: 'Uploaded file is not an instance of valid file.' }, 400)
  if (file.size > 50 * 1024 * 1024) return json({ error: 'File size exceeds the limit of 50 MB.' }, 400)
  try {
    const fileBuffer = await file.arrayBuffer()
    const record = await xata.db.uploads.create({})
    await xata.files.upload({ table: 'uploads', record: record.id, column: 'image' }, fileBuffer, {
      mediaType: file.type,
    })
    const { image } = await xata.db.uploads.read(record.id)
    const { url, attributes } = image
    const { height, width } = attributes
    return json({ height, width, url }, 200)
  } catch (error) {
    return json({ error: error.message || error.toString() }, 500)
  }
}
