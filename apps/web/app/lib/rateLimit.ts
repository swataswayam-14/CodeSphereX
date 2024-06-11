import { Redis } from "ioredis";

const redis = new Redis(process.env.REDIS_URL);

export async function rateLimit(userId: string , limit:number , duration: number): Promise<boolean> {
    const key = `rate_limit:${userId}`;
    const currentTime = Math.floor(Date.now() / 1000);

    try {
        const transaction = redis.multi();
        transaction.zremrangebyscore(key, 0, currentTime - duration);
        transaction.zadd(key , currentTime, currentTime);
        transaction.zcard(key);

        const results = await transaction.exec();

        const requestCount = results?.[2]?.[1] as number;
        if(requestCount > limit){
            return false;
        }
        await redis.expire(key, duration+1);
        return true;

    } catch (error) {
        console.log("Rate limiting error", error);
        return false;
    }
}