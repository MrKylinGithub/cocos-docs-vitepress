import { defineConfig } from 'vitepress'
import { shared } from '../../../../@config/shared'
import { en } from './en'
import { zh } from './zh'
import { version } from './version.ts';



export default defineConfig({
  ...shared,
  base: `/`, // `/${version}/`
  locales: {
    // 我们的文档都在 /en/ /zh/ 等文件夹里面，没有在根目录的文档 所以不用配 root
    // root: { label: 'English', ...en },
    en: { label: 'English', ...en },
    zh: { label: '简体中文', ...zh }
  }
})
