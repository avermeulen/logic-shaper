create table app_user(
	id serial PRIMARY KEY,
	username text UNIQUE not null
);

create table puzzle_box (
	id serial PRIMARY KEY,
	name text
);

create table puzzle_box_puzzles(
	id serial PRIMARY KEY,
	puzzle_id int,
	puzzle_box_id int,
	foreign key (puzzle_id) references puzzle(id),
	foreign key (puzzle_box_id) references puzzle_box(id)
);

create table user_puzzles_boxes (
	id serial PRIMARY KEY,
	user_id int,
	puzzle_box_id int,
	create_at DATETIME,
	foreign key (puzzle_box_id) references puzzle_box(id)
);

create table user_puzzles(
	id serial PRIMARY KEY,
	puzzle_id int,
	user_id int,
	foreign key (puzzle_id) references puzzle(id),
	foreign key (app_user) references app_user(id)
);

create table user_puzzles_attempts(
	id serial PRIMARY KEY,
	user_puzzle_id int,
	code text,
	passed bool,
	submitted_at datetime,
	foreign key (user_puzzle_id) references user_puzzles(id)
	-- user_id int
);