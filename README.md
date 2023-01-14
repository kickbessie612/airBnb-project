# Unique homes

Unique homes is a stripped down version of Airbnb, a popular website for operating an online marketplace for short-term home stays and experiences. Unique homes was made with React.js and Express.

### Technologies Used

- JavaScript
- Express
- React.js
- REST API
- PostgreSQL
- Render

### Features

- Get / Create / Update / Delete spots
- Get / Create / Update / Delete bookings

### Installation

1. Copy example .env file

```
cp backend/.env.example backend/.env
```

Your .env file should look like this:

```
PORT=8000
DB_FILE=db/dev.db
JWT_SECRET=****
JWT_EXPIRES_IN=604800
SCHEMA=airbnb_project
```

2. Run `openssl rand -base64 10` to generate a random JWT secret and add to your `.env` file.

3. Run `npm install` in both frontend and backend folders.

4. In the backend folder, run the following command to migrate and seed the database.

```
npm run rebuild
```

### Screenshots

##### Registration Page

![registration_page]

##### Spot Detail

![spot_detail]

##### Create a listing

![create_a_listing]

[registration_page]: ./registration_page.jpg
[spot_detail]: ./spot_detail.jpg
[create_a_listing]: ./create_a_listing.jpg
