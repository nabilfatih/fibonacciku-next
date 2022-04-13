import cookie from "cookie";

const MAX_AGE = 3 * 24 * 60 * 60;

export const setTokenCookie = (token, res) => {
  const setTokenCookie = cookie.serialize("token", token, {
    httpOnly: true,
    maxAge: MAX_AGE,
    expires: new Date(Date.now() + MAX_AGE * 1000),
    secure: process.env.NODE_ENV === "production",
    path: "/",
  });
  res.setHeader("Set-Cookie", setTokenCookie);
};

export const removeTokenCookie = (res) => {
  const val = cookie.serialize("token", "", {
    maxAge: -1,
    path: "/",
  });

  res.setHeader("Set-Cookie", val);
};
