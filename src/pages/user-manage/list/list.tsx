import React from 'react'
import { Link } from 'react-router-dom'

const UserManageLis: React.FC = () => {
  return (
    <div>
      <p>User Manage List</p>
      <Link to="/user-manage/details/1234">GO USER DETAILS</Link>
    </div>
  )
}

export default UserManageLis
