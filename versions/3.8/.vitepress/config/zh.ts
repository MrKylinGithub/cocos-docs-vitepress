import { defineConfig, type DefaultTheme } from 'vitepress'
import configZh from '../../../../@config/shared-theme-zh'
import { nav } from '../../../../@config/shared';
import menus from '../../zh/summary.json' with {type: 'json'};
import { version } from './version'

export const zh = defineConfig({
  lang: configZh.lang,
  description: configZh.description,

  themeConfig: {
    ...configZh.themeConfig,
    
    nav: nav(version, 'zh'),

    sidebar: {
      '/zh/': { base: '/zh/', items: menus },
    }
  }
})
