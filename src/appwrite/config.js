import credentails from '../conf/config'
import { Client, Databases, Query, Storage, ID } from 'appwrite'

class PostService {
    client = new Client();
    database;
    storage;

    constructor() {
        this.client
            .setEndpoint(credentails.appwrite_endpoint)
            .setProject(credentails.appwrite_project)

        this.storage = new Storage(this.client)

        this.database = new Databases(this.client)
    }


    async createPost({ title, slug, content, status, user_Id, featuredImage }) {
        try {
            const newPost = await this.database.createDocument(
                credentails.appwrite_database,
                credentails.appwrite_collection,
                slug,
                { title, content, status, user_Id, featuredImage }
            )

            if (newPost) {
                console.log('Create Post :: configjs :: ', newPost);           //REVIEW  
            } else {
                console.log('Create Post failed :: configjs :: ', newPost);      //REVIEW 
            }
            return newPost;

        } catch (error) {
            console.log('Create Post ERROR  :: configjs :: ', error);   //REVIEW  
            throw new Error(`Error while createPost, Try Again :: ${error.message}`)
        }
    }


    async updatePost(slug,{ title, content, status, featuredImage }) {
        try {
            const postUpdate = await this.database.updateDocument(
                credentails.appwrite_database,
                credentails.appwrite_collection,
                slug,
                { title, content, status, featuredImage }
            )


            if (postUpdate) {
                console.log('Post update :: confjs :: ', postUpdate);    //REVIEW   
            } else {
                console.log('Post update failed :: confjs :: ', postUpdate);    //REVIEW   
            }


            return postUpdate;
        } catch (error) {
            console.log('Post update ERROR  :: confjs :: ', error);           //REVIEW   
            throw new Error(`Error while updatePost, Try Again :: ${error.message}`)
        }
    }


    async deletePost(slug) {
        try {
            const postDelete = await this.database.deleteDocument(
                credentails.appwrite_database,
                credentails.appwrite_collection,
                slug
            )

            if (postDelete) {
                console.log('Post delete :: ', postDelete);      //REVIEW   
            } else {
                console.log('Post delete falied :: ', postDelete);    //REVIEW   
            }

            return postDelete;
        } catch (error) {
            console.log('Post delete ERROR :: ', error);        //REVIEW   
            throw new Error(`Error while deletePost, Try Again :: ${error.message}`)
        }
    }


    async getPost(slug) {

        try {
            const post = await this.database.getDocument(
                credentails.appwrite_database,
                credentails.appwrite_collection,
                slug
            )

            if (post) {
                console.log('Post Fetched :: confjs :: ', post);        //REVIEW   
            } else {
                console.log('Post Fetched failed:: confjs :: ', post);     //REVIEW   
            }

            return post;
        } catch (error) {
            console.log('Post Fetched Error  :: confjs :: ', error);    //REVIEW   
            throw new Error(`Error get Post, Try Again :: ${error.message}`)
        }

    }


    async getAllPost(defQueries = [Query.equal("status",[ "active"])]) {

        try {
            const getAllPost = await this.database.listDocuments(
                credentails.appwrite_database,
                credentails.appwrite_collection,
                defQueries
            )

            if (getAllPost) {
                console.log('getAllPost success :: confjs :: ', getAllPost);  //REVIEW   
            } else {
                console.log('getAllPost failed :: confjs :: ', getAllPost);  //REVIEW   
            }

            return getAllPost;
        } catch (error) {
            console.log('getAllPost ERROR  :: confjs :: ', error)   //REVIEW   
            throw new Error(`Error getAllPost, Try Again :: ${error.message}`)
        }

    }

    async getUserPosts(user_Id) {
        // const id = String(user_Id);
        console.log("getUser pOst :: ",typeof user_Id)
        try {
            const userPosts = await this.database.listDocuments(
                credentails.appwrite_database,
                credentails.appwrite_collection,
                [Query.equal("user_Id", [ user_Id ])]
            )

            if (userPosts) {
                console.log('getUserPosts success :: confjs :: ', userPosts);   //REVIEW   

            } else {
                console.log('getUserPosts failed :: confjs :: ', userPosts); //REVIEW   

            }

            return userPosts;
        } catch (error) {
            console.log('getUserPost ERROR :: confjs :: ', error);    //REVIEW   
            throw new Error(`Error while getUserPost, Try Again :: ${error.message}`)
        }
    }


    // file service
    async uploadFile(file) {
        const id = ID.unique();
        try {
            const fileResp = await this.storage.createFile(
                credentails.appwrite_storage,
                id,
                file
            )

            if (fileResp) {
                console.log("File uploaded :: ", fileResp);      //REVIEW   
            } else {
                console.log("Retry File upload :: ", fileResp);    //REVIEW   
            }

            return fileResp
        } catch (error) {
            console.log("Error :: configuration.js :: uploadFile :: ", error);    //REVIEW   
            throw new Error(`Error while uploadFile, Try Again :: ${error.message}`);
        }
    }

    async deleteFile(fileId) {
        try {
            const deleteResp = await this.storage.deleteFile(
                credentails.appwrite_storage,
                fileId
            )

            if (deleteResp) {
                console.log("File deleted Successfully :: ", deleteResp);    //REVIEW   
            } else {
                console.log("Retry to delete :: ", deleteResp);    //REVIEW   
            }

            return deleteResp
        } catch (error) {
            console.log("Error :: config.js :: deleteFile :: ", error);   //REVIEW   
            throw new Error(`Error while deleteFile, Try Again :: ${error.message}`)
        }
    }


    async getFilePreview(fileId) {
        try {
            const fileResp = this.storage.getFilePreview(
                credentails.appwrite_storage,
                fileId
            )
            console.log('file Preview ::  ', fileResp);   //REVIEW   
            return fileResp;
        } catch (error) {
            throw new Error(`Error while filePreview, Try Again :: ${error.message}`)
        }
    }


}



const appwriteService = new PostService();

export default appwriteService;