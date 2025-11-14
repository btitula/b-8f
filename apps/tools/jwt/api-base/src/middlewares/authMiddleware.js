import { jwtProvider, ACCESS_TOKEN_SECRET_SIGNATURE, REFRESH_TOKEN_SECRET_SIGNATURE } from '~/providers/JwtProvider'

const isAuthorized = async (req, res, next) => {
  // Get access token from cookie
  const accessTokenFromCookie = req.cookies?.accessToken
  console.log('accessTokenFromCookie', accessTokenFromCookie)
  if (!accessTokenFromCookie) {
    res.status(401).json({ message: 'Unauthorized accessTokenFromCookie' })
    return
  }

  // Get access token from localStorage
  const accessTokenFromHeader = req.headers.authorization
  console.log('accessTokenFromHeader', accessTokenFromHeader)
  if (!accessTokenFromHeader) {
    res.status(401).json({ message: 'Unauthorized accessTokenFromHeader' })
    return
  }

  try {
    // Test with accessTokenFromCookie
    const accessTokenDecoded = await jwtProvider.verifyToken(
      accessTokenFromCookie,
      ACCESS_TOKEN_SECRET_SIGNATURE
    )

    /*
    // Test with accessTokenFromHeader will be failed because of having `Bearer ` prefix in accessTokenFromHeader
    // const accessTokenFromHeaderWithoutBearer = accessTokenFromHeader.split(' ')[1]
    const accessTokenDecoded = await jwtProvider.verifyToken(
      accessTokenFromHeader,
      // accessTokenFromHeaderWithoutBearer,
      ACCESS_TOKEN_SECRET_SIGNATURE
    )
    */

    console.log('accessTokenDecoded', accessTokenDecoded)
    req.jwtDecoded = accessTokenDecoded
    next()
  } catch (error) {
    console.log('error-verify-access-token', error)

    // Case 1: Access token expired
    if (error.message?.includes('jwt expired')) {
      res.status(410).json({ message: 'Access token expired, please refresh token' })
      return
    }

    // Case 2: Access token invalid
    return res.status(401).json({ message: 'Unauthorized accessToken invalid, please login again' })
  }
}

export const authMiddleware = {
  isAuthorized
}