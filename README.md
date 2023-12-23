# mcq_test
This is web app which uses mongoDB database to store data

This is a webapp that is made with the help of HTML, CSS, JavaScript, Express.js, Node.js, MongoDB and Pug.

It also uses express-session, body-parser and mongoose

If you want to run the web app in your system follow the below given steps

1. Create a branch of the repository
2. Extract the files to your computer
3. create folders named auth, static and views
4. put auth.js in the auth folder
5. insert layout.pug, index.pug, result.pug and home.pug in the views file
6. insert the style.css in the static folder.

7. Before runnning the file open the vs code terminal (make sure you have installed node in your system, you can install node from the official website)
     i. npm -init -y
     ii. npm i mongoose express-session express body-parser pug
8. After executing the above commands a node_modules folder is created which contains all the necessary files required for the backend functioning.
9. A package.json will also be created which will show all the packages that are downloaded with their version under dependencies.

10. To run the file execute the command
    node index.js
11. After the command is executed in the terminal you will be seeing a text that in console logged by the server "Listenting on port: 3000"
12. Now open your browser and in the url enter "localhost:3000" and press enter.

You will now be able to see the home page of the mcq web app.
