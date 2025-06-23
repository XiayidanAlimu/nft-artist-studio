import { create as ipfsHttpClient } from "ipfs-http-client";
import { IPFS } from "../config";
import axios from 'axios';

const ipfs =  ipfsHttpClient({
    host: IPFS.domain,
    port: 5001,
    protocol: 'http'

  })

export const addToIpfs = async (entity:any) : Promise<string> => {
  const added = await ipfs.add(entity)
  const cid = added.path;
  alert(cid);
  const rst = IPFS.url_prefix + cid;
  return rst;
}

export const readArticle = async (uri:string): Promise<string> => {
    const res = await axios.get(uri);
    return res.data
}

export const storeNftImage = async (file:any) => {
     return await addToIpfs(file);
}

export const storeMeta = async (data:any) => {

  // 自动处理对象转换
  const content = typeof data === 'object' 
    ? JSON.stringify(data)
    : data;
  alert(content);
  try {
    return await addToIpfs(content);
  } catch (error) {
    alert(error)
  }

}

export const storeArticle = async (article:any) => {
    return await addToIpfs(article);
}