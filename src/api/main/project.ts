import Send from '@/api/Send.ts'

export const getTest = () => {
  return Send({
    method: 'get',
    url: '/api/main/apiTest',
  })
}
