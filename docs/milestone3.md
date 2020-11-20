# Backend Implementation

## Database Implementation
<pre>

users  
+---------------+----------+--------------------------------+  
|    Column     | Datatype |          Description           |  
+---------------+----------+--------------------------------+  
| username      | String   | the user username              |  
| salt          | String   | the user password salt         |
| hash          | String   | the user password hash
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
| username    | String   | user's username                                       |
| date        | String   | the date of transaction                               |
| amount      | integer  | the dollar amount of transaction                      |
| category    | String   | what category of spending the transaction falls under |
| description | String   | description of what the transaction was               |
+-------------+----------+-------------------------------------------------------+



</pre>
  
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
- With Eric make user login secure by saving password salt and hashes instead of plaintext

### Eric Trimble

- With Ariel make user login secure by saving password salt and hashes instead of plaintext
- Silo user data so that users cannot interact with others' data including making the
- Fix some bugs with history API endpoints associated with the above change