# Steps to Adding a Database
1) Right click on your project
2) Hover over Add -> New Item
3) Search for: "Service-based Database"
4) Give an appropriate name & click add

.mdf - single SQL server database
log.ldf - log file

Double click on the database icon to open the server explorer
- To find the server explorer, just click 'View' at the top to find it.

## Adding a Table
Right click on Tables -> Add new table
- This opens a design view at the top, and a code section at the bottom

## Executing SQL Scripts
Download SQL file
Drag into visual studio
Run/Execute

**Alternatively**
Add a new table
Paste SQL code it into the code section
Click update

**Remember to hit 'Refresh' in the Serve Explorer**

## Inserting Data into the Table
* Copy the scripts/insert statement
* Right click database
* Select 'New Query'
* Paste Insert queries
* Execute with the green play button
* Open table & Refresh it.

## Reusing the Database File
* Navigate to the old project folder
* Make sure the old project is closed
* Copy the .mdf file
* Paste the file into the new project structure
* Double click on the database to form the connection

Create a class to represent the contents of the table
* Need a property to represent each column in a record

