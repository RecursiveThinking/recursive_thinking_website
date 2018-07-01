const node_path = require('path')
const node_fs = require('fs')

const fs = (function() {

  // simple promisification of stat
  function stat(path) {
    return new Promise((resolve, reject) => {
      node_fs.stat(path, (error, stats) => {
        if (error) return reject(error)
        return resolve(stats)
      })
    })
  }

  // simple promisification of readFile 
  function readFile(path, options = 'utf8') {
    return new Promise((resolve, reject) => {
      node_fs.readFile(path, options, (error, data) => {
        if (error) return reject(error);
        return resolve(data)
      });
    })
  }

  // simple promisification of readDir 
  function readDir(path, options = 'utf8') {
    return new Promise((resolve, reject) => {
      node_fs.readdir(path, options, (error, files) => {
        if (error) return reject(error);
        return resolve(files)
      });
    })
  }

  // reads either files or folders
  // if you're reading a file, returns the content (as utf8 by default)
  // if you're reading a folder, returns an array of files
  function read(path, options = 'utf8') {
    return stat(path)
      .then((stats) => {
        if (stats.isDirectory())
          return readDir(path, options)
        else
          return readFile(path, options)
      })
  }

  // simple promisification of writeFile 
  function writeFile(path, data, options = 'utf8') {
    return new Promise((resolve, reject) => makeFoldersRecursively(path)
      .then(() => {
        node_fs.writeFile(path, data, options, (error) => {
          if (error) return reject(error);
          return resolve()
        })
      })
    )
  }

  // simple promisification of mkdir 
  function makeDir(path, mode) {
    return new Promise((resolve, reject) => {
      node_fs.mkdir(path, mode, (error) => {
        if (error) return reject(error);
        return resolve()
      })
    })
  }

  // a generic function that lets you write files or folders
  // if you're writing a file, data is the content of the file
  // if you're writing a folder, data is a fileName -> data map
  // e.g. { "filename.txt": "my text document" }
  function write(path, data, options) {
    return new Promise((resolve, reject) => makeFoldersRecursively(path)
      .then(() => {
        return stat(path)
          .then(stats => {
            if (stats.isDirectory()) {
              if (data && typeof data === 'object')
                return Promise.all(
                  Object.keys(data).map(fileName => 
                    writeFile(path + '/' + fileName, data[fileName], options)
                  )
                )
              else
                return Promise.resolve()
            }
            else
              return writeFile(path, data, options)
          })
          .catch(error => {
            if (error.code === 'ENOENT')
              return writeFile(path, data, options)
            else throw error
          })
      })

    )
  }

  // get an array of all folder paths leading to the input file
  function getFoldersRecursively(pathToFile) {

    var resolvedPath = node_path.resolve(pathToFile)
    var foldersRecursively = [node_path.dirname(resolvedPath)]
  
    while (true) {
      var previous = foldersRecursively[foldersRecursively.length - 1]
      var current = node_path.dirname(previous)
  
      if (current === previous) break;
  
      foldersRecursively.push(node_path.dirname(foldersRecursively[foldersRecursively.length - 1]))
    }
    
    return foldersRecursively.reverse()
  }

  // make sure that all folder paths leading to the input file exist
  // if they don't, make them
  function makeFoldersRecursively(pathOrFolders) {
    var folderArray = (typeof pathOrFolders === 'string') ? getFoldersRecursively(pathOrFolders) : pathOrFolders

    if (folderArray.length === 0)
      return

    var folder = folderArray.shift()

    return stat(folder)
      .then((stats) => makeFoldersRecursively(folderArray))
      .catch((error) => {
        if (error.code === "ENOENT")
          return makeDir(folder)
            .then(() => makeFoldersRecursively(folderArray))
            .catch(error => console.error(error))
        else return console.error(error)
      })
  }

  return {
    // "plumbing" functions that are promisifications of node fs functions
    readFile, // read a file; return a promise
    readDir, // read a directory, return a promise
    writeFile, // write a file, return a promise
    makeDir, // write a dir, return a promise
    stat, // get info on a file or dir

    // "plumbing" functions to help the porcelain work
    getFoldersRecursively,
    makeFoldersRecursively,

    // "porcelain" functions that try to be smart
    read,
    write
  }
}())

module.exports = fs