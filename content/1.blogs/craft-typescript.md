---
title: TypeScript and Craft CMS, a Lovely Combo ❤️
description: 'Learn how to use TypeScript and Craft CMS with the Query API'
datePublished: 2025-12-05
readingTime: 3min
---

Craft CMS is great, but working with Twig means no type-safety. The [**Query API Plugin**](/libraries/craft-query-api) changes that completely by automatically generating TypeScript types from your Craft's project config.

This article shows how TypeScript + Query API eliminates runtime errors, enables IDE autocomplete for all your Craft fields, and makes refactoring safe and easy, whether you're building a headless frontend or a traditional Twig site with TypeScript components.

---

## No Types in Twig

Craft CMS with Twig templates is a proven, solid stack for content-driven websites.
But Twig doesn't give us type-safety. 

### Twig example (traditional):
```twig
{% set articles = craft.entries()
  .section('articles')
  .orderBy('dateCreated DESC')
  .all() %}

{% for article in articles %}
  <h2>{{ article.title }}</h2>
  {# Typo? Only visible at runtime! #}
  <p>{{ article.plainText }}</p>

  {# What properties does the image have? #}
  {% if article.asset|length %}
    <img src="{{ article.asset[0].url }}"
         alt="{{ article.asset[0].altText }}">
  {% endif %}
{% endfor %}
```

### The problems:
- Typos in field names only become visible at runtime
- CI/CD pipelines cannot catch these errors
- No IDE support (autocomplete, go-to-definition)
- Refactoring is dangerous (field rename in CMS → manually update all templates)

---

## Query API + TypeScript

The [Query API](/libraries/craft-query-api) Plugin brings TypeScript to Craft CMS through automatic type generation. This works with any frontend setup - whether you're building a headless application or enhancing a traditional Twig site.

**How it works:**
- Query API analyzes your Craft schema (sections, fields, entry types)
- Automatically generates TypeScript definitions
- Updates types whenever your Craft configuration changes

### Automatic Type Generation

A simple command can generate all TypeScript types from the Project YAML.

```bash
php craft query-api/typescript/generate-types
```

Or even better, the TypeScript definition is automatically updated
whenever a Project Config change occurs. This can be done by simply configuring the [Query API](/libraries/craft-query-api).

```php [config/query-api.php]
return [
  'typeGenerationMode' => 'auto',  // Automatic regeneration on schema changes
  'typeGenerationOutputPath' => '@root/frontend/shared/types/base.ts', // Set the path where the generated TS file should be saved
];
```

### What Gets Generated?

Query API automatically detects all your Craft elements and generates a large TypeScript file.
The plugin understands when a field is required or limited to a single value.
Here's an example of what this can look like.

:::code-tree{defaultValue="frontend/shared/types/base.ts"}

