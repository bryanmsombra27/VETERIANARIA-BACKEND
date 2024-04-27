export const generateTokenAndCookie = async (res, findUser) => {
  try {
    const token = await jwt.sign(
      { id: findUser._id },
      process.env.JWT_WEB_TOKEN_KEY,
      {
        expiresIn: "30d",
      }
    );
    //SET JWT AS COOKIE ON SERVER
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production" ? true : false,
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000, //30d
    });
  } catch (error) {
    console.log(error, "ERORR GENERANDO TOKEN");
    throw new Error(error.message);
  }
};
