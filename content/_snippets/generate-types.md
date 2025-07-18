The Query API plugin can generate TypeScript types based on your Craft CMS sections and entry types. This provides full type safety for your frontend data.

First, add a script to your `composer.json` in your **Craft CMS project root**.

```json [composer.json]
  "scripts": {
    "generate-types": "php craft query-api/typescript/generate-types --output=@root/frontend/src/types/base.ts"
  }
```

Now, run the command to generate the `base.ts` file. If you are using DDEV, you can run:

```bash
ddev composer run generate-types
```

This will create a `base.ts` file in `frontend/src/types` with all the necessary type definitions.