### 1. Craft CMS with Query API
You need a running Craft CMS instance with the [Query API plugin](/libraries/craft-query-api/get-started/install) installed and configured.

Additionally, make sure you have at least one section created in Craft CMS. For this guide, we'll assume you have a section with the handle `home` and an entry type also named `home`.

You can also use the CLI to set up a Craft-only project:

```bash
npx create-query-api@latest query-api-starter --template craft-only
```

::content-snippet{slug="login-credentials"}
::