import { defineConfig } from 'vitest/config';

    export default defineConfig({
        test: {
            browser: {
                provider: 'playwright', // or 'webdriverio'
                enabled: true,
                name: 'chromium', // browser name is required
              },
            globals: true,
            environment: 'jsdom',
            setupFiles: "./test.setup.ts",
            silent: false,
        },
      })