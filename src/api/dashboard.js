import request from '@/utils/request'

export function dashboardData(query) {
    return request({
        url: '/dashboard',
        method: 'get',
        params: query
    })
}