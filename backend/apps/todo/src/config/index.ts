export default () => ({
    port: parseInt(process.env.PORT, 10) || 3000,
    database: {
        url: `mongodb://${process.env.DATABASE_USER}:${encodeURIComponent(process.env.DATABASE_PASSWORD)}@${process.env.DATABASE_HOST}/${process.env.DATABASE_NAME}?retryWrites=true&w=majority&authSource=admin`
    },
    redisUrl: process.env.REDIS_URL || 'redis://localhost:6379',
    REDIS_HOST: process.env.REDIS_HOST || 'localhost',
    REDIS_PORT: process.env.REDIS_PORT || '6379',
    appEnv: process.env.APP_ENV || 'local',
    apiUrl: process.env.API_BASE_URL || 'http://host.docker.internal:8000',
    AWS_S3_BUCKET_NAME: process.env.AWS_BUCKET || '',
    AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID || '',
    AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY || '',
    AWS_REGION: process.env.AWS_REGION || 'us-east-1',
    AWS_BUCKET_URL: process.env.AWS_BUCKET_URL || 'us-east-1',
});
