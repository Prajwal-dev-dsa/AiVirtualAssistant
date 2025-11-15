export const setCookie = (res, token) => {
  res.cookie("token", token, {
    httpOnly: true,
    secure: false,
    sameSite: "strict",
    maxAge: 15 * 24 * 60 * 60 * 1000,
  });
};