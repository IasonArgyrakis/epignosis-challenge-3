How to start the app 



`
vendor/bin/sail up
`

this should (hopefully😅) start the laravel env with a React frontend that I added to the docker-compose file




On a different terminal run the following 

`
vendor/bin/sail artisan migrate
`


`
vendor/bin/sail artisan passport:install --force
`


[Access the Ui] (http://localhost:3000)

