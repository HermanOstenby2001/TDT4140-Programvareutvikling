# Create T3 App

This is a [T3 Stack](https://create.t3.gg/) project bootstrapped with `create-t3-app`.

## Init database
1. Always start with an npm clean install to make sure relevant dependancies are installed and updated. Do not use npm install      
        
        npm ci
1. Install Docker
2. Replace the postgres password with anything other than password in .env file, as it's a secret enviroment variable that isn't tracked in git.
3. run the start-database.sh script   
    * !NB: If you're using windows, do this through WSL as detailed in start-database.sh. 
4. run the following command    
        
        npx prisma db migrate dev 

5. Make sure the database is running with first starting the database in Docker
6. Run the following commands:

        npx prisma db seed
        npx prisma studio

## Init frontend
1. Run the following command:

        npm run dev

The webpage should now be fully working.


## General tips
* To reset the contents in the database, run

        npx prisma migrate reset
        npx prisma db seed

* For changes to the database structure, run

        npx prisma generate
        npx prisma db push

* When launching the app, you will be asked to log in. One account that can be used is:

**Username:** Admin

**Password:** password