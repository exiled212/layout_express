create table user_groups (
  id integer not null primary key autoincrement,
  user_id integer not null references user(id),
  group_id integer not null references groups(id),
  active boolean not null default true,
  unique(user_id, group_id)
);
