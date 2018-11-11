<!-- $theme: gaia -->

Вступление

Про компанию и кто я

-----

## Дробим приложение на репозитории

Если понадобилось:
* вынести часть логики из приложения, 
* использовать компоненты вне другого проекта,
* раздать права на редактирование различных частей приложения,
то пришла пора создавать новый репозиторий.


--------

* Типичная ошибка - собирать бандл, когда можно вполне обойтись прямым импортом.

--------

### Основное приложение

* `package.json` - именно `dependencies`, не `peerDependencies` и не `devDependencies`.
```json
"dependencies": {
  "@company/child-library": "git+https://github.com/company/child-library.git"
},
```

* любой модуль
```js
import { MyComponent } from '@company/library'
```

--------

### Библиотека

* `index.js`
```js
import MyComponent from './MyComponent.vue'
export {
  MyComponent,
}
```

--------

### Как с этим работать

* Держать в разных проектах, обновлять через `npm`.
* `npm link` - симлинк на дочерний проект из основного.
* `lerna` - инструмент для работы с проектами из нескольких репозиториев.

-----

### Что делать, если бандл все же нужен?

* Попытайтесь решить через `rollup`. Если не выходит - через `webpack`. Rollup умеет в tree-shaking.

-----


## Виды API

* веселые
* скучные

-----

### Веселые API

* Ошибки со статусом 200.
* False одним из вариантов: `0`, `‘0’`, `‘false'`.
* Приходят левые данные, которые никто не использует.
* Формат сохраняемых данных отличается от формата полученных.
* много других подобных штук...

-----

### Скучные API

* API без признаков `веселых`.

-----

### Как добиться качества?

1. Поругаться с бекендерами.
2. Отгораживаться.

-----

### Отгораживаемся от api

![](brick-wall.jpg)

* классы
* мапперы
* репозитории
* тесты апи

-----

#### Классы > JS

* декларация структуры данных
* поддержка IDE

```js
export class Client {
  constructor (data) {
    this.id = undefined
    this.name = ''
    this.owner = null
    
    Object.assign(this, data) 
  }
}
```

-----

#### Классы > TypeScript

```typescript
export class Company {
  id: number
  name: string = ''

  constructor (data: Partial<Company> = {}) {
    Object.assign(this, data)
  }
}
```


-----

#### Мапперы

* Суть - хелперы по преобразованию данных.
* Удобно тестировать через снепшоты.

```js
export class CompanyMapper {
  static toClass (data) {
    return new Company({ id: data.id, name: data.company_name })
  }
  static toObject (company) {
    return { id: company.id, company_name: company.name }
  }
}
```

-----

#### Репозиторий

Суть - обертка над ресурсом.

```js
export class CompanyRepository {
  async create (company) {
    const payload = CompanyMapper.toObject(company)
    await axios.post('companies', payload)
  }
}
```

Пример:

```js
await CompanyRepository.create(company)
```
-----

#### Тесты API

* Суть - тесты репозитория. Бонус - блекбокс тестирование фронта.
* Используются фабрики, полезные также для фронтовых компонентов.

Пример:
```js
const fresh = CompanyFactory.getNew()
const сreated = await CompanyRepository.create(fresh)
const loaded = await CompanyRepository.getOne(сreated)
expect(сreated.name).toBe(loaded.name)
```

-----


