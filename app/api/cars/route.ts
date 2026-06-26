import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Usa as variáveis de ambiente que já configuraste na Vercel
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('vehicles') // NOME CERTO, EM INGLÊS, MINÚSCULO
      .select('*');

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data || []);
  } catch (error) {
    return NextResponse.json({ error: 'Erro interno no servidor.' }, { status: 500 });
  }
}
