import JWT from 'jsonwebtoken'

const generateToken = async (userInfo, secretSignature, tokenLife) => {
  try {
    return JWT.sign(
      userInfo,
      secretSignature,
      {
        algorithm: 'HS256',
        expiresIn: tokenLife
      }
    )
  } catch (error) {
    throw new Error(error)
  }
}

const verifyToken = async (token, secretSignature) => {
  try {
    return JWT.verify(
      token,
      secretSignature
    )
  } catch (error) {
    throw new Error(error)
  }
}

export const ACCESS_TOKEN_SECRET_SIGNATURE = 'sample-access-token-secret' // pragma: allowlist secret
export const REFRESH_TOKEN_SECRET_SIGNATURE = 'sample-refresh-token-secret' // pragma: allowlist secret

export const jwtProvider = {
  generateToken,
  verifyToken
}
