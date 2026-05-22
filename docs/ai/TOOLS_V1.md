# 9Ruby Tools V1

## Direction

- `9ruby.com/tools` is the public no-login toolbox.
- All tools are free in v1.
- Reports and generated files are export-only.
- No account storage, database writes, checkout, or model API calls are used.
- Monetization happens through `Fix this for me` service CTAs.

## Tool Routes

- `/tools/seo-checker`
- `/tools/color-palette`
- `/tools/meta-generator`
- `/tools/image-compressor`
- `/tools/json-formatter`
- `/tools/qr-generator`
- `/tools/font-pairing`
- `/tools/website-speed-test`
- `/tools/hashtag-generator`
- `/tools/privacy-policy-generator`
- `/tools/ai-copywriter`
- `/tools/favicon-generator`

## CTA Contract

Every tool should link service intent to:

```txt
/contact?source=tool&tool=<slug>
```

Examples:

```txt
/contact?source=tool&tool=seo-checker
/contact?source=tool&tool=image-compressor
```

## Source Files

- Tool metadata: `src/lib/tools.ts`
- Toolbox index: `src/app/tools/page.tsx`
- Dynamic local tools: `src/app/tools/[slug]/page.tsx`
- Client tool runner: `src/components/tools/DynamicToolRunner.tsx`
- Shared service CTA: `src/components/tools/ToolServiceCta.tsx`
