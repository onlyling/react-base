import type { MenuProps } from 'antd/es/menu'

export interface AdminLayoutProps {
  /**
   * 主题
   * @default `light`
   */
  theme?: MenuProps['theme']

  /**
   * 侧边栏宽
   * @default `280`
   */
  siderWidth?: number

  /**
   * logo
   */
  logo?: string

  /**
   * 小 logo
   */
  smallLogo?: string
}

export interface SiderMenuProps {
  /**
   * 主题
   * @default `light`
   */
  theme?: MenuProps['theme']
}