```typescript[frontend/shared/types/base.ts]
// --- hardTypes ---
export type CraftDateTime = {
    date: string
    timezone: string
    timezone_type: number
}

export type CraftColor = {
    hex: string
    rgb: string
    hsl: string
}

export type CraftCountry = {
    name: string
    countryCode: string
    threeLetterCode: string
    locale: string
    currencyCode: string
    timezones: string[]
}

export type CraftMoney = {
    amount: string
    currency: string
}

export type CraftLinkTarget = '_blank' | '_self'

export type CraftLink = {
    elementType: string
    url: string
    label: string
    target: CraftLinkTarget
    rel: string
    urlSuffix: string
    class: string
    id: string
    ariaLabel: string
    download: boolean
    downloadFile: string
}

export type CraftJson = object | object[]

export type CraftAssetFocalPoint = {
    x: number
    y: number
}

export type CraftAssetMeta = {
    id: number
    filename: string
    kind: string
    size: string
    mimeType: string
    extension: string
    cpEditUrl: string
    volumeId: number
}

export type CraftAddressMeta = {
    id: number
}

export type CraftUserStatus = 'inactive' | 'active' | 'pending' | 'credentialed' | 'suspended' | 'locked'

export type CraftUserMeta = {
    id: number
    status: CraftUserStatus
    cpEditUrl: string
}

export type CraftEntryRelation = {
    title: string
    slug: string
    url: string
    id: number
}

export type CraftEntryStatus = 'live' | 'pending' | 'expired' | 'disabled'

export type CraftEntryMeta = {
    id: number
    entryType: string
    sectionId: number
    siteId: number
    url: string
    slug: string
    uri: string
    fullUri: string
    status: CraftEntryStatus
    cpEditUrl: string
}

export interface CraftPageBase {
    metadata: CraftEntryMeta
    sectionHandle: string
    title: string
}

export type CraftTagMeta = {
    id: number
}

export type CraftTag = {
    metadata: CraftTagMeta
    title: string
    slug: string
}

// --- addresses ---
export type CraftAddress = {
    metadata: CraftAddressMeta
    title: string
    addressLine1: string
    addressLine2: string
    addressLine3: string
    countryCode: string
    locality: string
    postalCode: string
}

// --- assets ---
export type CraftAssetRatio = {
    auto: string
    '1:1': string
    '34': string
    '16 9': string
    '2/3': string
    dominantColor: string
}

export type CraftVolumeImages = {
    metadata: CraftAssetMeta
    height: number
    width: number
    focalPoint: CraftAssetFocalPoint
    url: string
    title: string
    srcSets: CraftAssetRatio
    altText: string | null
    linkField: CraftLink | null
}

export type CraftVolumeGraphics = {
    metadata: CraftAssetMeta
    height: number
    width: number
    focalPoint: CraftAssetFocalPoint
    url: string
    title: string
    srcSets: CraftAssetRatio
    alt: string | null
}

export type CraftAsset = CraftVolumeImages | CraftVolumeGraphics

// --- entryTypes ---
export interface CraftEntryTypeAuthor {
    selectAuthor: (CraftUser)[] | null
    address: (CraftAddress)[] | null
    linkField: CraftLink | null
}

export interface CraftEntryTypeCta {
    title: string
    headlineTag: CraftOptionHeadlineTag
    plainText: string | null
    entries: (CraftEntryRelation)[] | null
}

export interface CraftEntryTypeDefaultFields {
    title: string
    address: (CraftAddress)[]
    asset: (CraftAsset)[]
    buttonGroup: CraftOptionButtonGroup
    categories: (CraftCategoryNewsFilter)[]
    checkboxes: (CraftOptionCheckboxes)[]
    color: CraftColor
    contentBlock: CraftContentBlockContentBlock | null
    country: CraftCountry
    date: CraftDateTime | null
    dropdown: CraftOptionDropdown | null
    email: string | null
    entries: (CraftEntryRelation)[] | null
    iconField: string | null
    json: CraftJson | null
    lightswitch: boolean | null
    linkField: CraftLink | null
    matrix: (CraftEntryTypeHeadline | CraftEntryTypeImageText)[] | null
    money: CraftMoney | null
    multiSelect: (CraftOptionMultiSelect)[] | null
    number: number | null
    plainText: string | null
    radioButtons: CraftOptionRadioButtons | null
    range: number | null
    table: (CraftTableTable)[] | null
    tags: (CraftTag)[] | null
    time: CraftDateTime | null
    users: (CraftUser)[] | null
    generatedField: string
}

export interface CraftEntryTypeHeadline {
    title: string
    headlineTag: CraftOptionHeadlineTag
}

export interface CraftEntryTypeHome {
    title: string
    asset: (CraftAsset)[] | null
    selectAuthor: (CraftUser)[] | null
    plainText: string | null
    richtext: string | null
    contentBuilder: (CraftEntryTypeAuthor | CraftEntryTypeHeadline | CraftEntryTypeImageText | CraftEntryTypeNewsTeaser | CraftEntryTypeLink | CraftEntryTypeHyperLink)[] | null
    cta: (CraftEntryTypeCta)[] | null
}

export interface CraftEntryTypeHyperLink {
    hyperField: DynamicHardType
}

export interface CraftEntryTypeImageText {
    asset: (CraftAsset)[] | null
    plainText: string | null
}

export interface CraftEntryTypeLink {
    linkText: string | null
    openInNewTab: boolean | null
    linkField: CraftLink | null
}

export interface CraftEntryTypeNewsTeaser {
    categories: (CraftCategoryNewsFilter)[] | null
    newsTag: (CraftTag)[] | null
}

export interface CraftEntryTypeRelationalFieldsWithMaxSetting {
    title: string
    singleRelatedAddress: CraftAddress | null
    singleRelatedAsset: CraftAsset | null
    singleRelatedCategory: CraftCategoryNewsFilter | null
    singleMatrix: CraftEntryTypeCta | null
    singleRelatedEntry: CraftEntryRelation | null
    singleRelatedUser: CraftUser | null
    matrixMaxRelations: CraftEntryTypeRelationalFieldsWithMaxSetting | null
}

export interface CraftEntryTypeRelations {
    title: string
    entries: (CraftEntryRelation)[] | null
}

export interface CraftPageHome extends CraftEntryTypeHome {
    metadata: CraftEntryMeta
    title: string
    sectionHandle: string
}

export interface CraftPageDefaultFields extends CraftEntryTypeDefaultFields {
    metadata: CraftEntryMeta
    title: string
    sectionHandle: string
}

export interface CraftPageRelationalFieldsWithMaxSetting extends CraftEntryTypeRelationalFieldsWithMaxSetting {
    metadata: CraftEntryMeta
    title: string
    sectionHandle: string
}

export interface CraftPageRelations extends CraftEntryTypeRelations {
    metadata: CraftEntryMeta
    title: string
    sectionHandle: string
}

// --- users ---
export type CraftUser = {
    metadata: CraftUserMeta
    username: string | null
    fullName: string | null
    photo: CraftAsset | null
    email: string | null
    address: (CraftAddress)[] | null
}

// --- categories ---
export interface CraftCategoryBlogFilters {
    title: string
    plainText: string | null
}

export interface CraftCategoryNewsFilter {
    title: string
    entries: (CraftEntryRelation)[] | null
    selectAuthor: (CraftUser)[] | null
}

// --- tables ---
export interface CraftTableTable {
    col1: string
    col1Handle: string
    col2: string
    col2Handle: string
}

// --- options ---
export type CraftOptionValueDropdown = 'optionA' | 'optionB'

export type CraftOptionDropdown = {
    label: string
    selected: boolean
    valid: boolean
    icon: string | null
    color: string | null
    value: CraftOptionValueDropdown
}

export type CraftOptionValueHeadlineTag = 'h1' | 'h2' | 'h3' | 'h4'

export type CraftOptionHeadlineTag = {
    label: string
    selected: boolean
    valid: boolean
    icon: string | null
    color: string | null
    value: CraftOptionValueHeadlineTag
}

export type CraftOptionValueRadioButtons = 'optionA' | 'optionB'

export type CraftOptionRadioButtons = {
    label: string
    selected: boolean
    valid: boolean
    icon: string | null
    color: string | null
    value: CraftOptionValueRadioButtons
}

export type CraftOptionValueCheckboxes = 'firstOption' | 'secondOption'

export type CraftOptionCheckboxes = {
    label: string
    selected: boolean
    valid: boolean
    icon: string | null
    color: string | null
    value: CraftOptionValueCheckboxes
}

export type CraftOptionValueMultiSelect = 'optionA' | 'optionB'

export type CraftOptionMultiSelect = {
    label: string
    selected: boolean
    valid: boolean
    icon: string | null
    color: string | null
    value: CraftOptionValueMultiSelect
}

export type CraftOptionValueButtonGroup = 'optionA' | 'optionB'

export type CraftOptionButtonGroup = {
    label: string
    selected: boolean
    valid: boolean
    icon: string | null
    color: string | null
    value: CraftOptionValueButtonGroup
}

// --- contentBlocks ---
export interface CraftContentBlockContentBlock {
    richtext: string | null
    singleMatrix: CraftEntryTypeCta | null
    matrix: (CraftEntryTypeHeadline | CraftEntryTypeImageText)[] | null
}
```

