import React from 'react';
import type { RouteComponentProps } from 'react-router-dom';

const UserManageDetails: React.FC<RouteComponentProps<{ id: string }>> = ({ match }) => {
  console.log(match.params.id);

  return (
    <div>
      <p>User Manage Details</p>
    </div>
  );
};

export default UserManageDetails;
