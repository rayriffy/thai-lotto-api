module.exports = {
  target: 'serverless',
  async rewrites() {
    return [
      {
        source: '/',
        destination: '/api/hello',
      },
      {
        source: '/ping',
        destination: '/api/ping',
      },
      {
        source: '/latest',
        destination: '/api/v1/latest',
      },
      {
        source: '/lotto/:path*',
        destination: `/api/v1/lotto/:path*`,
      },
      {
        source: '/list/:path*',
        destination: `/api/v1/list/:path*`,
      },
    ]
  },
}