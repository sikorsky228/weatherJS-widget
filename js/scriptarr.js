// запись
foo = ['first', 'bar2', '3'];
localStorage.foo = JSON.stringify(foo);
 alert(localStorage.foo);
// чтение

delete foo[1];

alert (foo);

	
var filteredArr = foo.filter(function(x) {
  return x !== undefined && x !== null;
});

alert(filteredArr);


