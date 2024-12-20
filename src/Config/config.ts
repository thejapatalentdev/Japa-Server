import dotenv from "dotenv";
dotenv.config();

const config = {
  conn: process.env.CONN,
  port: process.env.PORT,
  salt: process.env.SALT,
  mail: process.env.EMAIL,
  pass: process.env.PASS,
  smpt: process.env.SMTP,
  mail_port: process.env.MAILPORT,
  user_id: process.env.API_USER_ID,
  api_secret: process.env.API_SECRET,

  //   pass: "",
  //   infobip_key: process.env.INFOBIP_KEY,
  //   info_bip_host: process.env.INFO_BIP_HOST,
  key: process.env.KEY,
  //   accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  //   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  //   region: process.env.AWS_REGION,
  //   bucket: process.env.S3_BUCKET_NAME,
  //   azure_storage_connection_string: "your_azure_storage_connection_string",
  //   container_name: "your_azure_storage_container_name",
};

export default config;
