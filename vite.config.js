import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { existsSync } from 'fs'
import { resolve } from 'path'
import { execSync } from 'child_process'
import { fileURLToPath } from 'url'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'copy-resource-files',
      closeBundle() {
        // 复制 index_files 文件夹到 dist
        const indexFilesSrc = resolve(__dirname, 'index_files')
        const indexFilesDest = resolve(__dirname, 'dist', 'index_files')
        if (existsSync(indexFilesSrc)) {
          try {
            execSync(`cp -r "${indexFilesSrc}" "${indexFilesDest}"`, { stdio: 'inherit' })
          } catch (e) {
            console.error('Failed to copy index_files:', e)
          }
        }
        
        // 复制 public/yuanbao_files 文件夹到 dist
        const yuanbaoFilesSrc = resolve(__dirname, 'public', 'yuanbao_files')
        const yuanbaoFilesDest = resolve(__dirname, 'dist', 'yuanbao_files')
        if (existsSync(yuanbaoFilesSrc)) {
          try {
            execSync(`cp -r "${yuanbaoFilesSrc}" "${yuanbaoFilesDest}"`, { stdio: 'inherit' })
          } catch (e) {
            console.error('Failed to copy yuanbao_files:', e)
          }
        }
      }
    }
  ],
  base: '/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    copyPublicDir: false,
  },
  publicDir: false,
})
