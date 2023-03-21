/**
 * 是否是本地测试环境或线上测试环境
 */
export const IS_DEV = process.env.NODE_ENV === 'development' || process.env.APP_ENV === 'test'

/**
 * baseUrl
 */
export const BASE_URL = `https://${IS_DEV ? 'dev-' : ''}zhike.banchengyun.com`
