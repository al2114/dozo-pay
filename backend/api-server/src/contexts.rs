#[derive(Serialize)]
pub struct ClaimTemplateContext {
    pub username: String,
    pub logged_in: bool,
    pub currency_symbol: String,
    pub amount: String,
    pub sender: String,
}

impl Default for ClaimTemplateContext {
    fn default() -> ClaimTemplateContext {
        ClaimTemplateContext {
            username: "".to_string(),
            logged_in: false,
            currency_symbol: "£".to_string(),
            amount: "".to_string(),
            sender: "".to_string(),
        }
    }
}
