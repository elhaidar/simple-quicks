export enum TodoCategory {
  ImportantASAP = "Important ASAP",
  OfflineMeeting = "Offline Meeting",
  VirtualMeeting = "Virtual Meeting",
  ASAP = "ASAP",
  ClientRelated = "Client Related",
  SelfTask = "Self Task",
  Appointments = "Appointments",
  CourtRelated = "Court Related",
}

export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  date: Date;
  description: string;
  categories: TodoCategory[];
}
