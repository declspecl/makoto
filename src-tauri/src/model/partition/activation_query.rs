#[derive(Debug)]
pub enum ActivationQuery
{
    OnDaysOfWeek(Vec<Day>),
    OnDaysOfMonth(Vec<u8>),
    InTimeRange((Time, Time))
}

// TODO: impl Serialize for ActivationQuery
// TODO: impl Deserialize for ActivationQuery