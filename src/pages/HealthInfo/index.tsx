import React, { useState, useRef} from 'react';
import { connect } from 'umi';
import {ConnectState} from "@/models/connect";
import { Button, } from 'antd';
import moment from 'moment'
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';


import { TableListItem } from './data.d';
import { getHealthInfo } from '../../services/user'
import UpdateForm from "./components/UpdateForm";

const TableList: React.FC<{}> = ({dispatch, healthyStatus}) => {
  const actionRef = useRef<ActionType>();
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const onClick = (date)=>{
    handleUpdateModalVisible(true);
    if(dispatch){
      dispatch({
        type: 'user/fetchHealthyStatus',
        payload: date,
      });
    }
  }
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
    {
      title: '日期',
      dataIndex: 'date',
      width: '10%',
      render:(item)=>
        moment(item).format('YYYY-MM-DD')
    },
    {
      title: '每日健康状况分析',
      dataIndex: 'date',
      width: '10%',
      render:(item, record)=>
        <Button type='primary' onClick={()=>onClick(moment(record.date).format('YYYY-MM-DD'))}>点击查看</Button>
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
      {healthyStatus && Object.keys(healthyStatus).length ? (
        <UpdateForm
          onCancel={() => {
            handleUpdateModalVisible(false);
            if(dispatch){
              dispatch({
                type: 'user/save',
                healthyStatus: {},
              });
            }
          }}
          updateModalVisible={updateModalVisible}
          values={healthyStatus}
        />
      ) : null}
    </PageHeaderWrapper>
  );
};

export default connect(({ user,}: ConnectState) => ({
  healthyStatus: user.healthyStatus,
}))(TableList);
