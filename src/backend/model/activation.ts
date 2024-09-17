import { DaysOfMonth, DaysOfWeek } from "./dayTime";

export type ActivationOperator = "AND" | "OR";

interface OnDaysOfWeekActivationQuery extends DaysOfWeek {
    type: "OnDaysOfWeek"
}

interface OnDaysOfMonthActivationQuery extends DaysOfMonth {
    type: "OnDaysOfMonth"
}

export type ActivationQuery = | OnDaysOfWeekActivationQuery
                              | OnDaysOfMonthActivationQuery;

export interface ActivationModifier {
    query: ActivationQuery,
    operator: ActivationOperator
}
