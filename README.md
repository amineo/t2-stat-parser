# Parser for DarkTiger's T2 Server Stats
**This is very much still a work in progress.**
The motivation behind this is to get more familiar with Go.
If you notice that there are better ways to do things, I'm all ears. :)
Like all things, everything could be improved.



## Run
    - `docker-compose up` Runs the whole stack in unison
    - `docker-compose up parser` Just run the app, useful if you're makin code changes
    - `docker-compose up db` Just run the db



## Notes
    - When you first run the stack, Postgres will generate the DB and all the necessary tables by running `./build/postgres/docker-entrypoint-initdb.d/backup/t2_stats.sql`. Because the Go app can run before the DB has a chance to finish setting up, the parser will exit prematurely. Once the DB has been properly setup, running the app again will parse and insert the data without issue.
    - A persistent volume for the DB data is set.


## Features
    - Parses generated stat files into json and insert them into a database (postgres)
    - Keeps records in sync to prevent duped entries
    - Creates/Updates player records to game records
    - Supports multiple game types
    - Scheduled FTP stat file retreval from a remote T2 game server



## Features in que
    - Update to v4 SQL driver
    - Documentation 



(Feel free to open an issue if you have any suggestions/feature requests) 