:::

### Workflow:
1. Developer adds a new field in Craft CMS
2. Query API automatically detects the change
3. Types are regenerated
4. IDE immediately shows the new properties with autocomplete

---

## Type-Safe Queries

Let's see how [Query API](/libraries/craft-query-api)'s TypeScript types transform the development experience compared to traditional Twig.

### Twig: Errors Only at Runtime

In the traditional Twig setup, we have no compile-time safety. All errors only become visible at runtime:

```twig
{# Which fields can I select? No idea! #}
{% set articles = craft.entries()
  .section('articles')
  .orderBy('dateCreated DESC')
  .all() %}

{% for article in articles %}
  {# Errors only visible at runtime #}
  <h2>{{ article.titel }}</h2>  {# ← Typo! Should be 'title' #}

  {# Is asset an array? A single asset? Null? #}
  {% if article.asset|length %}
    {# ... hoping this works #}
  {% endif %}
{% endfor %}
```

### TypeScript: Type-Safe from Start to Finish

With the [Query API](/libraries/craft-query-api) SDK and generated TypeScript types, we get complete type-safety. The IDE knows exactly which properties are available, and the TypeScript compiler prevents errors during development:

```typescript
// Generic type parameter defines return type
// CraftPageDefaultFields comes from the automatically generated types
const { data, error } = await useCraftEntry<CraftPageDefaultFields[]>()
  .section('articles')
  .orderBy('dateCreated DESC')
  .all()

if (data.value) {
  const articles = data.value  // Type: CraftPageDefaultFields[]

  articles.forEach(article => {
    console.log(article.title)              // ✓ Type-safe
    console.log(article.titel)              // ✗ TS Error: Property 'titel' does not exist

    const image = article.asset[0]          // Type: CraftAsset | undefined
    if (image) {
      console.log(image.url)                // ✓ Type: string
      console.log(image.altText)            // ✓ Type: string | null
      console.log(image.focalPoint)         // ✓ Type: CraftAssetFocalPoint
      console.log(image.invalidProperty)    // ✗ TS Error!
    }
  })
}
```

---

## Testing

