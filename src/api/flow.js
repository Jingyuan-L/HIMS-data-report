import request from '@/utils/request'

export function flowList(query) {
    return request({
        url: '/flow',
        method: 'get',
        params: query
    })
}