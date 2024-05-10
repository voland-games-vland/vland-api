export default () => {
  console.log(process.env.FIREBASE_PRIVATE_KEY)
  console.log(JSON.parse(process.env.FIREBASE_PRIVATE_KEY))
  const { privateKey } = JSON.parse(process.env.FIREBASE_PRIVATE_KEY)
    console.log(privateKey)
    return {
    port: parseInt(process.env.PORT, 10) || 3001,
    database: {
      mongodb: {
        uri: process.env.MONGO_URL,
        name: process.env.DATABASE_MONGODB_NAME || 'vland',
      },
    },
    firebase: {
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: privateKey,
    },
  }
};
