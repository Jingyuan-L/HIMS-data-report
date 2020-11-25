import request from '@/utils/request'

export function durationList(query) {
    return request({
        url: '/duration',
        method: 'get',
        params: query
    })
}