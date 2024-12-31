import { ActivityStatus } from '@/helpers/activity';
import React from 'react';

interface AvatarProps {
  status: string;
  children?: React.ReactNode;
}

const Avatar = ({ status, children = null }: AvatarProps) => {
  const background = ActivityStatus.getActivityStatusColor(status);
  return (
    <div
      className="w-12 h-12 rounded-full grid  place-content-center"
      style={{
        background: background,
      }}
    >
      {children}
    </div>
  );
};

export default Avatar;
