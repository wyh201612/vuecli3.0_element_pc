import request from './http'
import qs from 'qs'
import {domain} from '@/host_url.js'

export default class Api {
    // 获取金价
    static getCurrentGoldPrice(data) {
        return request({
            url: domain.Base_M1_URL+'/product/price/currentGoldPrice',
            method: 'get',
            params: data
        })
    }

    // 首页列表
    static goodsList(data) {
        return request({
            url: domain.Base_M1_URL+'/mall/goods/list',
            method: 'get',
            params: data
        })
    }

    // 商品详情
    static goodsDetail(data,id) {
        return request({
            url: domain.Base_M1_URL+'/mall/goods/'+ id,
            method: 'get',
            params: data
        })
    }

    // 加入购物车
    static addCart(data,accessToken) {
        return request({
            url: domain.Base_M1_URL+'/mall/shopping/trolley',
            method: 'post',
            data: data,
            headers: {
                accessToken: accessToken
            }
        })
    }

    // 购物车列表
    static cartList(data,accessToken) {
        return request({
            url: domain.Base_M1_URL+'/mall/shopping/trolley/list',
            method: 'get',
            params: data,
            headers: {
                accessToken: accessToken
            }
        })
    }

    // 购物车列表数量修改
    static cartListQuantity(data,accessToken) {
        return request({
            url: domain.Base_M1_URL+'/mall/shopping/trolley/quantity',
            method: 'post',
            data: data,
            headers: {
                accessToken: accessToken
            }
        })
    }

    // 购物车列表删除
    static removecartList(data,accessToken) {
        return request({
            url: domain.Base_M1_URL+'/mall/shopping/trolley/remove',
            method: 'post',
            data: data,
            headers: {
                accessToken: accessToken
            }
        })
    }
    
    // 支付
    static pay(data,accessToken) {
        return request({
            url: domain.Base_M1_URL+'/mall/mallorder/pay',
            method: 'post',
            data: data,
            headers: {
                accessToken: accessToken
            }
        })
    }

    // 获取用户信息
    static getUserInfo(data,accessToken) {
        return request({
            url: domain.Base_M1_URL+'/pay/memberAccount/queryUsableAmount',
            method: 'get',
            params: data,
            headers: {
                accessToken: accessToken
            }
        })
    }

    // 获取我的订单
    static getOrderList(data,accessToken) {
        return request({
            url: domain.Base_M1_URL+'/mall/new/order/search',
            method: 'get',
            params: data,
            headers: {
                accessToken: accessToken
            }
        })
    }

    // 订单详情
    static getOrderDetail(data,accessToken,id) {
        return request({
            url: domain.Base_M1_URL+'/mall/new/order/serial/' + id,
            method: 'get',
            params: data,
            headers: {
                accessToken: accessToken
            }
        })
    }

    // 订单详情状态
    static getOrderDetail_queryOrderStatus(data,accessToken) {
        return request({
            url: domain.Base_M1_URL+'/pay/mallpaytrade/queryOrderStatus',
            method: 'get',
            params: data,
            headers: {
                accessToken: accessToken
            }
        })
    }
    
    // 获取我的地址
    static get_address(data,accessToken) {
        return request({
            url: domain.Base_M1_URL+'/member/address/list',
            method: 'get',
            params: data,
            headers: {
                accessToken: accessToken
            }
        })
    }

    // 添加我的地址
    static add_address(data,accessToken) {
        return request({
            url: domain.Base_M1_URL+'/member/address/add',
            method: 'post',
            data: data,
            headers: {
                accessToken: accessToken
            }
        })
    }

    // 修改我的地址
    static update_address(data,accessToken) {
        return request({
            url: domain.Base_M1_URL+'/member/address/update',
            method: 'post',
            data: data,
            headers: {
                accessToken: accessToken
            }
        })
    }

    // 删除我的地址
    static del_address(data,accessToken,id) {
        return request({
            url: domain.Base_M1_URL+'/member/address/delete/'+id,
            method: 'delete',
            data: data,
            headers: {
                accessToken: accessToken
            }
        })
    }
    
}