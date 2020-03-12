# Setting up MongoDB

You can host it yourself, or use a database as a service. Popular DBAS are 'mLab' and 'MongoDB Atlas'.

## Setting up mLab:
* Create a new 'MongoDB Deployment'
* Choose AWS or Google Cloud as your Cloud Provider.
* Choose the free **Single-node** plan.
* Name your database

### Next Step: Figure out your Connection String

mLab provides you with a standard MongoDB URI. You want to adjust your Node environment variables.

Within the variables.env file:
DATABASE=mongodb://<dbuser>:<dbpassword>@asdsadsda.mlab.com:23434/database-name

You need to replace '<dbuser>' and '<dbpassword>' with your information. To get this info, you must first add a new database user and use that info in your connection string.

### Setting up a MongoDB GUI

A GUI logs into the database and visualizes all the data and allows you to update and create new data. *Similar to phpmyadmis or mysqldatabase*.

**The MongoDB GUI of choice for this course is Compass**

While you have Compass open, copy the connection string. Compass will automatically pick it up and populate the hostname, port, username, pass, etc. If everything works, it will allow you to connect to the database.