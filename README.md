# Playwright SauceDemo — Testautomatisering

Læringsprosjekt i Playwright + TypeScript for testautomatisering mot [saucedemo.com](https://www.saucedemo.com).

## Kom i gang

### Forutsetninger
- Node.js 20+
- Git

### Installer

```bash
npm install
npx playwright install
```

### Kjør tester

```bash
# Alle tester (headless)
npm test

# Se nettleseren mens testene kjører
npm run test:headed

# Steg-for-steg debugging
npm run test:debug

# Visuell UI-modus (anbefalt for læring!)
npm run test:ui

# Kun én testfil
npx playwright test tests/login.spec.ts

# Åpne testrapport etter kjøring
npm run report
```

## Prosjektstruktur

```
playwright-saucedemo/
├── tests/              # Testfiler (.spec.ts)
│   ├── login.spec.ts       # US-01, US-02, US-03
│   ├── products.spec.ts    # US-04, US-05
│   ├── cart.spec.ts        # US-06, US-07
│   └── checkout.spec.ts    # US-08, US-09
├── pages/              # Page Object Model
│   ├── LoginPage.ts
│   ├── ProductsPage.ts
│   ├── CartPage.ts
│   └── CheckoutPage.ts
├── fixtures/
│   └── testData.ts     # Testbrukere og testdata
└── playwright.config.ts
```

## Testbrukere

| Bruker | Brukernavn | Passord |
|--------|-----------|---------|
| Standard | `standard_user` | `secret_sauce` |
| Blokkert | `locked_out_user` | `secret_sauce` |
| Problem | `problem_user` | `secret_sauce` |

## CI/CD

GitHub Actions kjører automatisk alle tester ved push til `main` og `develop`, og ved pull requests. Testrapporten lastes opp som en artefakt i 30 dager.

## Jira

Prosjektet trackes i Jira under prosjekt **KAN** — [capgemini-team-sr9moihg.atlassian.net](https://capgemini-team-sr9moihg.atlassian.net/jira/software/projects/KAN/boards)
