import * as esbuild from 'esbuild';
import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function build() {
  console.log('Building React component...');

  // Bundle React app
  const result = await esbuild.build({
    entryPoints: [join(__dirname, 'src/index.tsx')],
    bundle: true,
    format: 'esm',
    write: false,
    minify: true,
    loader: {
      '.tsx': 'tsx',
      '.ts': 'ts',
    },
  });

  const bundledJs = result.outputFiles[0].text;
  console.log(`Bundled JS size: ${(bundledJs.length / 1024).toFixed(2)} KB`);

  // Read HTML template
  const templatePath = join(__dirname, 'dist/template.html');
  let html = readFileSync(templatePath, 'utf-8');

  // Replace placeholder with bundled JS
  html = html.replace(
    '// WIDGET_JS_PLACEHOLDER',
    bundledJs
  );

  // Write final widget.html
  const outputPath = join(__dirname, 'dist/widget.html');
  writeFileSync(outputPath, html, 'utf-8');

  console.log(`Widget built successfully: ${outputPath}`);
}

build().catch((err) => {
  console.error('Build failed:', err);
  process.exit(1);
});
