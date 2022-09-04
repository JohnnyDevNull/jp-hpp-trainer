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
  tags: number[];
}

export interface ITextOption {
  id: number;
  text: string;
}

export interface IMultipleChoiceDataItem {
  id: number;
  title: string;
  alias: string;
  description: string;
  content?: string;
  question?: string;
  options?: ITextOption[];
  answers?: ITextOption[];
  resultAnswerIds?: number[];
  tags: number[];
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
