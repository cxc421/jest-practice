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
      testEnvironment: 'jest-environment-jsdom',
    }
   ```
可能的選項: `jest-environment-node`, `jest-environment-jsdom`, `node`, `jsdom`

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


5. 使用 `moduleNameMapper` 把所有 import css 的檔案都換成自定義的空物件模組可以避免 jest 報錯.
但是如果觀察 render 出的 html 不會出現對應的 class name:
```js
  test('renders', () => {
    const {container} = render(<AutoScalingText />)
    console.log(container.innerHTML)
  })
```
為了方便 debug 與未來用 snapshot-testing,
可以安裝 `identity-obj-proxy`.
這是一個方便的物件, 讓 value = key.
ex:
```js
import obj from 'identy-obj-proxy';

console.log(obj['whatever']); // whatever
```
設定 `jest.config.js`, 改讓結尾名是 `*.module.css` 的模組用 `identy-obj-proxy`:
```js
  moduleNameMapper: {
    '\\.module\\.css$': 'identity-obj-proxy',  // 先放前面的會優先被找到
    '\\.css$': require.resolve('./test/style-mock.js'),
  },
```

6. 快照測試，可以用來比較產生的結果是否發生變化。
ex:
```js
  test('example', () => {
    const arr = [ {name:'a', count:1}, {name:'f', count:99}];

    expect(arr).toMatchSnapshot();
  });
```
ex:
```js
test('mounts', () => {
  const {container} = render(<CalculatorDisplay value="0" />)
  expect(container instanceof Element).toBe(true)
  expect(container.firstChild).toMatchSnapshot()
})
```
第一次執行的時候，會在測試檔案的資料夾產生 `__snapshots__` 資料夾並產生 snapshot 檔案
之後執行的時候，就會根據上次產生的 snapshot 檔案做比較
如果需要更新, 可以下 `npm t -- -u`

note: 如果用 `react-testing-library`,  並且測試組件最上層只有一個 element,
可以 snpashot `container.firstChild` 就好,
省略 render 時多產生的多餘 container

7. 如果有用 `emotion` 這個 css-in-js library
可以用客製化 jest serializer 的方式讓 snapshot 更可讀
先安裝 `jest-emotion@9.2.4`
然後在 test file 自定義 serializer
ex:
```js
import * as emotion from 'emotion'
import {createSerializer} from 'jest-emotion'

expect.addSnapshotSerializer(createSerializer(emotion))
```

8. 如果有用 dynamic import, 這不會被 node 支援, 因此會報錯.
這時候可以用一個 babel 的 plugin 叫 `babel-plugin-dynamic-import-node` 來解決問題.
用 npm 安裝完後, 設定 babelrc 檔讓測試環境下啟用此 plugin 即可.


9. 如果每個測試檔案都有一些相同的初始配置, 可以把這些設定集中到一個檔案,  讓 jest 自己執行
在 jest.config.js 中加上
```js
  {
    setupFilesAfterEnv: [require.resolve('./test/setup-test.js')]
  }
```
`setupFilesAfterEnv` 會在 jest 載入後再執行, 因此跟 jest 本上相關的設定可以在這時候設定
另外還有一個 `setupFiles` 會在 jest 載入前就執行


10. webpack 有一個方便的設定叫 `resolve.modules` 可以定義資料夾路徑,
但是 jest 在 node 執行環境下會找不到
此時可以用類似的設定 `moduleDirectories` 來解決。

(
  另外如果有 runtime error 的問題, 可以設定如下:
```js
  isTest ? '@babel/plugin-transform-runtime' : null,
```
)

11. 如果有用 Provider ex: ThemeProvider / Redux Provider
在測試的時候也需要包對應的 Provider 。

這個時候比較方便的做法是客製化一個通用的 render 函數給所有測試檔使用。

為了方便 import, 可以設定在 `jest.config.js` 的 `moduleDirectories` 設定資料夾。
但是由於 eslint 看不懂 jest 自定義的路徑設定，
可以用 npm 另外安裝 `eslint-import-resolver-jest`,
然後在 `.eslintrc.js` 做下面的設定，eslint 就會讀懂 jest 的 `moduleDirectories`
ex:
```js
{
  overrides: [
    {
      files: ['**/__tests__/**'],
      settings: {
        'import/resolver': {
          jest: {
            jestConfigFile: path.join(__dirname, './jest.config.js'),
          },
        },
      },
    },
  ],
}
```

12. 如果要檢查測試會什麼會失敗,
可以在程式碼上加上 `debugger`,
然後在 package.json 補上
```json
{
  "scripts": {
    "test:debug": "node --inspect-brk ./node_modules/jest/bin/jest.js --runInBand",
  }
}
```
其中 `runInBand` 是要 jest 用依序執行測試的方式跑。

設定完後, 在 console 下 `npm run test:debug`,
就可以在 chrome 上打 `chrome://inspect`
選擇對應的連結, 就可以在 chrome 上 debug 了