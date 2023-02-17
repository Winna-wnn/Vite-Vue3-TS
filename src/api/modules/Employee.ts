import { http } from '@/http'
import { BasicPageParams } from '@/types'
import {
  UpdateByRoleFilter_RoleFilter,
  UpdateByRoleFilter_RoleFilterUpdateRequest
} from '@/types/modules/Employee'

export const UpdateByRoleFilter = (params: BasicPageParams & UpdateByRoleFilter_RoleFilter, data: UpdateByRoleFilter_RoleFilterUpdateRequest) => {
  return http.request('put', '/api/Employee/UpdateByRoleFilter', {
    data,
    params
  })
}
