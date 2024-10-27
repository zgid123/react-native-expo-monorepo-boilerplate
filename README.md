# Install

```sh
yarn install
```

# Structure

```sh
├── @types
├── packages
│   ├── @config
│   ├── @core
│   │   ├── api
│   │   ├── i18n
│   │   └── utils
│   └── @react-native
│       ├── i18n
│       ├── ui-kit
│       └── utils
└── workspaces
    ├── major-app
    └── minor-app
```

- @types: global types for whole project
- packages: contains library packages for workspace
  - @config: tsconfig
  - @core: all packages for all mono projects
    - api: contains axios config for all mono projects
    - i18n: contains all translations for all mono projects
    - utils: contains all utilities for all mono projects
  - @react-native: all packages for React Native
    - i18n: init i18n for React Native
    - ui-kit: custom design system
    - utils: contains all utils for React Native (react-query, react-hook-form and zustand)
- workspaces
  - major-app: major mobile app
  - minor-app: minor mobile app

# NOTE

- if installing any package that causes expo app crashed, create dummy project and try to install that package to that project

- at the moment, cannot use router typing from expo due to symlink node_modules, check `.expo/types/router.d.ts` for the name of route
