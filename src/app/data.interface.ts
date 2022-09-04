export interface IDataTag {
  id: number;
  title: string;
  alias: string;
  description: string;
}

export interface IFlipCardDataItem {
  id: number;
  title: string;
  source: { title: string; link: string };
  alias: string;
  description: string;
  content?: string;
}

export interface IMultipleChoiceDataItem {
  id: number;
  title: string;
  alias: string;
  description: string;
  question: string;
  resultOptionIds: number[];
}

export interface IData {
  tags: IDataTag[];
  flipCards: {
    items: IFlipCardDataItem[];
  };
  multipleChoice: {
    items: IMultipleChoiceDataItem[];
  };
}
