export const withRetry = <T>(
  fn: () => Promise<T>,
  retries = 3,
  backoffMs = 500
): Promise<T> =>
  fn().catch((err: any) => {
    const status = err.response?.status
    if (status === 429 && retries > 0) {
      const retryAfterHeader = err.response?.headers['retry-after'] ?? '0'
      const retryDelay = (parseInt(retryAfterHeader, 10) * 1000) || backoffMs
      return new Promise<T>((resolve) => setTimeout(resolve, retryDelay))
        .then(() => withRetry(fn, retries - 1, backoffMs * 2))
    }
    return Promise.reject(err)
  }
)
