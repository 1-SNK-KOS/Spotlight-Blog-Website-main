
const credentials = {
    appwrite_endpoint: String(import.meta.env.VITE_APPWRITE_URL), //url
    appwrite_database: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appwrite_project: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwrite_collection: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
    appwrite_storage: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
    tinyMCEApiKey:String(import.meta.env.VITE_TINYMCE_API_KEY)
}

export default credentials;