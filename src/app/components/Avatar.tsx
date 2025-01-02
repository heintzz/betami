import React from 'react';

interface AvatarProps {
  background: string;
  size?: number;
  children?: React.ReactNode;
}

const Avatar = ({ background, size = 12, children = null }: AvatarProps) => {
  return (
    <div
      className={`w-${size} h-${size} rounded-full grid  place-content-center`}
      style={{
        background: background,
      }}
    >
      {children}
    </div>
  );
};

export default Avatar;
