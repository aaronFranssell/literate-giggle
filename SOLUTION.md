## Quick Start
This solution requires [Docker](https://www.docker.com/) to run.

Start by building and running the Docker container. You can do this by running the `./run.sh` script. NOTE: the first run will take a while. By default the solution is brought up on [http://localhost:3000](http://localhost:3000). You may optionally specify a port by adding the port number after the `run.sh` script. For instance running `./run.sh 3001` will run the solution at [http://localhost:3001](http://localhost:3001).

Once the app is up, click the "Count!" button to hit the counting API.

Once the container has been successfully created, you can run tests by `bash`ing into the container by running `run_bash.sh`. Once you are in the container, run `yarn test`.

## Design Considerations
This solution is written in [React](https://reactjs.org/).

Currently each new browser window creates a new counter for that window. Each time the React app is initialized, a new namespace key will be generated (see [here](https://github.com/aaronFranssell/literate-giggle/blob/master/src/index.js#L9) for how this is implemented).

## Next Steps and Future Enhancements
There are a number of different steps that could be taken to enhance this solution depending on the route the requirements take.

### Local Development
In order to make this solution easier to work with longer term, there are several tools for local development that could be implemented. One would be to integrate linting/static code analysis into the scripts, for instance [ESLint](https://eslint.org/) in order to enforce best practices and common coding standards across the project. Depending on the requirements, automatic detection of accessibility issues could be added in as well. Something like [this tool](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y) could be used for static accessibility checks. If this solution becomes part of a broader set of front ends and microservices, taking the time to integrate [docker-compose](https://github.com/docker/compose) into local development will make implementation of future microservices easier.

An end to end testing framework like [Cypress](https://docs.cypress.io/guides/overview/why-cypress#In-a-nutshell) should be integrated to facilitate testing end to end workflows.

Code coverage checks should also be added into tests so that if code coverage falls below a certain point (80% for instance) then the build will fail.

As this solution is just a POC, the docker images used could potentially be slimmed down when packaging dependencies. Currently the size of the image is rather large.

### Deployment and Continuous Delivery
Additional work (and thought) should be put in to determine how this solution will be deployed and used by the end user. As noted above, each user is assigned a unique counter for the duration of their session. Depending on future requirements, users may need to share a counter across ALL sessions. There may also need to be a different API key for each environment. Depending on how these requirements shake out, then the code should be refactored to make this API key injection easier.

A CI/CD server (e.g. Gitlab, Travis, or Jenkins) should be created to start automatically deploying the solution out to the different environments. The unit tests, Cypress tests, and linting should also be run on each commit to ensure that only fully functional code is deployed to end users.

The architecture where this solution is deployed also needs to be considered, and may necessitate additional refactors. The application could be deployed on Amazon S3 + Cloudfront, pushed to an Nginx static content server, or even deployed on Heroku. Once the production architecture is decided on, then the code could be tweaked to facilitate deployments.