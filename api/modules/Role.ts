import { http } from '@/http'
import { BasicPageParams } from '@/types'
import {
  GetList_GetListResponse
} from '@/types/modules/Role'

export const GetList = () => {
  return http.request<GetList_GetListResponse>('get', '/api/Role/GetList', {
  })
}
