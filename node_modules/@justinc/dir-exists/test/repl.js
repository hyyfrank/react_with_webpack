var dirExists = require('..').dirExists;
var dirExistsSync = require('..').dirExistsSync;
var dirExistsAsPromised = require('..').dirExistsAsPromised;

var repl = require('repl');

var replServer = repl.start({
  prompt: '> '
});

replServer.context.dirExists = dirExists;
replServer.context.dirExistsSync = dirExistsSync;
replServer.context.dirExistsAsPromised = dirExistsAsPromised;

console.log('sync:', dirExistsSync(__dirname));
console.log(dirExists(__dirname, (err, exists) => {
  if (err) throw err;
  console.log('async:', exists);
}));
dirExistsAsPromised(__dirname).then(exists => console.log('promise:', exists));
