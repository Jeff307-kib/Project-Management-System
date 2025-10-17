## ⚙️ Prerequisites

Before running the project, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (required to run the React frontend)
- [XAMPP](https://www.apachefriends.org/), [WAMP](https://www.wampserver.com/), or MySQL Workbench
- A modern web browser (Chrome, Edge, or Firefox)

---

## 🗂️ Setting Up the Database

1. Locate the `.sql` file in the project’s **root directory**.
2. Import the `.sql` file into your database using **phpMyAdmin**, **MySQL Workbench**, or any MySQL interface.
3. If your local MySQL server requires credentials, update the following variables in the "db.php" file, which is located at backend/config/db.php:  
   Modify these as needed:

```php
$username = "your_username";
$password = "your_password";
```

## 🧩 Running the Application

1. Open your terminal. (In Vs Code)
   By default, it should point to the project root directory.

2. Navigate to the frontend folder:

```bash
cd frontend
```

3. Install dependencies (only needed on the first run):

```bash
npm install
```

If the installation failed try using VPN to install the dependencies.

4. Start the development server:

```bash
npm run dev
```

5. Make sure XAMPP/WAMP and the Apache and MySQL services are running before launching the app. Without running the database server, the backend won't work and api wouldn't fetch data.

6. After running the command, you’ll see a clickable local URL in the terminal — something like:

```arduino
http://localhost:5173
```

## Additional Information

Email: wunnatunsai940@gmail.com 
Password: Wunna@123456

Note: You can use this information to log in and test use the website. 
