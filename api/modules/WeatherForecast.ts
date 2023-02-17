import { http } from '@/http'
import { BasicPageParams } from '@/types'
import {
  TemperatureFilterGetPage_TemperatureFilter,
  TemperatureFilterGetPage_TemperatureFilterGetPageResponse,
  Create_CreateRequest,
  Get_GetResponse,
  Update_UpdateRequest
} from '@/types/modules/WeatherForecast'

export const TemperatureFilterGetPage = (params: BasicPageParams & TemperatureFilterGetPage_TemperatureFilter) => {
  return http.request<TemperatureFilterGetPage_TemperatureFilterGetPageResponse>('get', '/api/WeatherForecast/TemperatureFilterGetPage', {
    params
  })
}

export const Delete = (Id: string) => {
  return http.request('delete', `/api/WeatherForecast/Delete/${Id}`, {
  })
}

export const Create = (data: Create_CreateRequest) => {
  return http.request('post', '/api/WeatherForecast/Create', {
    data
  })
}

export const Get = (Id: string) => {
  return http.request<Get_GetResponse>('get', `/api/WeatherForecast/Get/${Id}`, {
  })
}

export const Update = (Id: string, data: Update_UpdateRequest) => {
  return http.request('put', `/api/WeatherForecast/Update/${Id}`, {
    data
  })
}
