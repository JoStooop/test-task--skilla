
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

- Конвертор шрифтов - https://convertio.co/ru/otf-woff/
- Динамические стили, если будет необходимость добавить темную тему
- Данные в плеере подгружаются по клику. Изоляция логики
