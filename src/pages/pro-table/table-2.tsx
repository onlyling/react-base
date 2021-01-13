import React, { useState, useEffect, useCallback } from 'react';
import { Button, Table } from 'antd';
import { ColumnProps } from 'antd/es/table';
import { Link } from 'react-router-dom';
import omit from 'omit.js';

type DemoDataType = 1 | 2 | 3 | 4;

type DemoData = {
  id: number;
  title: string;
  type: DemoDataType;
};

let index = 0;

const ProTableDemo: React.FC = () => {
  const [columns, setColumns] = useState<ColumnProps<DemoData>[]>([
    {
      dataIndex: 'title',
      title: 'title',
    },
    {
      dataIndex: 'type',
      title: 'type',
      filters: [
        { text: '1', value: '1' },
        { text: '2', value: '2' },
      ],
    },
  ]);
  const [list, setList] = useState<DemoData[]>([]);
  const [loading, setLoading] = useState(false);
  const fetchData = useCallback(() => {
    setLoading(true);

    setTimeout(() => {
      const datas: DemoData[] = [];

      for (let iii = 0; iii < 10; iii++) {
        const id = ++index;

        datas.push({
          id,
          title: `${id}_title`,
          type: 2,
        });
      }

      setList(datas);

      setLoading(false);
    }, 500);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <>
      <p>
        <Link to="/pro-table/demo">GO DEMO</Link>
      </p>

      <p>
        <Button
          type="primary"
          onClick={() => {
            // omit 去掉 filteredValue，模拟 ProTable 对 columns 里面的空数组过滤
            setColumns((cs) => cs.map((cc) => omit(cc, ['filteredValue'])));
            fetchData();
          }}
        >
          reset
        </Button>
      </p>

      <p>
        <Button type="primary" onClick={fetchData}>
          random data
        </Button>
      </p>

      <p>{JSON.stringify(columns)}</p>

      <Table
        rowKey="id"
        columns={columns}
        loading={loading}
        dataSource={list}
        onChange={(_, filters) => {
          setColumns((cs) =>
            cs.map((cc) => {
              cc.filteredValue = (filters[cc.dataIndex as string] as any[]) || [];
              return cc;
            }),
          );
          fetchData();
        }}
      />
    </>
  );
};

export default ProTableDemo;
