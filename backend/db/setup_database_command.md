### create Spots table

npx sequelize model:generate --name Spot --attributes ownerId:integer,address:string,city:string,state:string,country:string,lat:decimal,lng:decimal,name:string,description:string,price:decimal

### create SpotImages table

npx sequelize model:generate --name SpotImage --attributes spotId:integer,url:string,preview:boolean

### create Bookings table

npx sequelize model:generate --name Booking --attributes userId:integer,spotId:integer,startDate:dateonly,endDate:dateonly

### create Reviews table

npx sequelize model:generate --name Review --attributes userId:integer,spotId:integer,review:string,stars:decimal

### create ReviewImages table

npx sequelize model:generate --name ReviewImage --attributes reviewId:integer,url:string

### create Spots seeder

npx sequelize seed:generate --name demo-spot

### create SpotImages seeder

npx sequelize seed:generate --name demo-spot-image

### create Bookings seeder

npx sequelize seed:generate --name demo-booking

### create Reviews seeder

npx sequelize seed:generate --name demo-review

### create ReviewImages seeder

npx sequelize seed:generate --name demo-review-image
