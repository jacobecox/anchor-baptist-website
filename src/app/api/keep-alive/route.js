import { supabase } from '@/lib/supabase'

export async function GET() {
  const { error } = await supabase.from('service_times').select('id').limit(1)

  if (error) {
    return Response.json({ status: 'error', message: error.message }, { status: 500 })
  }

  return Response.json({ status: 'alive' })
}
