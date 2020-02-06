# Parser for DarkTiger's T2 Server Stats
**This is very much still a work in progress.**
The motivation behind this is to get more familiar with Go.
If you notice that there are better ways to do things, I'm all ears. :)


## Run
- `docker-compose up` Runs the whole stack in unison
- `docker-compose up app` Just run the app, useful if you're making changes to the `main.go` file
- `docker-compose up db` Just run the db


## Notes
    - When you first run the stack, Postgres will generate the DB and all the necessary tables by running `./build/postgres/docker-entrypoint-initdb.d/backup/t2_stats.sql`. Because the Go app can run before the DB has a chance to finish setting up, the parser will exit prematurely. Once the DB has been properly setup, running the app again will parse and insert the data without issue.
    - A persistent volume for the DB data is set.


## Features
    - Parses generated stat files into json and insert them into a database (postgres)
    - Keeps records in sync to prevent duped entries
    - Creates/Updates player records to game records



## Features in que
    - Read Additional GameTypes on the fly
    - Use go modules 
    - Update to v4 SQL driver
    - Ability to download stat files from remote server via FTP

(Feel free to open an issue if you have any suggestions/feature requests) 