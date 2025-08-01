import { run } from "./src/main.js";

const DEFAULT_STEP_SIZE = "5000-15000";

// 解析环境变量中的多账号配置
const configs = process.env.CONFIGS 
  ? JSON.parse(process.env.CONFIGS)  // 解析为配置对象数组
  : [];  // 默认空数组

// 添加对旧版单账号环境变量的兼容
if (configs.length === 0) {
  const legacyConfig = {
    username: process.env.XIAOMI_AMAZFIT_USERNAME,
    password: process.env.XIAOMI_AMAZFIT_PASSWORD,
    user_id: process.env.XIAOMI_AMAZFIT_USER_ID,
    app_token: process.env.XIAOMI_AMAZFIT_APP_TOKEN,
    step_size: process.env.STED_SIZE_RANGE ?? DEFAULT_STEP_SIZE,
  };
  
  // 只有当旧版配置存在有效数据时才添加
  if (legacyConfig.username || legacyConfig.user_id) {
    configs.push(legacyConfig);
  }
}

// 顺序执行所有配置任务
for (const config of configs) {
  try {
    console.log(`正在执行账号: ${config.username || config.user_id}`);
    await run({
      ...config,
      step_size: config.step_size || DEFAULT_STEP_SIZE  // 确保步数范围有默认值
    });
  } catch (error) {
    console.error(`账号 ${config.username || config.user_id} 执行失败:`, error);
  }
}



//import { run } from "./src/main.js";

//const DEFAULT_STEP_SIZE = "5000-15000";

// 获取环境变量
//const config = {
//  username: process.env.XIAOMI_AMAZFIT_USERNAME,
//  password: process.env.XIAOMI_AMAZFIT_PASSWORD,
//  user_id: process.env.XIAOMI_AMAZFIT_USER_ID,
//  app_token: process.env.XIAOMI_AMAZFIT_APP_TOKEN,
//  step_size: process.env.STED_SIZE_RANGE ?? DEFAULT_STEP_SIZE,
//};

//await run(config);
