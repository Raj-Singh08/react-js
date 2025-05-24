import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";

export class AuthService{
    client = new this.client();
    account;

    constructor() {
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);

        this.account = new this.client.Account(this.client);
    }

    async createAccount(email, password, name) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if(userAccount) {
                console.log("User account created:", userAccount);
                //call another method 
                this.login({email, password});
            }
            else{
                return userAccount; 
            }
            console.log("Account created successfully");
        } catch (error) {
            console.error("Error creating account:", error);
            throw error;
        }
    }

    async login({email,password}) {
        try {
           return await this.account.createEmailSession(email, password);
        } catch (error) {
            console.error("Error logging in:", error);
            throw error;
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.error("Error getting current user:", error);
            throw error;
        }
        return null;
    }

    async logout() {
        try {
            return await this.account.deleteSessions();
        } catch (error) {
            console.error("Error logging out:", error);
            throw error;
        }
    }

}

const authService = new AuthService();

export default authService;