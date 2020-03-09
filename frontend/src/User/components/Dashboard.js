import React, {useContext} from 'react';
import { AuthContext } from '../../shared/context/auth-context';
export default function Dashboard(props){
    const auth = useContext(AuthContext);
    return (<div>
        <h2>Dashboard</h2>
        <p>{props.userInfo.name}</p>
        <button onClick={auth.logout}>Logout</button>
        </div>);
}