import { defineConfig } from 'vite';
import fs from 'fs';
import path from 'path';

function copyFolderRecursive(src, dest) {
  if (!fs.existsSync(src)) return;
  if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyFolderRecursive(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

function copyStaticExtrasPlugin() {
  return {
    name: 'copy-static-extras',
    closeBundle() {
      const outDir = path.resolve('dist');
      // Copiar pakal-temple-parallax a dist/pakal-temple-parallax
      const templeSrc = path.resolve('pakal-temple-parallax');
      const templeDest = path.join(outDir, 'pakal-temple-parallax');
      copyFolderRecursive(templeSrc, templeDest);

      // Copiar meditacion_guiada a dist/meditacion_guiada
      const medSrc = path.resolve('meditacion_guiada');
      const medDest = path.join(outDir, 'meditacion_guiada');
      copyFolderRecursive(medSrc, medDest);
    }
  };
}

export default defineConfig({
  base: './',
  root: '.',
  publicDir: 'public',
  plugins: [copyStaticExtrasPlugin()],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true,
  },
  server: {
    port: 3000,
    open: false,
  },
});
