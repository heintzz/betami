import Avatar from './Avatar';
import { MdNavigateNext } from 'react-icons/md';

const activityGoals = [
  {
    title: 'Task',
    description: 'Add a new task to your list',
  },
  {
    title: 'Habit',
    description: 'Track your new habit',
  },
  {
    title: 'Diary',
    description: 'Write a new diary entry',
  },
  {
    title: 'Challenge',
    description: 'Challenge yourself to be better',
  },
];

const ActivityAction = () => {
  return (
    <div className="absolute z-10 bottom-0 right-0 left-0 border bg-white rounded-t-2xl flex flex-col">
      {activityGoals.map((goal) => {
        return (
          <div
            className="flex items-center justify-between pl-3 pr-4 py-3 border-b"
            key={goal.title}
          >
            <div className="flex items-center gap-x-3">
              {/* leading icon */}
              <Avatar background="#e9d5ff" size={8} />
              {/* title and description */}
              <div className="flex flex-col items-start">
                <p>{goal.title}</p>
                <span className="text-xs">{goal.description}</span>
              </div>
              {/* trailing icon */}
            </div>
            <MdNavigateNext size={20} />
          </div>
        );
      })}
    </div>
  );
};

export default ActivityAction;
