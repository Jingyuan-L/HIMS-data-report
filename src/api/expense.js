import request from '@/utils/request'

export function expenseList(query) {
    return request({
        url: '/expense',
        method: 'get',
        params: query
    })
}