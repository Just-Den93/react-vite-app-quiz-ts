import js from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import react from 'eslint-plugin-react'

export default tseslint.config(
  {
    // Базовые настройки
    ignores: ['dist'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
    settings: { 
      react: { 
        version: '18.3' 
      } 
    },
  },
  {
    // Файлы TypeScript
    files: ['**/*.{ts,tsx}'],
    extends: [
      ...tseslint.configs.recommendedTypeChecked, // Строгая проверка типов
      ...tseslint.configs.strictTypeChecked,      // Еще более строгие правила
      ...tseslint.configs.stylisticTypeChecked    // Стилистические правила
    ],
    plugins: {
      'react': react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      // Правила React
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      
      // Правила React Hooks
      ...reactHooks.configs.recommended.rules,
      
      // Правила React Refresh
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],

      // Дополнительные строгие правила
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/explicit-function-return-type': 'error',
      '@typescript-eslint/strict-boolean-expressions': 'error',
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/no-floating-promises': 'error'
    },
  }
)