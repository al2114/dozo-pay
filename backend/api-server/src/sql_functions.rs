use diesel::sql_types::{Array, Text};
sql_function!(array_remove, array_remove_t, (x: Array<Text>, y: Text) -> Array<Text>);
