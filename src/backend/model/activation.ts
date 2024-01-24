import { PeriodOfTime } from "./dayTime";

export type ActivationOperator = "AND" | "OR";

interface InPeriodOfTimeActivationQuery extends PeriodOfTime {
    tag: "InPeriodOfTime"
}

interface OnDaysOfWeekActivationQuery extends PeriodOfTime {
    tag: "OnDaysOfWeek"
}

interface OnDaysOfMonthActivationQuery extends PeriodOfTime {
    tag: "OnDaysOfMonth"
}

export type ActivationQuery = InPeriodOfTimeActivationQuery
                            | OnDaysOfWeekActivationQuery
                            | OnDaysOfMonthActivationQuery;

export interface ActivationModifier {
    query: ActivationQuery,
    operator: ActivationOperator
}