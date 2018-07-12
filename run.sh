export DB_USER=root
export DB_PASSWORD=123456
export USE_CACHE=true

function start {
  mysql --user="$DB_USER" --password="$DB_PASSWORD" --database="benchmarkdb" --execute="DROP DATABASE benchmarkdb; CREATE DATABASE benchmarkdb;"
  cd sut/ && node index.js && cd ..
}

while true; do
  export USE_PURPOSIZE=false
  start
  export USE_PURPOSIZE=true
  export USE_CACHE=true
  start
  export USE_CACHE=false
  start
done
