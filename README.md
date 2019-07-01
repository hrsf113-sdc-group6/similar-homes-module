# Similar Homes Module

The similar homes module from Abode.ly was scaled and deployed through AWS EC2 instances to meet web-scale demand. An RDBMS(PostgreSQL) and a NoSQL DBMS(Apache Cassandra) was compared for optimal query speeds and their abilities to bulk load data in a timely manner. PostgreSQL was decided because a complex query was required and time constraint. Cassandra is known to be quick for reads but setting up clusters that allow for a complex query for more than two columns would take a significant amount of time. 

## Initial Comparisions

### PostgreSQL

![Unoptimized queries](gif/Postgres-10.png)
![](gif/Postgres-3/png)
![Optimized query](gif/Postgres-opt.png)

### Cassandra

![Only allowed a two column with a single cluster sort](gif/Cassandra.png)

### K6 Local testing & New Relic AWS testing

![](gif/K6-local.png)
![](gif/NewRelic.png)

## CRUD API

_________________________________________________________________
| Endpoint                 | Type   | Operation                 |
|--------------------------|--------|---------------------------|
| `/similarhomes/:homeid`  | GET    | Get related listing       |
| `/similarhomes/addhome`  | POST   | Add a related listing     |
| `/similarhomes/:homeid`  | PATCH  | Update a related listing  |
| `/similarhomes/:homeid`  | DELETE | Delete a related listing  |
_________________________________________________________________