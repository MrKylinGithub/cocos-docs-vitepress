import { defineConfig } from 'vitepress'
import { github } from './config'

export default function(version: string) {
  return defineConfig({
    lang: 'en-US',
    description: 'Vite & Vue powered static site generator.',
  
    themeConfig: {
      
      editLink: {
        pattern: `${github}/edit/master/versions/${version}/:path`,
        text: 'Edit this page on GitHub'
      },
  
      footer: {
        message: 'Released under the MIT License.',
        copyright: 'Copyright © 2019-present Evan You'
      }
    }
  })
}
