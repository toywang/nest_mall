/**
 * 通用返回结果封装类
 * Created by macro on 2019/4/19.
 */

/**
 * 只需要 data
 * @param data
 * @returns
 */
export const successCommon = (data?: any) => {
  return {
    code: 200,
    message: '操作成功',
    data: data,
  };
};
/**
 *
 * @param message 返回的提示
 * @param data
 * @returns
 */
export const successMessage = (message?: string, data?: any) => {
  return {
    code: 200,
    message: message,
    data: data,
  };
};

/**
 *
 * @param message 返回的提示
 * @param code 返回的code
 * @param data 返回的数据
 * @returns
 */
export const successMC = (message?: string, code?: number, data?: any) => {
  return {
    code: code,
    message: message,
    data: data,
  };
};
/**
 *
 * @param message 失败的提示
 * @param code 失败的code
 * @returns
 */
export const failedCommon = (message?: string, code?: number) => {
  return {
    code: code,
    message: message,
    data: '',
  };
};
/**
 * 分页返回的数据
 * @param findAndCountRes
 * @param pageSize
 * @param pageNum
 * @returns
 */

export function pageData(
  findAndCountRes: any,
  pageSize: number,
  pageNum: number,
) {
  const list = findAndCountRes[0];
  const total = findAndCountRes[1];
  const totalPage = Math.ceil(total / pageSize);
  return {
    list,
    pageNum,
    pageSize,
    total,
    totalPage,
  };
}

export const CommonResult = {
  successCommon,
  successMC,
  successMessage,
  failedCommon,
  pageData,
};
