var fs = require('fs');

const file = fs.readFileSync('input2022-7.txt', 'utf8').trimEnd();
let lines = file.split('\n');

const filesystem = [
  {
    "name": "/",
    "size": 0,
    "above100k": 0,
    "type": "dir",
    "files": [],
    "parent": null
  }
]

let path = [filesystem[0]];

for (let i = 0; i < lines.length; i++) {
  const cd = lines[i].match(/\$ cd ([\w]+)/m);
  if (cd && cd.length > 1) {
    // console.log('1change dir to: ', cd[1])
  }
  const up = lines[i].match(/\$ cd \.\./g);
  const root = lines[i].match(/\$ cd \//g);
  const list = lines[i].match(/\$ ls/g);
  const dir = lines[i].match(/dir ([\w]+)/m);
  // console.log('path', path);
  const pwd = path[path.length - 1];
  // console.log(lines[i])
  if (list) {
    console.log("list", lines[i]);
  } else if (up) {
    console.log("up", lines[i]);
    if (path.length > 1) {
      path.pop();
    }
  } else if (root) {
    console.log("root", lines[i]);
    path = [filesystem[0]];
  } else if (cd?.length > 1) {
    console.log('change dir to: ', cd[1])
    const dir = pwd.files.find(file => file?.name === cd[1]);
    if (dir) {
      path.push(dir);
    }
  } else if (dir?.length > 1) {
    // console.log("dir name", dir[1])
    // console.log(pwd.files.find(file => file?.name === dir[1]));
    // console.log("-", pwd.files);
    if (!pwd.files.find(file => file?.name === dir[1])){
      pwd.files.push({
        "name": dir[1],
        "size": 0,
        "type": "dir",
        "above100k": 0,
        "files": [],
        "parent": pwd.name
      })
    }
    // console.log(pwd.files);
  } else {
    const size = parseInt(lines[i].split(' ')[0], 10);
    const filename = lines[i].split(' ')[1];
    // console.log(size,filename)
    if (!pwd.files.find(file => file?.name === filename)){
      pwd.files.push({
        "name": filename,
        "size": size,
        "type": "file",
        "parent": pwd.name
      })
      pwd.size += size;
      // console.log("increase size of pwd", pwd.name, size);
      if (pwd.size > 100000) {
        pwd.above100k = 1;
      }
      // increase size of all parent directories
      let pathl = path.length - 2;
      let parent = path[pathl];
      while (parent) {
        parent.size += size;
        // console.log("increase size of parent", parent.name, size);
        if (parent.size > 100000) {
          parent.above100k = 1;
        }
        pathl--;
        parent = path[pathl];
      }
    }
  }
}

// walk through the filesystem and find all directories with above100k === 0
function findsize(dir, size) {
  console.log("-", dir.name, dir.size, dir.above100k);
  if (dir.above100k === 0) {
    size += dir.size;
  }
  for (let i = 0; i < dir.files.length; i++) {
    if (dir.files[i].type === "dir") {
      size = findsize(dir.files[i], size);
    }
  }
  return size;
}

const dirs = [];
function walkoverobj(dir) {
  // console.log(dir.name, dir.size, dir.above100k);
  dirs.push(dir);
  for (let i = 0; i < dir.files.length; i++) {
    if (dir.files[i].type === "dir") {
      walkoverobj(dir.files[i]);
    }
  }
}

walkoverobj(filesystem[0]);
// console.log(dirs.sort((a, b) => a.size - b.size));
const totalsize = filesystem[0].size;
const freespace = 70000000 - totalsize;

const list = dirs.sort((a, b) => a.size - b.size);
for (let i = 0; i < list.length; i++) {
  if (freespace + list[i].size > 30000000) {
    console.log(list[i].name, list[i].size, freespace + list[i].size);
    break;
  }
}
// console.log(findsize(filesystem[0], 0));
// console.log(JSON.stringify(filesystem, null, 2));

