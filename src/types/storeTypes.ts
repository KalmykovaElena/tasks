export interface StateSchema {
  tasks: TaskSchema;
  filters: FiltersSchema;
}
export interface TaskSchema {
  tasks: {
    id: string;
    title: string;
    content: string;
    tags: string[];
  }[];
  filters: string[];
}
export interface FiltersSchema {
  filters: string[];
}