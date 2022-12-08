export default () => ({
    port: parseInt(process.env.PORT, 10) || 3000,
    database_host: process.env.DATABASE_HOST,
    database_port: parseInt(process.env.DATABASE_PORT, 10),
    database_user: process.env.DATABASE_USER,
    database_name: process.env.DATABASE_NAME,
    database_password: process.env.DATABASE_PASSWORD,
});
