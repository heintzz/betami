import { CompletionStatus } from './enums';

export interface IActivity {
  id: string;
  title: string;
  status: string;
  type: string;
  category: string;
  createdAt: Date;
}

const activities: IActivity[] = [
  {
    id: '1',
    title: 'Morning Exercise',
    status: CompletionStatus.DONE,
    type: 'habit',
    category: 'exercise',
    createdAt: new Date(),
  },
  {
    id: '2',
    title: 'Baca Al Quran',
    status: CompletionStatus.DONE,
    type: 'habit',
    category: 'exercise',
    createdAt: new Date(),
  },
  {
    id: '3',
    title: 'Makan Enak',
    status: CompletionStatus.LOCK,
    type: 'habit',
    category: 'exercise',
    createdAt: new Date(),
  },
];

export default activities;
