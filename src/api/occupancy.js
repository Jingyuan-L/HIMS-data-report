import request from '@/utils/request'

export function occupancyList(query) {
    return request({
        url: '/occupancy',
        method: 'get',
        params: query
    })
}