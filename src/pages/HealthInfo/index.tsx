import { DownOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Divider, Dropdown, Menu, message, Input } from 'antd';
import React, { useState, useRef, useEffect } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';


import { TableListItem } from './data.d';
import { getHealthInfo } from '../../services/user'

const TableList: React.FC<{}> = () => {
  const actionRef = useRef<ActionType>();
  const columns: ProColumns<TableListItem>[] = [
    {
      title: 'ID',
      dataIndex: 'index',
      width: '10%',
    },
    {
      title: '血压',
      dataIndex: 'bloodPressure',
      width: '10%',
    },
    {
      title: '血糖',
      dataIndex: 'bloodSugar',
      width: '10%',
    },
    {
      title: '心率',
      dataIndex: 'heartRate',
      width: '10%',
    },
    {
      title: '脉搏',
      dataIndex: 'pulse',
      width: '10%',
    },
    {
      title: '体温',
      dataIndex: 'temperature',
      width: '10%',
    },
  ];
  return (
    <PageHeaderWrapper>
      <ProTable<TableListItem>
        headerTitle="健康数据"
        search={false}
        actionRef={actionRef}
        request={()=>getHealthInfo(localStorage.getItem('userid'))}
        columns={columns}
      />
    </PageHeaderWrapper>
  );
};

export default TableList;