In larger applications, testing becomes increasingly important. Changes in Craft CMS must always be reflected in the frontend.
With a Twig stack, this can easily be forgotten in one place. But now we have TypeScript, so we always know
where something breaks.

### CI/CD
For example, a GitHub workflow could be added to the project that does nothing but run a typecheck.

Simple, right?

In my case, I use this setup to easily know with every PR that everything is working correctly.
The `ci.yaml` does a simple typecheck and the `check-craftType-definition-update.yml` comments if more than one project yaml
file changed but the craft type definition stayed the same. 

:::code-tree{defaultValue=".github/workflows/ci.yml"}

```yaml[.github/workflows/ci.yml]
name: CI

on:
  pull_request:
    branches:
      - main

permissions:
  actions: read
  contents: read

jobs:
  main:
    name: Install and Test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          filter: tree:0
          fetch-depth: 0

      - uses: actions/setup-node@v3
        name: Install Node.js
        with:
          node-version: 22
          cache: 'npm'

      - run: npm ci
      - uses: nrwl/nx-set-shas@v4

      - run: npm run ci
```

```[.github/workflows/check-craftType-definition-update.yml]
name: Check config changes require ts file update

on:
  pull_request:
    types: [opened, synchronize, reopened, ready_for_review]

permissions:
  contents: read
  pull-requests: write

jobs:
  check:
    runs-on: ubuntu-latest
    steps:
      - name: Check & comment
        uses: actions/github-script@v7
        with:
          script: |
            const owner = context.repo.owner;
            const repo = context.repo.repo;
            const prNumber = context.payload.pull_request.number;
            const allFiles = [];
            let page = 1;
            while (true) {
              const { data } = await github.rest.pulls.listFiles({
                owner, repo, pull_number: prNumber, per_page: 100, page
              });
              allFiles.push(...data);
              if (data.length < 100) break;
              page++;
            }
            const CONFIG_PREFIX = "config/";
            const BASE_TS = "frontend/shared/types/base.ts";
            const isYaml = (name) => name.endsWith(".yml") || name.endsWith(".yaml");
            const changedYamlInConfig = allFiles
              .map(f => f.filename)
              .filter(name => name.startsWith(CONFIG_PREFIX) && isYaml(name));

            const baseTsChanged = allFiles.some(f => f.filename === BASE_TS);

            core.info(`YAMLs in config/ geändert: ${changedYamlInConfig.length}`);
            core.info(`base.ts geändert: ${baseTsChanged}`);

            if (changedYamlInConfig.length > 1 && !baseTsChanged) {
              const body = "Hey, I noticed that more than one yaml file has changed. Be sure to run ddev composer run generate-types to adjust type definitions accordingly.";
              const existing = await github.paginate(github.rest.issues.listComments, {
                owner, repo, issue_number: prNumber, per_page: 100
              });
              const already = existing.some(c =>
                c.user?.type === "Bot" &&
                c.body?.includes("more than one yaml file has changed")
              );
              if (!already) {
                await github.rest.issues.createComment({ owner, repo, issue_number: prNumber, body });
              }
            }

```

```json[package.json]
{
  "scripts": {
    "lint": "eslint .",
    "typecheck": "nuxi typecheck",
    "ci": "npm run typecheck && npm run lint",
  },
}
```

:::

### Pre Commit

I assume you use git to manage your code! If not you probably should 😄. 
You can use [husky](https://typicode.github.io/husky/) and [lint-staged](https://github.com/lint-staged/lint-staged), to check your changed code before it even reaches the remote. 

:::code-tree{defaultValue="package.json"}

```sh [.husky/pre-commit.sh]
npx lint-staged
```

```json[package.json]

{
  "scripts": {
    "lint": "eslint .",
    "typecheck": "nuxi typecheck",
    "ci": "npm run typecheck && npm run lint",
  },
  "lint-staged": {
    "*.{js,jsx,vue,ts}": [
      "npm run ci"
    ]
  }
}
```
:::




## Conclusion

I am enjoying the confidence during development.
When you rename a field in Craft CMS, your IDE immediately shows you every single place in your codebase that needs updating. 
No grepping through template files hoping you found everything. The TypeScript compiler simply won't let you deploy until everything is fixed.

The autocomplete is genuinely useful. Instead of switching tabs to check the Craft CP for field names or digging through documentation, your IDE knows exactly what properties are available on each Craft element.

That said, this isn't some kind of black magic. You still need to run the type generation command (or set up auto-generation), and you still need to handle the types correctly in your code. TypeScript won't catch logic errors or incorrect queries. But typos in field names? Wrong property access? Those are gone.

Is it worth adding [Query API](/libraries/craft-query-api) just for the TypeScript types? If you're already building something with JavaScript/TypeScript on the frontend, absolutely. For pure Twig projects, probably not.
