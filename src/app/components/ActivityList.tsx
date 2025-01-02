import { ActivityCategory, ActivityStatus } from '@/helpers/activity';
import { IActivity } from '@/helpers/data';
import Avatar from './Avatar';

interface IActivityList {
  activities: IActivity[];
}

const ActivityList = (props: IActivityList) => {
  const { activities } = props;

  return (
    <div className="flex flex-col gap-y-2">
      {activities.map((activity) => {
        return (
          <div key={activity.id} className="flex justify-between">
            <div className="flex gap-x-2 items-center">
              <div
                id="category-icon"
                className="w-10 rounded-lg p-1 h-[70%] bg-red-200 grid place-content-center"
              >
                {ActivityCategory.getCategoryIcon('h')}
              </div>
              <div id="description" className="flex flex-col">
                <p>{activity.title}</p>
                <div className="flex gap-x-2">
                  <p>{activity.type}</p>
                  <p>{activity.id + ' PM'}</p>
                </div>
              </div>
            </div>
            <Avatar background={ActivityStatus.getActivityStatusColor(activity.status)}>
              {ActivityStatus.getActivityStatusIcon(activity.status)}
            </Avatar>
          </div>
        );
      })}
    </div>
  );
};

export default ActivityList;
