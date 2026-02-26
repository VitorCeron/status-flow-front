# File names

- Use kebab-case, for example: `src\components\active-theme.tsx`, `src\components\ui\aspect-ratio.tsx`, `src\features\professional\calendar\components\availability-sidebar.tsx`
- For component names, always use PascalCase, for example: `DashboardLayout`, `ChangelogCard`

# Variables

- Always use descriptive variables, avoid shorthands for variables
- Use camelCase, for example: `requestHeaders`, `authToken`, `slotType`
- For consts use UPPER_CASE_PATTERN, for example: `IMPORTANT_INFO`, `COUNTRIES`

# Translations

- Always use translations, avoid hardcoded strings
  Example:

```javascript
const t = useTranslations("calendar.sidebar");
```

```javascript
t("titleCreate");
```

# API Requests

- Always use a file on `src\services` folder, do not make requests inside component or hooks
- Always use types to API response
- Always create JS Doc Block on services methods

# Types

- For values which has limited options, use Enums or Consts, for example:

```javascript
/**
 * Enum para os tipos de duplo fator de autenticação
 * @enum {string}
 */
export enum TwoFactorMethod {
  /** Email */
  EMAIL = 'email',

  /** Aplicativo de duplo fator de autenticação */
  APP = 'app'
}

//or

// Opções para o formulário
export const COUNTRIES = [
  { value: 'BR', label: 'Brasil' }
  // Adicionar outros países conforme necessário
] as const;
```

# Clean code

- Prefer use early return
- Not create more than 2 ident levels on conditionals or loops, if it is necessary, extract it into a separate function
- Keep code consistent
- Prefer use named parameters on functions, for example:

```javascript
function createMenu({ title, body, buttonText, cancellable }) {
  // ...
}

createMenu({
  title: "Foo",
  body: "Bar",
  buttonText: "Baz",
  cancellable: true,
});
```

- Functions should do one thing, if the function grows with more behaviors, extract to more functions
- Remove dead code, if code is unused, remove
- Follow Single Responsibility Principle (SRP), everything has one reason to change
- Open/Closed Principle (OCP)
- Liskov Substitution Principle (LSP)
- Error Handling, don't ignore caught errors, use try catch and show error, keeps clear what the next action for user to do, don't leave the user unsure of what to do if an error occurs.
