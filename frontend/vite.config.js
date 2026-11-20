import { readFileSync } from 'node:fs';
import { defineConfig } from 'vite';

const proxy = {
  '/api/': {
    target: 'http://localhost:5010',
    rewrite: (path) => path.replace(/^\/api/, ''),
  },
};

const https = process.env.CONTA_LIVRE_TLS === '1' ? {
  key: readFileSync(new URL('./.https/server.key', import.meta.url)),
  cert: readFileSync(new URL('./.https/server.crt', import.meta.url)),
} : undefined;

export default defineConfig({
  server: { proxy },
  preview: { proxy, https },
});
