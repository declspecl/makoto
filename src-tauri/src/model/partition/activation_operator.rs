use serde::{Serialize, Deserialize};

#[derive(Debug, Serialize, Deserialize)]
pub enum ActivationOperator
{
    AND,
    OR
}

// ----------------------------
// - serialization unit tests -
// ----------------------------
#[cfg(test)]
mod tests
{
    use super::*;
    use serde_json::json;

    #[test]
    fn test_activation_operator_serialization()
    {
        assert_eq!(
            json!(ActivationOperator::AND),
            r#"AND"#
        );

        assert_eq!(
            json!(ActivationOperator::OR),
            r#"OR"#
        );
    }
}