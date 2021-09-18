import React, { useState, useEffect, useCallback } from 'react';
import { Button } from 'antd';
import type { ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { Link } from 'react-router-dom';

type DemoDataType = 1 | 2 | 3 | 4;

type DemoData = {
  id: number;
  title: string;
  type: DemoDataType;
};

let index = 0;

const ProTableDemo: React.FC = () => {
  const [columns, setColumns] = useState<ProColumns<DemoData>[]>([
    {
      dataIndex: 'title',
      title: 'title',
      search: false,
    },
    {
      dataIndex: 'type',
      title: 'type',
      filteredValue: [],
      filters: [
        { text: '1', value: '1' },
        { text: '2', value: '2' },
      ],
      search: false,
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
        <Link to="/pro-table/table">GO TABLE</Link>
      </p>

      <p>
        <Button
          type="primary"
          onClick={() => {
            setColumns((cs) =>
              cs.map((cc) => ({
                ...cc,
                filteredValue: [],
              })),
            );
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

      <ProTable
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
