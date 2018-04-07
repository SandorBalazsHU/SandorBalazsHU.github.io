mySet.add(1);
mySet.add('some text');
mySet.add('foo');

mySet.has(1); // true
mySet.delete('foo');
mySet.size; // 2

for (let item of mySet) console.log(item);

let myMap = new Map([["a", 1], ["b", 2], ["c", 3]]);

// iterate over map with key and value
for (let [k, v] of myMap) {
  console.log(k, v);
}