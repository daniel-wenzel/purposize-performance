# purposize-performance
Simple performance testing tool for purposize using artillery.

## Getting Started
1. Create a sut-server and a client server.
On SUT Server
2. Open port 3005 for sut server
3. Install mysql
4. create a mysql database `benchmarkdb`
5. export database credentials
```
export DB_USER=...
export DB_PASSWORD=...
```
6. Install node.js
7. Clone project
8. Install sut dependencies
```
cd sut && npm i && cd ..
```
9. Start benchmark server
```
./run.sh
```
10. ssh on client server
11. replace sutURL in benchmark/benchmark.sh and all benchmarkXXX.yml files
12. Install node.js
13. Install artillery
```
npm i -g artillery
14. Run benchmark: 
```
./benchmark/benchmark.sh
```
15. Find your results on the client under `benchmark/results/`
