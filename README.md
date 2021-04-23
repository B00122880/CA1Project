# CA1Project

Database Name = test.sql   (included and is a mysql database)

Project Name = CA1Project

To load the project

1. Import the database into mysql. The database is called test.  
    All images are jpg.  
    Accounts were created with radio button to restrict the types of accounts being created. 
    If after you import the database you have a problem logging in, just recreate the account using registration page.
    Nodejs sometimes seems to have an issue with imported accounts and accounts created with using radio buttons.

2. Save the CA1Project folder to your drive.  

3. Go into the CA1Project folder and right click and choose Terminal to get to command prompt

      C:\CA1Project

4. In the command line type the following command to launch the application 

      C:\CA1Project
      SET DEBUG=CA1Project:* & npm start
     
5. Open web browser and navigate to localhost to view the application 
      http://localhost:3000/
    
6.  If you want to see the tests for the site go to the following in your browser as the page is not linked to the navigation
       http://localhost:3000/test \p
       
Future Developments
This is a basic site. A lot more checks need to be added in terms of security, account validation, visual design and caching.
Problems with tables. Driver and Manager information only added when button clicked. This causing problems with table display.
Hide and show columns JQuery functionality has problems when table loaded via a button.  
Tables work fine with information automatically downloaded from the database.
Logout functionality needs to be added.  If user does not logout or complete order, problems with caching.


