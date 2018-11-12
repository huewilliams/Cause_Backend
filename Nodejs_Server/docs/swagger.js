/**
 * @swagger
 * swagger : "2.0"
 * info:
 * description: "This is Cause Server API docs. You can see this project at https://github.com/huewilliams/Cause_Backend."
 * version: "1.0.0"
 * title: "Cause API"
 * contact:
 * email: "4879sinwoo@naver.com"
 * host: 13.125.6.4:9000
 * basePath: "/"
 * tags:
 * - name: "account"
 *   description: "manage user info"
 * - name: "main"
 *   description: "control function of main page"
 * - name: "funding"
 *   description: "manage funding posts"
 * schemes:
 * - "http"
 * paths:
 *   /account/signup:
 *     post:
 *       tags:
 *        - "account"
 *       summary: "signup new user"
 *       description: "make new user and store data on MySQL server."
 *       produces:
 *        - "application/json"
 *       parameters:
 *        - in: "body"
 *          name: "body"
 *          description: "make new user data"
 *          required: true
 *       responses:
 *         201:
 *           description: "successful join"
 *         405:
 *           description: "invalid request"
 *
 */