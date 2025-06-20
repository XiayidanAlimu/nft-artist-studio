
import { storeMeta } from '../service/ipfs-service'
import 'react-notifications-component/dist/theme.css'

export default function () {

    const connectIpfs = async () => {
        await storeMeta({
            name: 'xiayidan'
        })
    }
    return (
        <div>

            <a href="javascript:void(0);" onClick={connectIpfs}>
                connectIpfs
            </a>

        </div>
    )
}
