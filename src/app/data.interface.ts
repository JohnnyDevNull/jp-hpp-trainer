export interface IDataTag {
  id: number,
  title: string;
  alias: string;
  description: string;
}

export interface IDataItem {
  id: number,
  title: string,
  alias: string,
  description: string,
  content: string,
  question: string,
  answer: string
}

export interface IData {
  tags: IDataTag[];
  items: IDataItem[]
}
