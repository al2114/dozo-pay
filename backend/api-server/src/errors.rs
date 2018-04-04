error_chain!{
    foreign_links {
        Diesel(::diesel::result::Error);
    }
}
