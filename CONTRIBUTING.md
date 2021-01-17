# Contributing NumbersFactsAPI

When contributing to this repository, please first discuss the change you wish to make via issue,
email, or any other method with the owner of this repository before making a change. 

Please note that I have a code of conduct: [Code of conduct guidelines for this project](https://github.com/emrekursun/numbersFactsAPI/blob/main/CODE-OF-CONDUCT.md), please follow it in all your interactions with the project

# Accepted Contributions
You can contribute to NumbersFactsAPI by:

- Reporting a bug
- Discussing the current state of the code
- Submitting a fix
- Proposing new features
- Becoming a maintainer

If you wish to suggest a new feature, you do say by:

* Open a feature request on github with a "enhancement" label
* Declare why useful
## Report bugs

* Open a ticket on github, with a bug tag
* Set application to VERBOSE in your .env file
* Include your Error logs
* Explain the setup
* include the following

```
OS: 
Docker version: 
Global npms: 
npm version: 
```
examples, of good and bad requests

good: Getting error "" when trying to call endopoint
what data sending

Bad: endpoint does not work

## Guidelines for development

- Fork the repo
- Clone your fork
- Afterwards, create your own branch
- Open terminal and navigate to the api folder using `cd api`
- Install every dependencies `npm install`
- Build container `docker-compose build`
- To get all the tables up and running `docker-compose up`
- You can also use `npm run test`

But you first have to enable the integration folder.

- First, go to `package.json`, then delete  `/src/__tests__/integration` inside of "testPathIgnorePatterns".

If the steps above are followed and done, the tables `numbers` & `numbersCategory` will be created and be ready to execute queries. For viewing every records that the tables have, you can use <https://www.tableplus.com/>

- Commit and push your changes to your branch
- Create a pull request then merge.

## Roadmap and vision

I envision that everyone can know more about numbers and their true meaning about: 

- Math
- Trivia
- Date

## Get in touch

emre.kursun@student.ehb.be


