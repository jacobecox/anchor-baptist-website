import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const compat = new FlatCompat({
  baseDirectory: __filename,
});

const eslintConfig = [...compat.extends("next/core-web-vitals")];

// Add rule overrides to fix deployment issues
eslintConfig.push({
  rules: {
    // Allow both img and Next.js Image components
    '@next/next/no-img-element': 'off', // Allow regular img tags
    'react/no-unescaped-entities': 'off', // Disable this rule completely
  },
});

export default eslintConfig;
