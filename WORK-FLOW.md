### Info
Приложение построено на основе Feature-Based Clean Architecture

[module work-flow](https://app.diagrams.net/#G1gVdJPypOvZcZOhpRHi0t1dIKr78MgQEd#%7B%22pageId%22%3A%22LSekomSgcZXSJhuSvN8k%22%7D)

### Git

В `develop` ветке актуальное состояние проекта. Новые ветки создаются из нее.

Под новую фичу создается ветка формата:
```git
feature/module/feature-name
```

Пример
```git
feature/order/new-order
feature/account/add-new-account
```

Все коммиты делаются в cозданную ветку, соблюдая
[commit-convention](COMMIT-CONVENTION.md).
Когда работа над фичой закончена, создается `Pull Request` в `develop`