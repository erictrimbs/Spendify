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

## Filtering History API

(Eric)

## CRUD API for Transaction History Entries

### Add Entry to transaction history
```
/addEntry
```

This command adds an entry to the transaction history page that is entered into the appropriate fields on the page and then the add button is clicked.

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

### Display Transaction history
```
/historyEntries
```

This command displays the current items in the database in a table on the transaction history page. 

![New history image](../images/historynew.png)

**Example**:
```javascript
 let t1 = await fetch('/historyEntries');
 if (!t1.ok) {
  console.log(response.error);
  return;
 }
 let fp1 = await t1.json();
 render_history_table(document.getElementById("historytable"), fp1);
```

