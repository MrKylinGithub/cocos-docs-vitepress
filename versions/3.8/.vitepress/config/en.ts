import { defineConfig, type DefaultTheme } from 'vitepress'
import configEn from '../../../../@config/shared-theme-en'
import { nav } from '../../../../@config/shared';
import menus from '../../en/summary.json' with {type: 'json'};
import { version } from './version'

export const en = defineConfig({
  lang: configEn.lang,
  description: configEn.description,

  themeConfig: {
    ...configEn.themeConfig,

    nav: nav(version, 'en'),

    sidebar: {
      '/en/': { base: '/en/', items: menus },
    }
  }
})


