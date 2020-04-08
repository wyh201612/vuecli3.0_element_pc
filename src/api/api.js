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

    /**
     * 确定订单页选择可用优惠券
     * method： GET
     * 接口地址： activity/coupon/usable/list
     * transactionAmount float 是  交易额度（如果使用黄金红包代表黄金克重；如果是商城满减券代表支付金额）
     * type int 是  类型：0-黄金红包；1-回租福利券；2-商城满减券
     * leasebackDays int 否  回租期限，type等于1时此参数必填
     */
    /**
     * 返回字段意义
     * name    String Y  优惠券名称
     * type Integer Y 类型：0-黄金红包；1-回租福利券；2-商城满减券
     * amount  Double Y  红包金额或加息券加息率
     * useCondition    String Y  使用条件
     * financePeriod   Integer    Y  可用理财期限
     * tradeAmount Integer    Y  交易金额
     * indateTime  String Y  过期时间，如果为空则代表永远有效
     * status  Integer    Y  使用状态：1-未使用；2-已使用；3-已过期
     * (usedStatus)    Integer    Y  使用状态：1-未使用；2-已使用；3-已过期
     * income  Double Y  收入金额
     * mark   int   1大于等于;2等于;3大于
     * discountAmount Integer Y 折扣额度
     * transactionAmount Integer Y 交易额度
     */
    static getActivityCouponUsableList(data,accessToken) {
        return request({
            url: domain.Base_M1_URL+'/activity/coupon/usable/list',
            method: 'get',
            params: data,
            headers: {
                accessToken: accessToken
            }
        })
    }

    /**
     * 个人中心优惠券列表
     * method： GET
     * 接口地址：  activity/coupon/member/list
     * type int 是  类型：0-黄金红包；1-回租福利券；2-商城满减券
     */
    /**
     * 返回字段意义
     * usedCoupons：已使用优惠券列表
     * usablenessCoupons：未使用优惠券列表
     * outdatedCoupons：过期优惠券列表
     */
    static getActivityCouponMemberList(data,accessToken) {
        return request({
            url: domain.Base_M1_URL+'/activity/coupon/member/list',
            method: 'get',
            params: data,
            headers: {
                accessToken: accessToken
            }
        })
    }

    /**
     * 根据场景获取优惠券（一般是新手注册、新手第一笔支付、邀请好友好友注册成功之后发放）
     * method： GET
     * 接口地址：  activity/coupon/trigger/list
     * trigger int 是  2-提单支付成功;3-体验金购买完成；4-回租完成
     */
    static getActivityCouponTriggerList(data,accessToken) {
        return request({
            url: domain.Base_M1_URL+'/activity/coupon/trigger/list',
            method: 'get',
            params: data,
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