import request from '@/utils/request';
import {baseURL} from "../../config/constants";

export async function query(): Promise<any> {
  return request('/api/users');
}

// export async function queryCurrent(): Promise<any> {
//   return request('/api/currentUser');
// }

export async function queryNotices(): Promise<any> {
  return request('/api/notices');
}

export async function queryCurrent(userid: string): Promise<any> {
  return request(`${baseURL}/api/getBasciInfo?userid=${userid}`);
}

export async function updateUserInfo(payload: object) {
  return request(`${baseURL}/api/updateBasicInfo`, {
    method: 'POST',
    data: payload,
  });
}

export async function getAllBulletin() {
  return request(`${baseURL}/api/getBulletin`);
}

export async function addBulletin(payload: object){
  return request(`${baseURL}/api/addBulletin`, {
    method: 'POST',
    data: payload,
  });
}

export async function updateBulletin(payload: object){
  return request(`${baseURL}/api/updateBulletin`, {
    method: 'POST',
    data: payload,
  });
}

export async function getHealthInfo(userid: any) {
  return request(`${baseURL}/api/getHealthy?userid=${userid}`);
}

export async function getThreshold() {
  return request(`${baseURL}/api/getThreshold`);
}

export async function updateThreshold(payload: object){
  return request(`${baseURL}/api/updateThreshold`, {
    method: 'POST',
    data: payload,
  });
}
