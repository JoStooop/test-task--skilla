# Проект: Управление звонками

### Архитектура проекта (FSD)
- `app`: Инициализация приложения (хранилище).
- `entities`: Бизнес-сущности (звонки).
- `features`: Фича приложения (таблица звонков).
- `shared`: Переиспользуемые компоненты, утилиты, хуки.
- `widgets`: Сложные компоненты, состоящие из нескольких фич.
- `pages`: Страницы приложения.

### Основные функции:
1. Таблица звонков:
   - Отображение списка звонков с возможностью фильтрации по типу (входящие/исходящие) и дате (сегодня, неделя, месяц, год).
   - Сортировка по длительности звонка.
2. Фильтрация и сортировка:
   - Динамическая фильтрация данных на основе выбранных параметров.
   - Сортировка данных по колонкам таблицы.
3. Аудиоплеер:

### Стек:
- React, Redux Toolkit, TypeScript, Axios, date-fns, react-datepicker

### Инструменты и ресурсы:
- Конвертер шрифтов: [Convertio](https://convertio.co/ru/otf-woff/) — использовался для конвертации шрифтов в форматы .woff, .woff2. и ttf.



### Описание задачи:
- [Открыть ТЗ в Figma](https://www.figma.com/design/yfFIzjZSTuLBR3FROcS26a/TZ-FRONT-2024?node-id=1-223&t=46CAJc7aQtfgkR1v-0) 

### Деплой:
[Открыть](https://test-task-skilla-kappa.vercel.app/)

***

```text
src/
├── app/
│   ├── store/
│   │   ├── selectors/*
│   │   └── slices/*
│   ├── styles/*
│   ├── App.tsx
│   └── main.tsx
│
├── entities/
│   └── call/
│       └── utils/
│           ├── filterByType.ts
│           ├── filterByDateRange.ts
│           ├── dateUtils.ts
│           └── formatDuration.ts
│
├── features/
│   └── calls-table/
│       ├── constants/
│       │   ├── headers.ts
│       │   └── tableOptions.ts
│       ├── model/
│       │   └── useCallsTable.ts
│       ├── types/
│       │   ├── tableOptionsTypes.ts
│       │   └── tableTypes.ts
│       └── ui/
│           └── CallsTable.tsx
│
├── pages/
│   └── calls-page/
│       └── CallsPage.tsx
│
│
├── shared/
│   ├── api/ 
│   │   ├── audioApi.ts
│   │   └── callsApi.ts
│   ├── assets/
│   │   └── fonts/
│   │       └── sf-pro-display/*
│   ├── lib/
│   │   └── hooks/
│   │       └── useAudio.ts
│   ├── ui/   
│   │   ├── audio-player/*
│   │   ├── call-group-header/*
│   │   ├── call-lead/*
│   │   ├── call-status/*
│   │   ├── dropdown-date/*
│   │   ├── dropdown-type/*
│   │   ├── icons/*
│   │   └── table-row/*
│   └── config.ts
│
├── widgets/
│   └── calls-table/
│       └── ui/
│           ├── table-body/*
│           ├── table-head/*
│           └── table-header/*
│
```
### Установка и запуск:
Установите зависимости:
```bash
npm install
```
Запустите проект:
```bash
npm run dev
```

### Контакты:
- Email: ivantm.dev@gmail.com
- Github: [JoStooop](https://github.com/JoStooop)

