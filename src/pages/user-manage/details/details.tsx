import React from 'react'
import { useParams } from 'react-router-dom'

const UserManageDetails: React.FC = () => {
  const params = useParams<{ id: string }>()

  console.log(params.id)

  return (
    <div>
      <p>User Manage Details</p>
    </div>
  )
}

export default UserManageDetails
