# What this project does

This is an open source API and with this project you can view every number about their specific facts like:

- Math
- Trivia
- Date

# Why is it useful

With this API you can view the facts about every number with specific categories. 
# Getting started

This project was made using Node.js and Docker

Here the few steps before getting started:

- Fork or download
- Open terminal and navigate to the api folder using `cd api`
- Install every dependencies `npm install`
- Build container `docker-compose build`
- To get all the tables up and running `docker-compose up`

You can also use `npm run test`

But you first have to enable the integration folder so the tests can run.

- First, go to `package.json`, then delete  `/src/__tests__/integration` inside of "testPathIgnorePatterns".

If the steps above are followed and done, the tables `numbers` & `numbersCategory` will be created and be ready to execute queries. For viewing every records that the tables have, you can use <https://www.tableplus.com/>

# Where can I find help

I made use of the following resources that will surely be helpful.

- <https://docs.docker.com/>
- <https://www.postman.com/> - You can use Postman to test the endpoints like GET, POST, UPDATE, DELETE.
- <https://tableplus.com/>
- <http://knexjs.org/>
- <https://expressjs.com/>
- <https://jestjs.io/en/>

To make this project, I have used github flow. The reason I chose this workflow it's because:

- Here the main branch is always production ready and the deployment speed is extremely fast
- You can separate branches for a better overview. Example: development often only happens on the feature branches.
- it requires a verification for each release which is safer
# Project status

Project will be done before deadline.
# Authors

This project was made by Emre Kursun.

If you wish to contact the creator, send an email to: emre.kursun@student.ehb.be