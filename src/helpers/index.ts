/**
 * 随机字符串
 * @param len 字符长度
 */
export const randomString = (len = 10) => {
  const $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz123456789';
  const maxPos = $chars.length;
  let pwd = '';

  for (let i = 0; i < len; i++) {
    pwd = pwd + $chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return pwd;
};

/**
 * 随机数
 * @param minNum 最小数字
 * @param maxNum 最大数字
 */
export const randomNum = function (minNum: number, maxNum: number) {
  switch (arguments.length) {
    case 1:
      return parseInt(`${Math.random() * minNum + 1}`, 10);
    case 2:
      return parseInt(`${Math.random() * (maxNum - minNum + 1) + minNum}`, 10);
    //或者 Math.floor(Math.random()*( maxNum - minNum + 1 ) + minNum );
    default:
      return 0;
  }
};
