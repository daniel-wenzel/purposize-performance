# purposize-performance
Simple performance benchmark for purposize using artillery.

## Getting Started
1. Create a SUT-server and a client server.

On SUT Server

2. Open port 3005 for SUT server
3. Install mysql
4. create a mysql database `benchmarkdb`
5. export database credentials
```
export DB_USER=...
export DB_PASSWORD=...
```
6. Install node.js
7. Clone project
8. Install SUT dependencies
```
cd sut && npm i
```
9. Start benchmark server
```
./run.sh
```

On Client

10. SSH on client server
11. replace SUTURL in benchmark/benchmark.sh and all benchmarkXXX.yml files
12. Install node.js
13. Install artillery
```
npm i -g artillery
```

14. Run benchmark: 
```
./benchmark/benchmark.sh
```
15. Find your results on the client under `benchmark/results/`
