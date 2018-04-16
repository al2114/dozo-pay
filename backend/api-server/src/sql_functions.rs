use diesel::sql_types::{Array, Integer};
sql_function!(idx, idx_t, (x: Array<Integer>, y: Integer) -> Integer);
