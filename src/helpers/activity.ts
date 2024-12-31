import { CompletionStatus } from './enums';

const ActivityCategory = {
  getCategoryIcon: (category: string): string => {
    switch (category) {
      case 'religion':
        return 'h';
      default:
        return 'h';
    }
  },
};

const ActivityStatus = {
  getActivityStatusColor: (status: string): string => {
    switch (status) {
      case CompletionStatus.DONE:
        return '#dcfce7';
      case CompletionStatus.SKIP:
        return '#fee2e2';
      default:
        return '#f3f4f6';
    }
  },
  getActivityStatusIcon: (status: string): string => {
    switch (status) {
      case CompletionStatus.DONE:
        return '';
      case CompletionStatus.SKIP:
        return '';
      default:
        return '';
    }
  },
};

export { ActivityCategory, ActivityStatus };

