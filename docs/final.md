# *Alfred, Ariel, Eric*

## Spendify

### Overview

A brief overview of your application. This will be based on what you are submitting as your final web application artifact. You should also mention why your application is innovative.

### Team Members
 - Alfred Joseph ([josephalfred7](https://github.com/josephalfred7))
 - Ariel Simnegar ([ariel-simnegar](https://github.com/ariel-simnegar))
 - Eric Trimble ([ETrimbs](https://github.com/ETrimbs))

### User Interface

*A final up-to-date list/table describing your application’s user interface. This should include the name of the UI view and its purpose. You should include a screenshot of each of your UI views.*

### APIs

*A final up-to-date list/table describing your application’s API*


### Database

*A final up-to-date representation of your database including a brief description of each of the entities in your data model and their relationships if any.*

### URL Routes/Mappings

*A final up-to-date table of all the URL routes that your application supports and a short description of what those routes are used for. You should also indicate any authentication and permissions on those routes.*

### Authentication/Authorization

*A final up-to-date description of how users are authenticated and any permissions for specific users (if any) that you used in your application. You should mention how they relate to which UI views are accessible.*

### Division of Labor

#### Alfred Joseph
 - Worked with Ariel to create all wireframes other than income
 - Wrote the starting code for `login.html`, `register.html`, and `help.html`
 - Created API to read and write to transaction history and integrated API with frontend
 - Took screenshots and write entries for transaction history API description in `milestone2.md`
 - Migrated backend from reading/writing to local file `database.json` to a PostgreSQL database
 - Enabled Heroku releases to read/write to their own PostgreSQL databases linked to by environment variables
 - Added `pg-promise` dependency to `package.json`
 - Wrote database implementation in `milestone3.md`
 
#### Ariel Simnegar
 - Worked with Alfred to create all wireframes other than income
 - Wrote the starting code for `dashboard.html` and `history.html`
 - Have `server/index.js` run HTTP server
 - Created login and registration API and integrated with frontend
 - Added data validation for frontend login and registration
 - Rewrote backend for transaction history filtering API and integrated with frontend
 - Created `setup.md`
 - Took screenshots and wrote entries for login and registration API in `milestone2.md`
 - Wrote entry for filtering API and breakdown of division of labor in `milestone2.md`
 - First deployed app to Heroku
 - Used the HTML Canvas API for visualizations of each user's transaction history
 - Created a donut chart and legend showing each user their spending by category
 - Created a bar chart showing each user's monthly spending for the past year
 - Enabled Spendify suggestions to automatically update in response to transaction history changes
 - Used a `secrets.json` file to hide database username and password from GitHub
 - Wrote breakdown of division of labor in `milestone3.md`
 - Secured user login by saving password salt and hashes instead of plaintext with Eric
 - Created and began writing `final.md`

#### Eric Trimble
 - Created the income wireframe and `income.html`
 - Wrote `ideas.md` and contributed to `milestone1.md`
 - Write get API endpoint for history in `server/index.js`
 - Enabled users to filter transactions by amount, date, category, and description
 - Secured user login by saving password salt and hashes instead of plaintext with Ariel
 - Prevented users from viewing each other's transaction histories
 - Debugged transaction history API endpoint errors associated with the above change

### Conclusion

*A conclusion describing your team’s experience in working on this project. This should include what you learned through the design and implementation process, the difficulties you encountered, what your team would have liked to know before starting the project that would have helped you later, and any other technical hurdles that your team encountered.*

[Link to hosted application!](https://guarded-cliffs-22166.herokuapp.com/)
