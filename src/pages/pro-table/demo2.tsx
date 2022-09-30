import type { ProColumns } from '@ant-design/pro-table'
import { ProTable } from '@ant-design/pro-table'
import { Space } from 'antd'
import React from 'react'

const dataSource = new Array(10).fill(0).map((_, index) => {
  return {
    id: index,
    title: `标题 => ${index}`,
    time: new Date().toLocaleDateString(),
  }
})

const ProTableDemo2: React.FC = () => {
  const columns: ProColumns<any>[] = [
    {
      dataIndex: 'id',
      title: 'ID',
      hideInSearch: true,
    },
    {
      title: '合集',
      children: [
        {
          dataIndex: 'title',
          title: '标题',
        },
        {
          dataIndex: 'time',
          title: '时间',
        },
      ],
    },
    {
      title: '合集',
      children: [
        {
          title: '集合的集合',
          children: [
            {
              dataIndex: 'id',
              title: 'IDDDD',
            },
            {
              dataIndex: 'time',
              title: '时间',
            },
          ],
        },
        {
          dataIndex: 'time',
          title: '时间',
        },
      ],
    },
    {
      title: '操作',
      render: () => {
        return (
          <Space>
            <a>1</a>
            <a>2</a>
            <a>3</a>
          </Space>
        )
      },
    },
  ]

  return <ProTable bordered dataSource={dataSource} columns={columns} />
}

export default ProTableDemo2
