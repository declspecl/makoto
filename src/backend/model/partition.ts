// -----------------------
// - activation operator -
// -----------------------
import { DaysOfMonth, DaysOfWeek, TimeRange } from "./dayTime";

// -----------------------
export type ActivationOperator = "AND" | "OR";

// --------------------
// - activation query -
// --------------------
interface ActivationQueryInTimeRange extends TimeRange {
    tag: "InTimeRange"
}

interface ActivationQueryOnDaysOfWeek extends DaysOfWeek {
    tag: "OnDaysOfWeek"
}

interface ActivationQueryOnDaysOfMonth extends DaysOfMonth {
    tag: "OnDaysOfMonth"
}

export type ActivationQuery = ActivationQueryInTimeRange | ActivationQueryOnDaysOfWeek | ActivationQueryOnDaysOfMonth;

// -----------------------
// - activation modifier -
// -----------------------
export interface ActivationModifier {
    query: ActivationQuery,
    operator: ActivationOperator
}