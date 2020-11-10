# Heroku App Link

[Check out our app here!](https://guarded-cliffs-22166.herokuapp.com/)

# APIs

## Login API

### Register User
```
/registerUser
```

This command adds the given user's identifying information to the database:
 - Username
 - Password
 - Real Name
 - Address
 - Bank Username
 - Bank Password
 - Account Number
 - Routing Number

If an entry with the given username already exists, the command does not add the information and returns an error object. Clicking the "Register" button in the below image calls the `/registerUser` API:

![Register user image](../images/registerUser.png)

**Example**:
```javascript
fetch('/registerUser', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({
        realname: 'Emery Berger',
        username: 'eberger',
        password: 'i_heart_326',
        bankUsername: 'eberger',
        bankPassword: 'givem3money',
        accountNumber: '0123456',
        routingNumberEl: '01234567890',
        address: '404 Naught Fd.',
        city: 'UMassville',
        state: 'MA',
        zip: '01234'
    })
});
```

### Login User
```
/loginUser
```

This command takes a username-password pair and returns the user's identifying information. If the username-password pair is not found in the database, the command returns an error object. Clicking the "Login" button in the below image calls the `/loginUser` API:

![Login user image](../images/loginUser.png)

```javascript
fetch('/loginUser', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({
        username: 'eberger',
        password: 'i_heart_326'
    })
});
```

## API for Transaction History Entries

### Add Entry to transaction history
```
/addEntry
```

This command adds an entry to the transaction history page when information is entered into the appropriate fields on the page and then the add button is clicked.

![New history image](../images/historynew.png)

**Example**:
```javascript
await fetch("/addEntry", {
 method: 'POST',
 headers: {
  "Content-Type": "application/json"
  },
  body: JSON.stringify({date:"10/25/20", amount: "22", category: "recreation", description: "Boda Borg"})
 });
```

### Display and Filter Transaction history
```
/historyEntries
```

This command takes filters for dates, amounts, categories, and descriptions and returns the subset of the transaction history that matches the given filters (or the entire history if no filters were requested).

![New history image](../images/historynew.png)

**Example**:
```javascript
fetch('/historyEntries', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({date: '2020-05-10', category: 'Recreation'})
});
```

# Breakdown of Division of Labor:
Ariel:
 - Have `server/index.js` run HTTP server
 - Create login and registration API and integrate with frontend
 - Add data validation for frontend login and registration
 - Rewrite backend for transaction history filtering API and integrate with frontend
 - Create `setup.md`
 - Take screenshots and write entries for login and registration API in `milestone2.md`
 - Write entry for filtering API in `milestone2.md`
 - Deploy app to Heroku

Alfred:
 - Create API to display transaction history and add additional entries
 - Integrate API with frontend
 - Take screenshots and write entries for transaction history API in `milestone2.md`

Eric:
 - Write history filtering code in server/index.js
