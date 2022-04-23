# nature-of-code
Repository for Daniel Shiffman's The Nature of Code book

# Notes

- We use `type="module"` in the `html` because TypeScript exports as a module
- If you want to use P5 in global mode, set your tsconfig.json to point to: 
```    

    "paths": {
        "*": ["./node_modules/@types/p5/global.d.ts"]
        },
```
And then, import the P5 as: `import type * as _ from 'p5';`


