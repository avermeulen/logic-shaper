

create table IF NOT EXISTS shape(
	uid text,
	shape text,
	color text,
	the_number int
);

-- drop table puzzle;
create table IF NOT EXISTS puzzle(
	id serial PRIMARY KEY,
	function_name text not null,
	instructions text not null,
	sql text not null,
	params text,
	active bool default true,
	level text
);
