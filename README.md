# Projekt: system zarządzania dostępem - backend

### Spis wykonanych zadań
#### 1. Instalacja frameworku nest.js poprzez cli i zainicjalizowanie projektu Access-Management-BE
```
npx @nestjs/cli Access-Management-BE
```
#### 2. Instalacja wymaganych modułów do realizacji projektu
```
/* paczka do przetwarzania plików graficznych */
npm i jimp

/* paczki do obsługi typeorm (orm) oraz connector mysql2 do pracy z bazą danych (w projekcie użyta baza mysql, a dokładniej jej odłam - mariadb) */
npm i @nestjs/typeorm typeorm mysql2

/* paczka zod służy do walidacji danych z użyciem TypeScript'u i Schema validation */
npm i zod

/* paczka uuid pozwala na łatwe generowanie unikalnych identyfikatorów, ciągów znaków z np. uuidv4 */
npm i uuid

/* uznane paczki do realizacji strategii autentykacji i autoryzacji (tutaj z tokenem JWT) */
npm i @nestjs/passport passport passport-jwt

/* paczka do parsowania cookies - dodaje je do req.cookies*/
npm i cookie-parser

/* dodanie typów TS do ww. paczek oraz typów do multera (wbudowany w nest.js) */
npm i -D @types/cookie-parser @types/jsonwebtoken @types/multer @types/mime @types/passport-jwt @types/uuid
```

#### 3. Konfiguracja TypeOrm
1. Dodanie konfiguracji .typeorm.ts (konfiguracja ze względów bezpieczeństwa nie jest udostępniana i jest ignorowana w .gitignore)
2. Import dynamicznego modułu TypeOrmModule.forRoot w app.module

#### 4. Dodanie głównego modułu, kontrolera i serwisu do przetwarzania obrazu w celu detekcji linii papilarnych
1. npx @nestjs/cli g mo analyzer
2. npx @nestjs/cli g co analyzer
3. npx @nestjs/cli g s analyzer
4. Wstrzyknięcie providera - serwisu analyzer do kontrolera analyzer
5. Dodanie głównej metody w kontrolerze analyzer @Get('/analize') do realizacji zadania przetwarzania obrazu odcisku palca
5. Dodanie metody w serwisie analazer, która będzie realizowała cały proces przetwarzania obrazu
#### 5.