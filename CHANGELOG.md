# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [0.4.24](https://github.com/Kolobok12309/My-auth_back/compare/v0.4.23...v0.4.24) (2021-02-22)


### Features

* **auth:** :sparkles: Add password restore ([58f372c](https://github.com/Kolobok12309/My-auth_back/commit/58f372c2d36d18deb476d9143e3301271b997e07))


### Bug Fixes

* **auth:** :sparkles: Return restore code if mailing disabled ([0bd6f29](https://github.com/Kolobok12309/My-auth_back/commit/0bd6f29cc98da199a61085b243b737a35d9329d6))
* **task:** Change minLength of title and description ([d1ed8e0](https://github.com/Kolobok12309/My-auth_back/commit/d1ed8e01bea36efc9721bc8899356737c5b0493f))

### [0.4.23](https://github.com/Kolobok12309/My-auth_back/compare/v0.4.22...v0.4.23) (2021-02-14)


### Features

* :sparkles: Add ChangePassword endpoint ([7250c3a](https://github.com/Kolobok12309/My-auth_back/commit/7250c3a05bf9a126b98440a725fb5ec545dcc595))

### [0.4.22](https://github.com/Kolobok12309/My-auth_back/compare/v0.4.21...v0.4.22) (2021-02-14)


### Features

* :sparkles: Add filter params to getAll groups ([3009791](https://github.com/Kolobok12309/My-auth_back/commit/3009791a3f92d3c008aabcb1fc5046387b655955))
* :zap: Update user view and group default relations ([f4d93e1](https://github.com/Kolobok12309/My-auth_back/commit/f4d93e1423a9a0cd999b756db57f8985e948297e))


### Bug Fixes

* :ambulance: Fix undefined createdAt while sql sorting ([f1bdd2c](https://github.com/Kolobok12309/My-auth_back/commit/f1bdd2c4bb6ccf581e62591cb84cbcbba1dfa43d))

### [0.4.21](https://github.com/Kolobok12309/My-auth_back/compare/v0.4.20...v0.4.21) (2021-02-14)


### Bug Fixes

* **auth:** :bug: Fix exception type ([1b49f09](https://github.com/Kolobok12309/My-auth_back/commit/1b49f0922e04ff78574f62a7a830b8247658dced))
* **auth:** Critical fix while refresh tokens ([12e3426](https://github.com/Kolobok12309/My-auth_back/commit/12e3426e81b4a2d3c0a96baf29fb64f9c128d20f))

### [0.4.20](https://github.com/Kolobok12309/My-auth_back/compare/v0.4.19...v0.4.20) (2021-02-14)


### Features

* **user:** :sparkles: Add groupId param to user search ([2ba539d](https://github.com/Kolobok12309/My-auth_back/commit/2ba539d056e723f2ab7de290193aabd2dc175e27))


### Bug Fixes

* **task:** :bug: Fix FileView after task update ([23aa9c3](https://github.com/Kolobok12309/My-auth_back/commit/23aa9c3408bfa1d2dd01a51956d021ba0bfee46e)), closes [#12](https://github.com/Kolobok12309/My-auth_back/issues/12)

### [0.4.19](https://github.com/Kolobok12309/My-auth_back/compare/v0.4.18...v0.4.19) (2021-02-07)


### Features

* **auth:** :sparkles: Add get another user token list for admin ([7b0c709](https://github.com/Kolobok12309/My-auth_back/commit/7b0c7098fe69d99d6a5f274669cc7e2d6e769754))
* :sparkles: Add to user and tasks getAll params ([efe88ff](https://github.com/Kolobok12309/My-auth_back/commit/efe88ff9f8d4f69c49618171e497c405731a594b))


### Bug Fixes

* :ambulance: Fix migrations:prod ([da74585](https://github.com/Kolobok12309/My-auth_back/commit/da74585ac19162a75b64603aecbcdb85506657b0))

### [0.4.18](https://github.com/Kolobok12309/My-auth_back/compare/v0.4.17...v0.4.18) (2021-02-06)


### Features

* **groups:** :sparkles: Add search/autocomplete endpoint ([cc5a85b](https://github.com/Kolobok12309/My-auth_back/commit/cc5a85bfc164423901011a6991d7733de9bed2f8))
* **user:** :sparkles: Add search/autocomplete endpoint ([6f0ec6d](https://github.com/Kolobok12309/My-auth_back/commit/6f0ec6df6b3f964a2ef5af23268c6c3c94879b7d))
* :art: Add default sorting for all entities ([3ff29f8](https://github.com/Kolobok12309/My-auth_back/commit/3ff29f89f5f7bbfa2a59c60631f2e4b3029c8e4e))

### [0.4.17](https://github.com/Kolobok12309/My-auth_back/compare/v0.4.16...v0.4.17) (2021-01-27)


### Features

* :sparkles: Advanced filter for tasks ([63dbb8a](https://github.com/Kolobok12309/My-auth_back/commit/63dbb8a4015e017a0610fce882a5e3dc1af80d26))


### Bug Fixes

* :bug: Fix signOut and add token extractor from bearer ([7b4459b](https://github.com/Kolobok12309/My-auth_back/commit/7b4459b999dd859235927010338962c7b58525df))

### [0.4.16](https://github.com/Kolobok12309/My-auth_back/compare/v0.4.15...v0.4.16) (2021-01-17)


### Features

* :ambulance: Add wildcarded cors origin ([41c469f](https://github.com/Kolobok12309/My-auth_back/commit/41c469fcfe52204b08373a0dddcef081b9d2fa13))

### [0.4.15](https://github.com/Kolobok12309/My-auth_back/compare/v0.4.14...v0.4.15) (2021-01-16)


### Features

* **mail:** :sparkles: Add env MAIL for disabling mailing ([f9650a0](https://github.com/Kolobok12309/My-auth_back/commit/f9650a0fe37d2508b7b9cbc4a1cd14917a6944f5))

### [0.4.14](https://github.com/Kolobok12309/My-auth_back/compare/v0.4.13...v0.4.14) (2021-01-16)


### Bug Fixes

* :ambulance: Fix last migration(full dump to only changes) ([bd444c2](https://github.com/Kolobok12309/My-auth_back/commit/bd444c26191c57ec9db4b44197d88d052c5a6090))

### [0.4.13](https://github.com/Kolobok12309/My-auth_back/compare/v0.4.12...v0.4.13) (2021-01-16)


### Bug Fixes

* **user:** :ambulance: Add migration for user otp nullable ([ee07180](https://github.com/Kolobok12309/My-auth_back/commit/ee071808aeabff4f1c728c4638208d0b15e8ddac))

### [0.4.12](https://github.com/Kolobok12309/My-auth_back/compare/v0.4.11...v0.4.12) (2021-01-16)

### [0.4.11](https://github.com/Kolobok12309/My-auth_back/compare/v0.4.10...v0.4.11) (2021-01-13)


### Features

* **task:** :sparkles: Email notifications for create/update task ([6bade7d](https://github.com/Kolobok12309/My-auth_back/commit/6bade7d57b63b0ce3df4479d37aa2ea69210eebb))

### [0.4.10](https://github.com/Kolobok12309/My-auth_back/compare/v0.4.9...v0.4.10) (2021-01-12)


### Bug Fixes

* **groups:** :bug: Fix output of update endpoint ([089243d](https://github.com/Kolobok12309/My-auth_back/commit/089243d3766934070a4eb4a805c70c0425771d9f))

### [0.4.9](https://github.com/Kolobok12309/My-auth_back/compare/v0.4.8...v0.4.9) (2021-01-12)

### [0.4.8](https://github.com/Kolobok12309/My-auth_back/compare/v0.4.7...v0.4.8) (2021-01-12)


### Features

* :sparkles: Add edit task endpoint ([28432f6](https://github.com/Kolobok12309/My-auth_back/commit/28432f6168a18372d965e40ae06d1ebe45bd6933))
* **task:** :sparkles: Add delete method ([de97a37](https://github.com/Kolobok12309/My-auth_back/commit/de97a37d18d0b04372882ec8bffd1d91c8ffeb01))
* **task:** :sparkles: Add task entity and endpoint for create and getAll ([487dfff](https://github.com/Kolobok12309/My-auth_back/commit/487dfff4ce3fb587398c0627ba76d55cdf375291))

### [0.4.7](https://github.com/Kolobok12309/My-auth_back/compare/v0.4.6...v0.4.7) (2021-01-08)


### Features

* **mail:** :sparkles: Add mailing and first template ([8feeeb0](https://github.com/Kolobok12309/My-auth_back/commit/8feeeb09b47ac875bac1bab79d6e9deecf316b46))
* Add filter for duplication error ([d93be93](https://github.com/Kolobok12309/My-auth_back/commit/d93be9333ecd2674cb6933faa15d3aa5cd4f8639))

### [0.4.6](https://github.com/Kolobok12309/My-auth_back/compare/v0.4.5...v0.4.6) (2021-01-08)

### [0.4.5](https://github.com/Kolobok12309/My-auth_back/compare/v0.4.4...v0.4.5) (2021-01-08)


### Features

* **groups:** :sparkles: Add groups entity and getMany/getOne/create endpoints ([20bbd52](https://github.com/Kolobok12309/My-auth_back/commit/20bbd527b975b008766f7f3bcae0e33bca120d06))
* **groups:** :sparkles: Add update and delete functions ([2146e3e](https://github.com/Kolobok12309/My-auth_back/commit/2146e3e375322c49e5233dd75889a407c547f674))

### [0.4.4](https://github.com/Kolobok12309/My-auth_back/compare/v0.4.3...v0.4.4) (2021-01-08)


### Features

* **files:** :sparkles: Add endpoints for upload and delete files ([6d628e2](https://github.com/Kolobok12309/My-auth_back/commit/6d628e22787eb3ec565aabca6dc05fb1f6cb98c1))
* **files:** :sparkles: WIP Add files ([a23a34a](https://github.com/Kolobok12309/My-auth_back/commit/a23a34a5410023991d82ded5564c88a3ce26429a))

### [0.4.3](https://github.com/Kolobok12309/My-auth_back/compare/v0.4.2...v0.4.3) (2021-01-04)


### Bug Fixes

* **user:** :bug: Fix typing of paginated dto factory ([54da1e2](https://github.com/Kolobok12309/My-auth_back/commit/54da1e2c3bbd3cd97e3db08755f5df7a07c0cd23))

### [0.4.2](https://github.com/Kolobok12309/My-auth_back/compare/v0.4.1...v0.4.2) (2021-01-04)


### Features

* **user:** :sparkles: Add editing and deleting of users ([abe0c26](https://github.com/Kolobok12309/My-auth_back/commit/abe0c263ee0b3d19b966c9a458d7b086f17b3d31))

### [0.4.1](https://github.com/Kolobok12309/My-auth_back/compare/v0.4.0...v0.4.1) (2020-12-28)


### Features

* **auth:** Add email to users ([bfd5145](https://github.com/Kolobok12309/My-auth_back/commit/bfd514520d13734cea4ae1e1a1c83ad30a380c8a))
* **auth:** Add otp tokens ([6fc7f03](https://github.com/Kolobok12309/My-auth_back/commit/6fc7f0344429f6eb666120de454ea923ca2c3da9))
* **auth:** Revoke tokens ([b420340](https://github.com/Kolobok12309/My-auth_back/commit/b420340e6a3d49af8f061d73ab2b1a17b8e060d1))

## [0.4.0](https://github.com/Kolobok12309/My-auth_back/compare/v0.3.1...v0.4.0) (2020-12-28)


### Features

* **auth:** Fix roles and add getTokens endpoint ([a201041](https://github.com/Kolobok12309/My-auth_back/commit/a2010411a2e7b54be2fbb78240ebeaa21be04c8d))

### [0.3.1](https://github.com/Kolobok12309/My-auth_back/compare/v0.3.0...v0.3.1) (2020-12-22)

## [0.3.0](https://github.com/Kolobok12309/My-auth_back/compare/v0.2.0...v0.3.0) (2020-12-22)

## [0.2.0](https://github.com/Kolobok12309/My-auth_back/compare/v0.1.3...v0.2.0) (2020-12-21)

### [0.1.3](https://github.com/Kolobok12309/My-auth_back/compare/v0.1.2...v0.1.3) (2020-12-21)


### Bug Fixes

* Change docker workflow ([2ab6b9e](https://github.com/Kolobok12309/My-auth_back/commit/2ab6b9e2620109c755a665af9d2981ef08587eef))

### [0.1.2](https://github.com/Kolobok12309/My-auth_back/compare/v0.1.1...v0.1.2) (2020-12-21)


### Bug Fixes

* **workflow:** Remove useless check ([7da1aeb](https://github.com/Kolobok12309/My-auth_back/commit/7da1aebf696546df86b3d0da6884c5be6176d9f0))

### [0.1.1](https://github.com/Kolobok12309/My-auth_back/compare/v0.0.1...v0.1.1) (2020-12-21)

### 0.0.1 (2020-12-21)
