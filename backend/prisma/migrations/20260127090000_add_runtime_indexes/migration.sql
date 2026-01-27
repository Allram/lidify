-- Add runtime query indexes

-- DownloadJob cleanup (status + completedAt)
CREATE INDEX IF NOT EXISTS "DownloadJob_status_completedAt_idx"
ON "DownloadJob" ("status", "completedAt");

-- Discovery weekly album queries
CREATE INDEX IF NOT EXISTS "DiscoveryAlbum_userId_weekStartDate_status_idx"
ON "DiscoveryAlbum" ("userId", "weekStartDate", "status");

-- Plays by user and track (play count lookups)
CREATE INDEX IF NOT EXISTS "Play_userId_trackId_idx"
ON "Play" ("userId", "trackId");

-- Unavailable albums ordered by original album and attempt number
CREATE INDEX IF NOT EXISTS "UnavailableAlbum_userId_weekStartDate_originalAlbumId_attemptNumber_idx"
ON "UnavailableAlbum" ("userId", "weekStartDate", "originalAlbumId", "attemptNumber");

-- Active discovery batch lookup by user + status
CREATE INDEX IF NOT EXISTS "DiscoveryBatch_userId_status_createdAt_idx"
ON "DiscoveryBatch" ("userId", "status", "createdAt");
