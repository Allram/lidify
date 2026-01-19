import Bull from "bull";
import { logger } from "../utils/logger";
import { config } from "../config";

// Parse Redis URL for Bull configuration (supports auth and DB index)
const redisUrl = new URL(config.redisUrl);
const redisDb = redisUrl.pathname ? parseInt(redisUrl.pathname.slice(1) || "0", 10) : undefined;
const redisConfig: Bull.QueueOptions["redis"] = {
    host: redisUrl.hostname,
    port: parseInt(redisUrl.port || "6379", 10),
};

if (redisUrl.username) {
    redisConfig.username = decodeURIComponent(redisUrl.username);
}

if (redisUrl.password) {
    redisConfig.password = decodeURIComponent(redisUrl.password);
}

if (redisDb !== undefined && !Number.isNaN(redisDb)) {
    redisConfig.db = redisDb;
}

// Create queues
export const scanQueue = new Bull("library-scan", {
    redis: redisConfig,
});

export const discoverQueue = new Bull("discover-weekly", {
    redis: redisConfig,
});

export const imageQueue = new Bull("image-optimization", {
    redis: redisConfig,
});

export const validationQueue = new Bull("file-validation", {
    redis: redisConfig,
});

export const analysisQueue = new Bull("audio-analysis", {
    redis: redisConfig,
});

// Export all queues for monitoring
export const queues = [scanQueue, discoverQueue, imageQueue, validationQueue, analysisQueue];

// Log queue initialization
logger.debug("Bull queues initialized");
