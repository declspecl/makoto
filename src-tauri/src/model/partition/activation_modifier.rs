use super::{ActivationQuery, ActivationOperator};

use serde::{Serialize, Deserialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct ActivationModifier
{
    pub query: ActivationQuery,
    pub operator: ActivationOperator
}