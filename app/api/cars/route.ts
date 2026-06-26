import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// Verifica se as variáveis existem
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('Variáveis da Supabase não configuradas!')
}

const supabase = createClient(
  supabaseUrl || '',
  supabaseKey || ''
)

export async function GET() {
  try {
    console.log('A tentar buscar carros da tabela vehicles...')
    
    const { data, error } = await supabase
      .from('vehicles')
      .select('*')
    
    if (error) {
      console.error('Erro da Supabase:', error)
      return NextResponse.json({ 
        error: error.message,
        details: error
      }, { status: 500 })
    }
    
    console.log(`Encontrados ${data?.length || 0} carros`)
    return NextResponse.json(data || [])
    
  } catch (err) {
    console.error('Erro inesperado:', err)
    return NextResponse.json({ 
      error: 'Erro interno no servidor',
      details: String(err)
    }, { status: 500 })
  }
}
