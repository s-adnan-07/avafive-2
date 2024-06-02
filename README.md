## Database container for dev mode

To start the postgres container

```bash
docker compose -f compose.postgres.yml up --build --detach
```

To remove the containers and volumes

```bash
docker compose -f compose.postgres.yml down -v
```

## Running containerized app in production

```bash
docker compse up --build --detach
```

To remove the containers and volumes

```bash
docker compose down -v
```

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```
