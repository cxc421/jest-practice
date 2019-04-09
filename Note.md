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


3. jest 利用了 JSDOM 可以模擬 browser 的行為,
   因此如果執行
   ```js
    console.log(window)
   ```
   不會有錯誤。

   但是 JSDOM 執行上會有一點性能損失,
   所以如果程式碼可以單純在 node 上執行,
   明確指定要在 node 上跑會比較好.

   在根目錄創建 `jest.config.js`:
   ```js
    module.exports = {
      // testEnvironment: 'jest-environment-node',
      testEnvironment: 'jest-environment-jsdom',
    }
   ```

4. jest 在測試時基本上是用 node 的環境執行,
因此若有 import 非 js 的 module 會有問題.
ex:
```js
import "xxx.css";
```

因此可以設定 jest 在遇到特定檔案時, 用其他 module 替換.
在 `jest.config.js` 定義下面的設定
```js
module.exports = {
  moduleNameMapper: {
    '\\.css$': require.resolve('./test/style-mock.js'),
  },
}
```
這樣在 jest 執行中碰到 css 結尾的檔案, 都會被替換成 `style-mock.js`.
其中 `style.mock.js` 只是單純 exports 空物件.
同樣的手法可以解決碰到 `.graphql` 或 `.svg` 等檔案時出現錯誤的問題。



