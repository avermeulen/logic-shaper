insert into puzzle (function_name, instructions, sql, params) 
	values('countSquares',  
	'Write a function called `countSquares` that can find how many squares are displayed below.',
	'select count(*) as result from shape where "shape".shape = $1',
	'square');

insert into puzzle (function_name, instructions, sql, params) 
	values('countSquares',  
	'Write a function called `countBlueSquares` that can find how many blues squares are displayed below.',
	'select count(*) as result from shape where "shape".shape = $1 and "shape".color = $2',
	'square,blue');