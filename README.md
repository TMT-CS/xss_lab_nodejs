# XSS Lab Rewrite - All GET

Node.js + Express lab rewritten with:
- path style routes:
  - /reflected/level1
  - /reflected/level2
  - /reflected/level3
  - /reflected/level4
  - /reflected/level5
- all 5 levels accept payload by GET query:
  - /reflected/level3?q=payload
  - /reflected/level4?q=payload
- level 3 and level 4 are now GET-based for easier crawling and reflected-XSS scanning

## Run
```bash
npm install
npm start
```

Open:
```bash
http://localhost:3000
```
