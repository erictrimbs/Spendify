import {createServer} from 'http';
import {parse} from 'url';
import {join} from 'path';
import {writeFile, readFileSync, existsSync} from 'fs';

let database;
if (existsSync("database.json")) {
    database = JSON.parse(readFileSync("database.json"));
} else {
    database = {
        users: [],
        history: []

        /* other fields to be determined */
    };
}

createServer(async (req, res) => {
    const parsed = parse(req.url, true);

    /**
     * POST Request: registerUser
     *
     * Registers a user for Spendify. Fails if a user with the given username is
     * already in the database, ensuring that every registered username is unique.
     *
     * @param username The user's username
     * @param password The user's password
     * @param realname The user's real name
     * @param address  The user's address
     * @param accountNumber The user's account number
     * @param routingNumber The user's routing number
     * @param bankUsername  The user's bank username
     * @param bankPassword  The user's bank password
     */
    if (parsed.pathname === '/registerUser') {
        let body = '';
        req.on('data', data => body += data);
        req.on('end', () => {
            const userToRegister = JSON.parse(body);
            let usernameInDatabase = false;
            for (const user of database.users) {
                if (user.username === userToRegister.username) {
                    usernameInDatabase = true;
                    const message = `Username ${user.username} already in database.`;
                    console.error(message);
                    res.end(JSON.stringify({
                        error: true,
                        message: message
                    }));
                    break;
                }
            }
            if (!usernameInDatabase) {
                // Add user to database
                console.log(`Adding user ${userToRegister.username} to database...`);
                database.users.push({
                    username: userToRegister.username,
                    password: userToRegister.password,
                    realname: userToRegister.realname,
                    address:  userToRegister.address,
                    accountNumber: userToRegister.accountNumber,
                    routingNumber: userToRegister.routingNumber,
                    bankUsername:  userToRegister.bankUsername,
                    bankPassword:  userToRegister.bankPassword
                });
                
                writeFile("database.json", JSON.stringify(database), (err) => {
                    if (err) {
                        console.error(err);
                    } else {
                        console.log('Database saved!');
                        res.end(JSON.stringify({
                            error: false,
                            message: `User ${userToRegister.username} is registered!`
                        }));
                    }
                });
            }
        });
    /**
     * POST Request: loginUser
     *
     * Logs a user into Spendify by returning the information necessary to access
     * their bank records. This is obviously completely insecure but suffices for
     * the purpose of illustration. Fails if the given username-password pair is
     * not found in the database.
     *
     * @param username The user's username
     * @param password The user's password
     */
    } else if (parsed.pathname === '/loginUser') {
        let body = '';
        req.on('data', data => body += data);
        req.on('end', () => {
            const userToLogin = JSON.parse(body);
            let userInDatabase = false;
            for (const user of database.users) {
                if (user.username === userToLogin.username &&
                    user.password === userToLogin.password) {
                    userInDatabase = true;
                    res.end(JSON.stringify({
                        error: false,
                        realname: userToLogin.realname,
                        address:  userToLogin.address,
                        accountNumber: userToLogin.accountNumber,
                        routingNumber: userToLogin.routingNumber,
                        bankUsername:  userToLogin.bankUsername,
                        bankPassword:  userToLogin.bankPassword
                    }));
                }
            }
            if (!userInDatabase) {
                const message = `User ${userToLogin.username} not in database.`;
                console.error(message);
                res.end(JSON.stringify({
                    error: true,
                    message: message
                }));
            }
        });
    } 
    else if (parsed.pathname === '/addEntry') {
        let body = '';
        req.on('data', data => body += data);
        req.on('end', () => {
            const data = JSON.parse(body);
            database.history.push({
                date: data.date,
                amount: data.amount,
                category: data.category,
                description: data.description
            });
            
            writeFile("database.json", JSON.stringify(database), err => {
                if (err) {
                    console.err(err);
                } else res.end();
            });
        });
    } 
    else if (parsed.pathname === '/historyEntries') {
        res.end(JSON.stringify(
            database.history
        ));
    } else if (parsed.pathname === '/someGetRequest') {
        res.end(JSON.stringify(database.doSomething()));
    } else {
        // If the client did not request an API endpoint, we assume we need to fetch a file.
        // This is terrible security-wise, since we don't check the file requested is in the same directory.
        // This will do for our purposes.
        const filename = parsed.pathname === '/' ? "index.html" : parsed.pathname.replace('/', '');
        const path = join("client/", filename);
        console.log(`Trying to serve ${path}...`);
        if (existsSync(path)) {
            if (filename.endsWith("html")) {
                res.writeHead(200, {"Content-Type" : "text/html"});
            } else if (filename.endsWith("css")) {
                res.writeHead(200, {"Content-Type" : "text/css"});
            } else if (filename.endsWith("js")) {
                res.writeHead(200, {"Content-Type" : "text/javascript"});
            } else {
                res.writeHead(200);
            }

            res.write(readFileSync(path));
            res.end();
        } else {
            res.writeHead(404);
            res.end();
        }
    }
}).listen(process.env.PORT || 8080);