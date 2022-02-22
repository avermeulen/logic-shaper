insert into puzzle (function_name, instructions, sql) 
	values('countSquares',  
	'Write a function called `countSquares` that can find how many square are displayed below.',
	'select count(*) as result from shape where "shape".shape = "square"');