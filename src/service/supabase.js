import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// 데이터 조회 함수 예시
export const fetchData = async (tableName) => {
  const { data, error } = await supabase
    .from(tableName)
    .select('*')
  
  if (error) throw error
  return data
}

// 데이터 추가 함수 예시
export const insertData = async (tableName, data) => {
  const { data: result, error } = await supabase
    .from(tableName)
    .insert([data])
    .select()
  
  if (error) throw error
  return result
}