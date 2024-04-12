import 'server-only'

import { connect as connectToTiDB } from '@tidbcloud/serverless'
import mysql, { Pool } from 'mysql2/promise'

export const config = {
  url: process.env.DATABASE_URL,
}

/** @deprecated @tidbcloud/serverless connect 대신 pool 사용 */
export function connect() {
  return connectToTiDB(config)
}

/**
 * connection pool
 * - Connect to TiDB [https://docs.pingcap.com/tidbcloud/dev-guide-sample-application-nextjs#connect-to-tidb] 참고
 */

let pool: Pool | null = null

export function createPool(): Pool {
  return mysql.createPool({
    uri: config.url,
    ssl: {
      minVersion: 'TLSv1.2',
      rejectUnauthorized: true,
    },
    connectionLimit: 1, // Setting connectionLimit to "1" in a serverless function environment optimizes resource usage, reduces costs, ensures connection stability, and enables seamless scalability.
    maxIdle: 1, // max idle connections, the default value is the same as `connectionLimit`
    enableKeepAlive: true,
  })
}

export function getPool() {
  if (!pool) {
    pool = createPool()
  }
  return pool
}
