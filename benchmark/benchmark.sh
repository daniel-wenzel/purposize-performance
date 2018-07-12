# edit sut url in benchmark files
# edit sut url in here
mkdir results
export sutURL=http://localhost:3005
function run {
  mkdir results/$1_$2_$3
  artillery run benchmark$1.yml -o results/$1_$2_$3
  curl "$sutURL/kill"
}
declare -a arr=("75" "150" "300" "600")

## now loop through the above array
for i in "${arr[@]}"
do
   run "$i" "nopur" ""
   run "$i" "pur" "cache"
   run "$i" "pur" "nocache"
   # or do whatever with individual element of the array
done
