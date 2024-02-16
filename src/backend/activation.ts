import { DaysOfMonth, DaysOfWeek } from "./dayTime";

export type ActivationOperator = "AND" | "OR";

interface OnDaysOfWeekActivationQuery extends DaysOfWeek {
    tag: "OnDaysOfWeek"
}

interface OnDaysOfMonthActivationQuery extends DaysOfMonth {
    tag: "OnDaysOfMonth"
}

export type ActivationQuery = | OnDaysOfWeekActivationQuery
                              | OnDaysOfMonthActivationQuery;

export interface ActivationModifier {
    query: ActivationQuery,
    operator: ActivationOperator
}
