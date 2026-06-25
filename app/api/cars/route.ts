import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function GET() {
  try {
    // Tenta buscar da tabela 'vehicles' primeiro
    let { data, error } = await supabase
      .from('vehicles')
      .select('*')
    
    // Se não encontrar, tenta 'cars'
    if (error) {
      const result = await supabase
        .from('cars')
        .select('*')
      data = result.data
      error = result.error
    }
    
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
    
    return NextResponse.json(data || [])
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}
