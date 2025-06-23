import { useState } from "react"

import { Button, Checkbox, Form, Input } from 'antd';

import { storeNftImage, storeMeta } from "../../service/arweave-service";
// import { addToIpfs } from '../../service/ipfs-service';
import { mintNFT } from "../../service/nft-service";
import { NftMeta } from "../../service/types";
import { useNavigate } from "react-router-dom"
import { messageBox } from "../../service/message-service";
import styles from './NftMintor.module.css'
const props = {
    name: 'file',
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    headers: {
        authorization: 'authorization-text',
    }
}
function NftMintor() {

    const navigate = useNavigate()
    const [meta, updateMeta] = useState<NftMeta>({
        name: "",
        descriptipn: "",
        imageUri: "",
        uri:"",
        type:""
    })
    const [uri, setUri] = useState("")
    /**
     * store 函数负责将媒体文件存储到IPFS
     */
    const store = async (file: any) => {
        try {

            // 1. 存储在IPFS的方式
            // const imageuri = await addToIpfs(file);
            // 2. 存储在Arweave的方式
            const imageuri = await storeNftImage(file);
            messageBox("success", "", imageuri)
            setUri(imageuri); // 设置组件的状态，用了useState hook
        } catch (error) {
            if (error instanceof Error)
                messageBox("danger", "", error.message)
        }
    }
    const mint = async () => {
        try {
            debugger
            const data: NftMeta = {
                ...meta,
                imageUri: uri,
                type: "image" // 图片是"image"，文章是"article"
            }
            const json = JSON.stringify(data);

            // 1. 存储在IPFS的方式
            // const metauri = await addToIpfs(json);
            // 2. 存储在Arweave的方式
            const metauri = await storeMeta(json);
            messageBox("success", "", metauri)
            const { success, tokenId } = await mintNFT(metauri);

            if (success && tokenId) {
                messageBox("success", "", tokenId?.toString())
                navigate("/personal/collectible-browse")
                // router.push("/mynft")
            } else {
                messageBox("danger", "", "mint failed")
            }
        } catch (error) {
            if (error instanceof Error)
                messageBox("danger", "", error.message)
        }
    }


    return (
        <div className={styles.CreatorWrapper}>
            <div className={styles.CreatorContainer}>

                <Input
                    placeholder="Asset Name"
                      className={styles.NftField}
                    onChange={(e) => updateMeta({ ...meta, name: e.target.value })}

                />


                <Input.TextArea
                    placeholder="Asset Description"
                      className={styles.NftField}
                    onChange={(e) => { updateMeta({ ...meta, descriptipn: e.target.value }) }}
                />

                <Input
                    type='file'
                    placeholder="Asset Image"
                    className={styles.NftField}
                    onChange={(e) => { e.target.files && store(e.target.files[0]) }}
                />


                <img width="350" src={uri} className={styles.NftImage} alt="NFT图片"/>


                <Button type="primary" onClick={mint} >
                    铸币
                </Button >



            </div>

        </div>
    )
}

export default NftMintor