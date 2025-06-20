import { connect } from '../service/connection-service'

import 'react-notifications-component/dist/theme.css'

export default function Connect() {
  const connectWallet = async () => {
    await connect();
  }
  return (
    <div>
    
        <a href="javascript:void(0);" onClick={connectWallet}>
          connect
        </a>
    
    </div>
  )
}
