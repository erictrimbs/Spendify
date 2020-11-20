# Backend Implementation

## Database Implementation

users
+---------------+----------+--------------------------------+
|    Column     | Datatype |          Description           |
+---------------+----------+--------------------------------+
| username      | String   | the user username              |
| password      | String   | the user password              |
| realname      | String   | the user's real name           |
| address       | String   | the user's address             |
| accountNumber | integer  | the user's bank account number |
| routingNumber | integer  | the user's bank routing number |
| bankUsername  | String   | the user's bank username       |
| bankPassword  | String   | the user's bank password       |
+---------------+----------+--------------------------------+

history
+-------------+----------+-------------------------------------------------------+
|   Column    | Datatype |                      Description                      |
+-------------+----------+-------------------------------------------------------+
| date        | String   | the date of transaction                               |
| amount      | integer  | the dollar amount of transaction                      |
| category    | String   | what category of spending the transaction falls under |
| description | String   | description of what the transaction was               |
+-------------+----------+-------------------------------------------------------+

## Breakdown of Division of Labor

### Alfred Joseph

- Migrate backend from reading/writing to local file `database.json` to a PostgreSQL database
- Enable Heroku releases to read/write to their own PostgreSQL databases linked to by environment variables
- Add `pg-promise` dependency to `package.json`
- Write database implementation in `milestone3.md`

### Ariel Simnegar

- Use the HTML Canvas API for visualizations of each user's transaction history
- Create a donut chart and legend showing each user their spending by category
- Create a bar chart showing each user's monthly spending for the past year
- Enable Spendify suggestions to automatically update in response to transaction history changes
- Use a `secrets.json` file to hide database username and password from GitHub
- Write breakdown of division of labor in `milestone3.md`

### Eric Trimble

- Make user login secure by saving password salt and hashes instead of plaintext
- Give each user their own transaction history instead of having all users see a shared transaction history
