# Mission Explorer
This is a simple app that I built to help our math department plan out curriculum using Khan Academy's mission system. It quickly breaks down a mission into its topics and skills, showing the description, related videos, prerequisites, and related Common Core Standards for each skill in a mission.
![image](https://cloud.githubusercontent.com/assets/2569898/23620763/537458d6-0255-11e7-8330-473b96d372b9.png)
### Install
```sh
git clone https://github.com/jb-1980/mission_explorer.git
cd mission_explorer
yarn install
```
### Config
Mission explorer expects certain environment variables. You
can set these with a `.env` file. Just place a `.env` at the
root of the project directory:
```
JWT_SECRET="Any super secret string"
KHAN_CONSUMER_SECRET=secret_from_Khan_Academy_When_registering_you_app
KHAN_CONSUMER_KEY=KEY_FROM_KHAN_ACADEMY_WHEN_REGISTERING_YOUR_APP
```


### Run the app from a dev server
Development uses weback-dev-server for the front end to enable
hot reloading. So you need to run both the server and webpack-dev-server. Just run the following commands in two separate terminal windows:
```sh
yarn start-server
```

```sh
yarn start
```

### Build the app
```sh
yarn build
```

### Host the app from a server (app must have been built)
```sh
node server
```