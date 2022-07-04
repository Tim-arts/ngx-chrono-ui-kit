export interface TimeRangePickerResponse {
  allowsNullValue?: boolean;
  setDefaultValue?: boolean;
  startTime?: number;
  endTime?: number;
  startValue?: Date | null;
  endValue?: Date | null;
}

export type InputType = 'start' | 'end';
