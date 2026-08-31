/**
 * Sync Worker - Manages offline data synchronization for ASHA workers
 * Handles queuing, validation, and syncing of triage assessments and updates
 */

/**
 * Process sync queue and upload to server
 * @param {Array} syncQueue - Array of offline actions to sync
 * @returns {Object} Sync result with success/failure status
 */
export async function processSyncQueue(syncQueue) {
  if (!syncQueue || syncQueue.length === 0) {
    return { success: true, synced: [], failed: [], duration: 0 };
  }

  const startTime = Date.now();
  const synced = [];
  const failed = [];

  for (const item of syncQueue) {
    try {
      const result = await syncItem(item);
      if (result.success) {
        synced.push({ ...item, syncedAt: new Date().toISOString() });
      } else {
        failed.push({ ...item, error: result.error });
      }
    } catch (error) {
      failed.push({ ...item, error: error.message });
    }
  }

  const duration = Date.now() - startTime;

  return {
    success: failed.length === 0,
    synced,
    failed,
    totalItems: syncQueue.length,
    syncedCount: synced.length,
    failedCount: failed.length,
    duration,
  };
}

/**
 * Sync a single item
 * @param {Object} item - Item to sync
 * @returns {Object} Success/failure result
 */
async function syncItem(item) {
  // Simulate API call
  return new Promise((resolve) => {
    // 90% success rate for demo
    const success = Math.random() > 0.1;

    setTimeout(() => {
      if (success) {
        resolve({ success: true, data: item });
      } else {
        resolve({ success: false, error: 'Network error - will retry later' });
      }
    }, Math.random() * 1000); // Random 0-1s delay
  });
}

/**
 * Validate sync item before syncing
 * @param {Object} item - Item to validate
 * @returns {Object} Validation result
 */
export function validateSyncItem(item) {
  const errors = [];

  if (!item.type) {
    errors.push('Item type is required');
  }

  if (!item.data) {
    errors.push('Item data is required');
  }

  if (!item.timestamp) {
    errors.push('Item timestamp is required');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Compress sync data for better bandwidth usage
 * @param {Object} item - Item to compress
 * @returns {Object} Compressed item
 */
export function compressSyncData(item) {
  // In a real implementation, this would use compression algorithms
  // For now, we'll just extract essential fields
  return {
    t: item.type, // type
    d: item.data, // data
    ts: item.timestamp,
    id: item.id,
  };
}

/**
 * Decompress sync data
 * @param {Object} compressed - Compressed item
 * @returns {Object} Decompressed item
 */
export function decompressSyncData(compressed) {
  return {
    type: compressed.t,
    data: compressed.d,
    timestamp: compressed.ts,
    id: compressed.id,
  };
}

/**
 * Get sync queue size in bytes
 * @param {Array} syncQueue - Queue to measure
 * @returns {number} Size in bytes
 */
export function getSyncQueueSize(syncQueue) {
  const json = JSON.stringify(syncQueue);
  return new Blob([json]).size;
}

/**
 * Estimate sync time based on item count and file sizes
 * Assumes ~500kb per item
 * @param {Array} syncQueue - Queue to estimate
 * @param {number} bandwidth - Bandwidth in kbps (default: 512 for rural areas)
 * @returns {number} Estimated time in seconds
 */
export function estimateSyncTime(syncQueue, bandwidth = 512) {
  const totalSize = getSyncQueueSize(syncQueue); // in bytes
  const totalKb = totalSize / 1024;
  const estimatedSeconds = (totalKb / bandwidth) * 8; // 8 bits per byte
  return Math.round(estimatedSeconds);
}

/**
 * Create sync batch for lower bandwidth transmission
 * Splits sync queue into smaller batches
 * @param {Array} syncQueue - Queue to batch
 * @param {number} batchSize - Items per batch (default: 5)
 * @returns {Array} Array of batches
 */
export function createSyncBatches(syncQueue, batchSize = 5) {
  const batches = [];
  for (let i = 0; i < syncQueue.length; i += batchSize) {
    batches.push(syncQueue.slice(i, i + batchSize));
  }
  return batches;
}

/**
 * Prioritize sync queue based on item type and age
 * Critical items (triage assessments) are synced first
 * Older items are prioritized over newer ones
 * @param {Array} syncQueue - Queue to prioritize
 * @returns {Array} Prioritized queue
 */
export function prioritizeSyncQueue(syncQueue) {
  const priorityMap = {
    'TRIAGE_ASSESSMENT': 100,
    'VITALS_UPDATE': 75,
    'PHOTO_UPLOAD': 50,
    'AUDIO_NOTE': 40,
    'GENERIC': 10,
  };

  return [...syncQueue].sort((a, b) => {
    const aPriority = priorityMap[a.type] || 0;
    const bPriority = priorityMap[b.type] || 0;

    if (aPriority !== bPriority) {
      return bPriority - aPriority; // Higher priority first
    }

    // Same priority: older items first
    return a.timestamp - b.timestamp;
  });
}

/**
 * Retry failed sync items
 * @param {Array} failedItems - Items that failed
 * @returns {Object} Retry result
 */
export async function retrySyncItems(failedItems) {
  if (!failedItems || failedItems.length === 0) {
    return { success: true, retried: [], stillFailed: [] };
  }

  const retried = [];
  const stillFailed = [];

  for (const item of failedItems) {
    try {
      const result = await syncItem(item);
      if (result.success) {
        retried.push(item);
      } else {
        stillFailed.push(item);
      }
    } catch (error) {
      stillFailed.push(item);
    }
  }

  return {
    success: stillFailed.length === 0,
    retried,
    stillFailed,
    retriedCount: retried.length,
    failedCount: stillFailed.length,
  };
}

/**
 * Clean up sync queue - remove old successfully synced items
 * @param {Array} syncQueue - Queue to clean
 * @param {number} maxAgeDays - Max age in days (default: 7)
 * @returns {Array} Cleaned queue
 */
export function cleanupSyncQueue(syncQueue, maxAgeDays = 7) {
  const cutoffTime = Date.now() - (maxAgeDays * 24 * 60 * 60 * 1000);
  return syncQueue.filter(item => item.timestamp > cutoffTime);
}

export default {
  processSyncQueue,
  validateSyncItem,
  compressSyncData,
  decompressSyncData,
  getSyncQueueSize,
  estimateSyncTime,
  createSyncBatches,
  prioritizeSyncQueue,
  retrySyncItems,
  cleanupSyncQueue,
};
