#How to start the app

 You need php , composer , docker installed 


`
vendor/bin/sail up --build 
`
--build runs npm install and get all the required packages

this should (hopefully😅) start the laravel sail env with a React frontend that I added to the docker-compose file




On a different terminal run the following 

`
vendor/bin/sail artisan migrate
`


`
vendor/bin/sail artisan passport:install --force
`


[Access the Ui] (http://localhost:3000)

