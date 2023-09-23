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
5. Dodanie metody w serwisie analyzer, która będzie realizowała cały proces przetwarzania obrazu
#### 5. Dodanie modułu do autentykacji i autoryzacji użytkownika
Moduł auth, jest kluczowym modułem, który ma za zadanie określenie, czy osoba, która próbuje uzyskać dostęp ma odpowiednie uprawnienia. W tym celu możemy przyjąć różne kryteria, według, których chcemy zweryfikować daną osobę np.:

A. Jedynie sam odcisk palca może być wystarczającym kryterium, spełniającym założenia uzyskania dostępu.

B. Zarówno odcisk palca i kod PIN (Personal Identification Number) jest wymagany przy każdorazowym próbie uzyskania dostępu (tzw. "logowania")

C. Zarówno odcisk palca i kod PIN jest wymagany. Jednak w sytuacji, gdy już raz uzyskaliśmy dostęp (zalogowaliśmy się prawidłowo), nie jest wymagane ponowne podanie kodu PIN. Oznacza to, że jesteśmy w stanie, w prostszy sposób uzyskać dostęp. Jest to szczególnie ważne, kiedy nasz system jest rozproszony na wiele punktów wymagających zalogowania i nie chcemy kosztem bezpieczeństwa utrudniać codzienną pracę załogi statku.

W niniejszej aplikacji zastosuję się do scenariusza C. Uważam, że ten wariant znacznie podnosi bezpieczeństwo. Ograniczna dostęp osobom nieupoważnionym, a zarazem jest komfortowy w użyciu, nawet przy wielu punktach uzyskiwania dostępu. 

Powyższy scenariusz jest zbliżony do sposobu, w jaki odbywa się logowanie w serwisach i aplikacjach internetowych - logowanie do banku, sklepu, serwisu informacyjnego, czy też portalu społecznościowego. Różnica jest m.in. w tym, że tam wymagany jest login i hasło, a u nas wymagany jest kod PIN oraz skan linii papilarnych, który w przeciwieństwie do logowania za pomocą loginu i hasła, jest odporny na brute force i wykorzystanie rainbow tables.

Warto zauważyć, że w standardowych serwisach, nie jest wymagane ciągłe podawanie loginu i hasła - nasza sesja zwykle trzymana jest przez określony czas w bezpiecznych plikach cookies, ewentualnie LocalStorage. W przypadku niniejszej aplikacji przyjmuję, że na statku zapewniona jest stałe połączenie sieciowe, zarówno sieć globalna oraz wewnętrzna sieć lokalna, łącząca punkty zarządzania dostępem w jeden system, którym będzie niniejsza aplikacja.
Sieć globalna może nie być wymogiem koniecznym, ale z pewnością daje znaczące możliwości zarządzania dostępem osobom na najwyższym szczeblu (Armator, Agent i inne osoby odpowiedzialne za zarządzanie niniejszą aplikacją). Często takie stanowisko należy do konta z największymi uprawnieniami w aplikacji. Konto takiej osoby zwykle nazywamy Adminem, SuperAdminem lub Operatorem.

Admin z najwyższego poziomu może: dodawać nowych członków załogi do systemu zarządzanie dostępem, zarządzać uprawnieniami, modyfikować i usuwać konta, mieć wgląd w historię użytkowania systemu (historię użytkowania - logi systemowe można by w dalszym ciągu zautomatyzować, tak, aby Admin otrzymywał raporty o aktywności i wyłapywać wszelakie odchylenia np. brak aktywności danego Oficera zgodnie z przyjętym system zmian wachtowych)

1. npx @nestjs/cli g mo auth
2. npx @nestjs/cli g co auth
3. npx @nestjs/cli g s auth
4. Dodanie metody w kontolerze @Post('/register') do rejestracji nowego użytkownika (nowy członek załogi, który ma mieć określony dostęp do stref na statku) - metoda ta korzysta z multera (middleware odpowiedzialnego za obsługę multipart/form-data, czyli obsługi uploud'u plików)
pierwszej rejestracji użytkownika (nowy członek załogi, który ma mieć określony dostęp do stref na statku). W praktyce taki skan rejestrujący nowego członka załogi mógłby odbywać się tuż przed samym wejściem na statek, albo wcześniej zgodnie z istniejącymi procedurami bezpieczeństwa określanymi przez Armatora lub inne wymogi prawne (kwestie prawne należy zawsze konsultować ze specjalistami, ponadto każdy kraj może mieć inne podejście do bezpieczeństwa oraz gromadzenia i przetwarzania danych osobowych i potencjalnie wrażliwych)
5. Dodanie metody w kontolerze @Post('/login') do logowania (autentykacji/uwierzytelania) już zarejestrowanych użytkowników. W praktycznym scenariuszu metoda ta, obsługuje otrzymany skan ze skanera linii papilarnych, umieszczonego gdzieś na statku np. przed wejściem na mostek nawigacyjny. Po prawidłowej autentykacji oraz autoryzacji (sprawdzeniu, czy dany członek załogi ma odpowiednie uprawnienia do korzystania z mostku nawigacyjnego) brama/drzwi/zamek/wejście odblokowuje się, dając dostęp do pomieszczenia (W samym pomieszczeniu mogą znajdować się kolejne etapy uzyskania dostępu (inne niż odcisk palca) lub wymóg powtórzenia skanu linii papilarnych w celu uzyskania dostępu do konkretnych, kluczowych dla bezpieczeństwa stref/urządzeń)
6. 