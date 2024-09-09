
export interface Note {
    id: number;
    title: string;
    content: string;
    date: string;       
    tag: 'to do' | 'in progress' | 'done'; 
  }
  