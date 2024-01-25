# Changelog


## v0.0.6

[compare changes](https://github.com/haus23/runde-tips/compare/v0.0.5...v0.0.6)

### 🚀 Enhancements

- Add textfield components. ([59ae6f4](https://github.com/haus23/runde-tips/commit/59ae6f4))
- Add link components. Resolves #1, resolves #3, resolves #13 ([#1](https://github.com/haus23/runde-tips/issues/1), [#3](https://github.com/haus23/runde-tips/issues/3), [#13](https://github.com/haus23/runde-tips/issues/13))
- Implement auth state broadcasting. See #15 ([#15](https://github.com/haus23/runde-tips/issues/15))
- Reuse mail but invalidate old code if revisiting login page. ([a2ac09e](https://github.com/haus23/runde-tips/commit/a2ac09e))

### 🩹 Fixes

- Type imports. ([98260b7](https://github.com/haus23/runde-tips/commit/98260b7))

### 💅 Refactors

- Simplify theme by now. No brand color switching. ([545e47a](https://github.com/haus23/runde-tips/commit/545e47a))
- Adapt design system from react aria starter. See issue #1, issue #3, issue #13 and issue #14. ([#1](https://github.com/haus23/runde-tips/issues/1), [#3](https://github.com/haus23/runde-tips/issues/3), [#13](https://github.com/haus23/runde-tips/issues/13), [#14](https://github.com/haus23/runde-tips/issues/14))
- Rebuild the menu component. ([25f8133](https://github.com/haus23/runde-tips/commit/25f8133))
- Drop cva. Resolves #14 ([#14](https://github.com/haus23/runde-tips/issues/14))
- Simplify auth flow. Won't fix and closes #15 ([#15](https://github.com/haus23/runde-tips/issues/15))

### 🏡 Chore

- Update deps. ([3cdbf77](https://github.com/haus23/runde-tips/commit/3cdbf77))

### 🤖 CI

- Update biome. ([0a4340f](https://github.com/haus23/runde-tips/commit/0a4340f))

### ❤️ Contributors

- Micha Buchholz ([@lean-dev](http://github.com/lean-dev))

## v0.0.5

[compare changes](https://github.com/haus23/runde-tips/compare/v0.0.4...v0.0.5)

### 🚀 Enhancements

- Create FOH layout. ([4b4a9ec](https://github.com/haus23/runde-tips/commit/4b4a9ec))
- Add email form for auth-flow. ([4ea805a](https://github.com/haus23/runde-tips/commit/4ea805a))
- A onboarding form route. ([e8497ce](https://github.com/haus23/runde-tips/commit/e8497ce))
- Implement sending emails. ([77bdeca](https://github.com/haus23/runde-tips/commit/77bdeca))
- Create email template for sending totp code. ([8f16002](https://github.com/haus23/runde-tips/commit/8f16002))
- Implement auth flow - the good one first. ([9dba0e1](https://github.com/haus23/runde-tips/commit/9dba0e1))
- Provide singleton prisma instance. ([b2cc33e](https://github.com/haus23/runde-tips/commit/b2cc33e))
- Validate email address against user db. ([01f46c6](https://github.com/haus23/runde-tips/commit/01f46c6))
- Validate email address. ([3a88506](https://github.com/haus23/runde-tips/commit/3a88506))
- Prepare onboarding. ([46f602c](https://github.com/haus23/runde-tips/commit/46f602c))
- Handle onboarding and log user in. ([dc2ca7a](https://github.com/haus23/runde-tips/commit/dc2ca7a))
- Implement logout feature. ([336e748](https://github.com/haus23/runde-tips/commit/336e748))
- Handle login via magic link. ([d5e929a](https://github.com/haus23/runde-tips/commit/d5e929a))

### 🩹 Fixes

- Adjust type imports. ([51b847a](https://github.com/haus23/runde-tips/commit/51b847a))
- Import type syntax. ([cde36bc](https://github.com/haus23/runde-tips/commit/cde36bc))

### 💅 Refactors

- Customize error message. ([798824d](https://github.com/haus23/runde-tips/commit/798824d))
- Restart auth flow with custom implementation. ([57fa046](https://github.com/haus23/runde-tips/commit/57fa046))

### 📖 Documentation

- Update workflow doc. ([e102f34](https://github.com/haus23/runde-tips/commit/e102f34))
- Update gh workflow. ([0bf6274](https://github.com/haus23/runde-tips/commit/0bf6274))

### 📦 Build

- Refine tsconfig settings. ([30d1919](https://github.com/haus23/runde-tips/commit/30d1919))

### 🏡 Chore

- Update prisma and switch to sqlite for now. ([5e82b65](https://github.com/haus23/runde-tips/commit/5e82b65))
- Add auth deps. ([efee4f8](https://github.com/haus23/runde-tips/commit/efee4f8))

### 🤖 CI

- Enforce type imports and exports. ([5bf87f0](https://github.com/haus23/runde-tips/commit/5bf87f0))
- Update biome. And format source code. ([beda0a1](https://github.com/haus23/runde-tips/commit/beda0a1))

### ❤️ Contributors

- Micha Buchholz ([@lean-dev](http://github.com/lean-dev))

## v0.0.4

[compare changes](https://github.com/haus23/runde-tips/compare/v0.0.3...v0.0.4)

### 🚀 Enhancements

- Switch to flat routes. Resolves #10 ([#10](https://github.com/haus23/runde-tips/issues/10))

### 📖 Documentation

- Start documenting the project. ([b465ccc](https://github.com/haus23/runde-tips/commit/b465ccc))

### 🏡 Chore

- Ignore log files. ([a45e88e](https://github.com/haus23/runde-tips/commit/a45e88e))
- Install flat routes package. ([7bb4ce3](https://github.com/haus23/runde-tips/commit/7bb4ce3))

### ❤️ Contributors

- Micha Buchholz ([@lean-dev](http://github.com/lean-dev))

## v0.0.3

[compare changes](https://github.com/haus23/runde-tips/compare/v0.0.2...v0.0.3)

### 🚀 Enhancements

- Add user model ([bdd656e](https://github.com/haus23/runde-tips/commit/bdd656e))
- Add script to create an initial admin user. ([aefcdc7](https://github.com/haus23/runde-tips/commit/aefcdc7))

### 🩹 Fixes

- Change favicon. ([f52505d](https://github.com/haus23/runde-tips/commit/f52505d))
- Clean up menu component. ([85b0bb9](https://github.com/haus23/runde-tips/commit/85b0bb9))
- More cleanup. ([a76bb11](https://github.com/haus23/runde-tips/commit/a76bb11))

### 🏡 Chore

- Update all deps. ([ab6ac6c](https://github.com/haus23/runde-tips/commit/ab6ac6c))
- Install and initialize prisma. ([2d983e2](https://github.com/haus23/runde-tips/commit/2d983e2))

### ❤️ Contributors

- Micha Buchholz ([@lean-dev](http://github.com/lean-dev))

## v0.0.2

[compare changes](https://github.com/haus23/runde-tips/compare/v0.0.1...v0.0.2)

### 🚀 Enhancements

- Add component colors and prepare themes handling. ([6b54cef](https://github.com/haus23/runde-tips/commit/6b54cef))
- Add button component and prepare variant system. ([0c43889](https://github.com/haus23/runde-tips/commit/0c43889))
- Prepare colors and provide teaser colors. ([2d38aab](https://github.com/haus23/runde-tips/commit/2d38aab))
- Add icon library. ([0c36b94](https://github.com/haus23/runde-tips/commit/0c36b94))
- Add toolbar button variant. Still open is issue #3 ([#3](https://github.com/haus23/runde-tips/issues/3))
- Add menu component (WIP). Add theme menu (also WIP) ([0207091](https://github.com/haus23/runde-tips/commit/0207091))
- Implement brand colors switching. See #4 ([#4](https://github.com/haus23/runde-tips/issues/4))
- Implement getting and respecting color scheme from client. ([c89c020](https://github.com/haus23/runde-tips/commit/c89c020))
- Implement color theme switching. Resolves #4 ([#4](https://github.com/haus23/runde-tips/issues/4))

### 📦 Build

- Install react aria components and helpers. ([e1e905f](https://github.com/haus23/runde-tips/commit/e1e905f))

### 🏡 Chore

- Update deps. ([b7ea007](https://github.com/haus23/runde-tips/commit/b7ea007))

### ✅ Tests

- Refine button stories. ([f46dc72](https://github.com/haus23/runde-tips/commit/f46dc72))
- Drop ladle. Resolves #6 and resolves #5 ([#6](https://github.com/haus23/runde-tips/issues/6), [#5](https://github.com/haus23/runde-tips/issues/5))

### 🤖 CI

- Update biome. ([213ebab](https://github.com/haus23/runde-tips/commit/213ebab))
- Update biome. ([bab3853](https://github.com/haus23/runde-tips/commit/bab3853))
- Add sink route. See #6 ([#6](https://github.com/haus23/runde-tips/issues/6))

### ❤️ Contributors

- Micha Buchholz <micha@haus23.net>

## v0.0.1

[compare changes](https://github.com/haus23/runde-tips/compare/v0.0.1-0...v0.0.1)

### 🩹 Fixes

- Remove useLayoutEffect warning. Intro to framer motion as well. ([8b0458f](https://github.com/haus23/runde-tips/commit/8b0458f))
- Start a new color system. ([f9bfb1f](https://github.com/haus23/runde-tips/commit/f9bfb1f))

### 📦 Build

- Add imports path. Start tweaking tsconfig. ([fd83dfb](https://github.com/haus23/runde-tips/commit/fd83dfb))

### 🏡 Chore

- **release:** V0.0.1-0 ([1850bb5](https://github.com/haus23/runde-tips/commit/1850bb5))
- Wipe out current radix based color system. ([520715e](https://github.com/haus23/runde-tips/commit/520715e))

### ❤️ Contributors

- Micha Buchholz <micha@haus23.net>

## v0.0.1-0


### 🚀 Enhancements

- Add header component. ([c316682](https://github.com/haus23/runde-tips/commit/c316682))

### 📦 Build

- Drop entry files by now. ([b998192](https://github.com/haus23/runde-tips/commit/b998192))
- Add tailwind support ([502a53b](https://github.com/haus23/runde-tips/commit/502a53b))
- Add radix ui colors based color system ([4a36564](https://github.com/haus23/runde-tips/commit/4a36564))

### 🏡 Chore

- Scaffold remix app. Initial commit. ([94ccc5a](https://github.com/haus23/runde-tips/commit/94ccc5a))
- Clean up scaffolded app. ([23659b3](https://github.com/haus23/runde-tips/commit/23659b3))
- Add license and update package informations. ([93338c2](https://github.com/haus23/runde-tips/commit/93338c2))

### ✅ Tests

- Install and configure ladle for component ui testing. ([4fc369c](https://github.com/haus23/runde-tips/commit/4fc369c))
- Integrate tailwind and add logo component. ([6cae2fe](https://github.com/haus23/runde-tips/commit/6cae2fe))
- Add darkmode support ([8914d04](https://github.com/haus23/runde-tips/commit/8914d04))

### 🤖 CI

- Configure biome as linter and formatter. ([e14211c](https://github.com/haus23/runde-tips/commit/e14211c))
- Drop eslint. ([c74c2db](https://github.com/haus23/runde-tips/commit/c74c2db))
- Provide editorconfig. ([3f53f91](https://github.com/haus23/runde-tips/commit/3f53f91))

### ❤️ Contributors

- Micha Buchholz <micha@haus23.net>

