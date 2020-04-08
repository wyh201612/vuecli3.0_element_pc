import service from '@/utils/request'

/**
 * 封装axios请求
 * @param params 请求参数
 * @return promise
 */
const request = (params) => {
    return new Promise((resolve, reject) => {
        service(params).then(res => {
            if(res==undefined){
            } else {
                resolve(res.data)
            }
        }).catch(error => {
            reject(error)
        })
    })
}

export default request


