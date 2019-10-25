# compano-atelie-be
**Version 0.0.1** ComPano Atelie's BackEnd

## Goal
Developing a backend structure with that meets the need for a sewing studio service process.

### Configuration
Basically for a running application it is necessary to configure:
- Server HTTP (Express)
- Routs (Express)
- Connection database (PostresSQL / pg).
- Node 6.0.0 iguals or over
- Sequelize client on global

## Instalation
Make the destiny folder and download the project from git repository:

```sh
$ mkdir /app
$ cd /app
$ git clone https://github.com/andremferreira/compano-atelie-be.git
$ npm update
```
### Preparation 
Configure the database structure and initial seed.
```sh
$ npm run migrate:reset
```
### Application profile
Initialize the app on development mode **dev mode**.
```sh
$ npm run dev
```
Initialize the app on test mode **test mode**.
```sh
$ npm run test
```
Initialize the app on production mode **production mode**.
```sh
$ npm run prod
```

## Data Base Default
Using padronization structure names fields.

### Preparation
**vc_** - Character Varying
**tx_** - Text
**ch_** - Character
**js_** - JSON
**nu_** - Numeric
**tm_** - Time
**dt_** - Date
**ts_** - Timestamp
**bo_** - Boolean
**fl_** - Float
**id_** - Serial
**bi_** - Bigint
**bl_** - Blob
**cl_** - Clob
