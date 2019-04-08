1. 安裝 jest
- > `npm i -D jest`
- add script:
   ```json
   {
     "scripts": {
       "test": "jest"
     }
   }
   ```
- 創建 `__tests__/example.js`
- > `npm run test`

2. 如果你的 test file 有用到 es6 的語法,
   則需要用 babel 翻譯成 commonjs.

   這可以在 `.babelrc` 裡設定
   ```js
    const isTest = String(process.env.NODE_ENV) === 'test';

   //
    presets: [
      ['@babel/preset-env', {modules: isTest ? 'commonjs' : false}],
      '@babel/preset-react',
    ],
   ```

   jest 在執行是會去尋找專案目錄下是否有 `.babelrc`，並根據設定去執行
