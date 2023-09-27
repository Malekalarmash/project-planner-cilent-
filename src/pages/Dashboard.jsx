import React from 'react'
import Signin from './signin'
import { setLoggedIn } from '../redux/actions'


export default function () {
    const loggedIn = useSelector((state) => state.setLogIn);

    return (
        <>
            <Signin />
        </>
    )
}
