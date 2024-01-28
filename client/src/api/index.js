import { auth } from "../config/firebase.config"
import {baseUrl} from '../utils/index'


export const getAuthenticatedUser = () => {
    return new Promise((resolve, reject) => {
        const unsubscribe = auth.onAuthStateChanged((usercred) =>{
            if(usercred){
                usercred.getIdToken().then(async (token) => {
                    await fetch(`${baseUrl}/validateUserJWTToken` , {
                        method : 'GET',
                        headers : {
                            Authorization : `Bearer ${token}`,
                            'Content-Type' : 'application/json'
                        }
                    })
                    .then((response) => {
                        if(!response.ok){
                            reject(
                                new Error(
                                    "Network response not ok"
                                )
                            )
                        }
                        return response.json()
                    })
                    .then((data) => {
                         resolve(data?.user)
                     })
                })
            }
            else {
                reject(new Error("User is not authenticated"))
            }

            unsubscribe();
        })
    })
}