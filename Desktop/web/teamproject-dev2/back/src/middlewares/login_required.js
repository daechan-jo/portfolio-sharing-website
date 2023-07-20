import jwt from "jsonwebtoken";
import logger from "../utils/logger";

function login_required(req, res, next) {
	const userToken = req.headers["authorization"]?.split(" ")[1] ?? "null";
	try {
		if (userToken === "null") {
			console.log(
				"서비스 사용 요청이 있습니다.하지만, Authorization 토큰: 없음",
			);
			logger.error(`login fail: empty token`);
			res.status(400).send(
				"로그인한 유저만 사용할 수 있는 서비스입니다.",
			);
		}

		const secretKey = process.env.JWT_SECRET_KEY || "secret-key";
		const jwtDecoded = jwt.verify(userToken, secretKey);
		const user_id = jwtDecoded.user_id;

		logger.info(`JWT token validation success userid: ${user_id}`);
		req.currentUserId = user_id;
		next();
	} catch (error) {
		res.status(400).send(
			"정상적인 토큰이 아닙니다. 다시 한 번 확인해 주세요.",
		);
		error.message = "broken token";
		next(error);
	}
}

export { login_required };