import credentails from '../conf/config'
import { Client, Account, ID } from 'appwrite'


class AuthService {
    account;
    client = new Client();

    constructor() {
        this.client
            .setEndpoint(credentails.appwrite_endpoint)
            .setProject(credentails.appwrite_project)

        this.account = new Account(this.client)
    }


    async createAccount({ name, email, password }) {
        const id = ID.unique();

        try {
            const newUser = await this.account.create(
                id,
                email,
                password,
                name
            )

            if (newUser) {
                console.log('User Account Created :: auth.js :: ', newUser);   //REVIEW  
                const userLogin = this.login({ email, password });

                if (userLogin) {
                    console.log('User Logged In :: auth.js :: ', userLogin);  //REVIEW  
                    return userLogin;
                } else {
                    console.log('User Logged In Failed:: auth.js :: ', userLogin);   //REVIEW  
                }

                return newUser
            } else {
                console.log('User Account Creation Failed  :: auth.js :: ', newUser);  //REVIEW  
            }


        } catch (error) {
            console.log(`Error while creating Account , Try Again :: ${error.message}`);   //REVIEW  
            throw new Error(`Error while creating Account , Try Again :: ${error.message}`)
        }
    }


    async login({ email, password }) {
        try {
            const session = await this.account.createEmailPasswordSession(
                email,
                password
            )

            if (session) {
                console.log('User logged :: authjs :: ', session);      //REVIEW  
            } else {
                console.log('User logged failed :: authjs :: ', session);       //REVIEW  
            }
            return session;
        } catch (error) {
            console.log(`Error while loggin Account , Try Again :: ${error.message}`);   //REVIEW  
            throw new Error(`Error while login, Try Again :: ${error.message}`)
        }
    }


    async logout() {
        try {
            const userLogout = await this.account.deleteSessions();

            if (userLogout) {
                console.log('User logged successfully :: authjs :: ', userLogout);  //REVIEW 
            } else {
                console.log('User logged failed :: authjs :: ', userLogout);     //REVIEW  
            }

            return userLogout;
        } catch (error) {
            console.log('User logged failed catch :: authjs :: ', error);     //REVIEW   
            throw new Error(`Error while logout, Try Again :: ${error.message}`)
        }
    }


    async getCurrentUser() {
        try {
            const userStatus = await this.account.get();

            if (userStatus) {
                console.log('User Status :: authjs :: ', userStatus);     //REVIEW   
            } else {
                console.log('User Status failed :: authjs :: ', userStatus);      //REVIEW   
            }

            return userStatus;
        } catch (error) {
            console.log('User Status failed Error :: authjs :: ', error);       //REVIEW   
            throw new Error(`Error while Current USer, Try Again :: ${error.message}`)
        }


    }


}



const authService = new AuthService();

export default authService;