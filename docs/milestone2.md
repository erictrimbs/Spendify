
# APIs

## Login API

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
If an entry with the given username already exists, the command does not add the information and returns an error object.

**Example**:
```
fetch('/registerUser', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({
        realname: 'Emery Berger',
        username: 'eberger',
        password: 'i_heart_326,
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

```
/loginUser
```

This command takes a username-password pair and returns the user's identifying information. If the username-password pair is not found in the database, the command returns an error object.
```
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

(Alfred)

## Updating History API

(Eric)