#[derive(Serialize)]
pub struct ClaimTemplateContext {
    pub username: String,
    pub logged_in: bool,
    pub currency_symbol: String,
    pub amount: String,
    pub sender: String,
    pub claim_id: i32,
}

impl Default for ClaimTemplateContext {
    fn default() -> ClaimTemplateContext {
        ClaimTemplateContext {
            username: "".to_string(),
            logged_in: false,
            currency_symbol: "£".to_string(),
            amount: "".to_string(),
            sender: "".to_string(),
            claim_id: 0,
        }
    }
}

#[derive(Serialize)]
pub struct ReceiptTemplateContext {
    pub is_successful: bool,
    pub receipt_id: String,
    pub sender: String,
    pub receiver: String,
    pub currency_symbol: String,
    pub new_balance: String,
    pub amount: String,
}

impl Default for ReceiptTemplateContext {
    fn default() -> ReceiptTemplateContext {
        ReceiptTemplateContext {
            is_successful: false,
            receipt_id: "".to_string(),
            sender: "".to_string(),
            receiver: "".to_string(),
            currency_symbol: "£".to_string(),
            new_balance: "".to_string(),
            amount: "".to_string(),
        }
    }
}
