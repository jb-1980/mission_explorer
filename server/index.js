require("dotenv").config()
const express = require("express")
const cookieParser = require("cookie-parser")
const path = require("path")
const jwt = require("jsonwebtoken")
const logger = require("morgan")
const { KhanOauth } = require("khan-api-wrapper")
const apiRoutes = require("./api-routes")

const app = express()

app.use(express.static(path.resolve(__dirname, "../build")))
app.use(cookieParser())
app.set("views", path.join(__dirname, "views"))
app.set("view engine", "pug")

logger.token("body", req => JSON.stringify(req.body, null, 2))
const loggerFormat =
  process.env.NODE_ENV === "production"
    ? "short"
    : ":date[iso] :method :url :status :response-time :body"
app.use(logger(loggerFormat))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

const kauth = new KhanOauth(
  process.env.KHAN_CONSUMER_KEY,
  process.env.KHAN_CONSUMER_SECRET
)

app.get("/login", (req, res) => {
  // Note that this callbackUrl corresponds to a route that will be defined
  // later, and that will handle setting the fresh tokens into the session

  const callBackUrl = `${req.protocol}://${req.get("host")}/authenticate_khan`
  kauth.authorize(res, callBackUrl)
})

app.get("/authenticate_khan", async (req, res) => {
  // This is the route that Khan Academy will return to after the user
  // has given permission in the browser. It is the callbackUrl defined in the
  // login route.
  const { oauth_token_secret, oauth_verifier, oauth_token } = req.query

  const [token, secret] = await kauth.getAccessTokens(
    oauth_token,
    oauth_token_secret,
    oauth_verifier
  )

  const tokens = jwt.sign({ token, secret }, process.env.JWT_SECRET, {
    expiresIn: 1209600, // two weeks
  })

  res.cookie("tokens", tokens, { maxAge: 120960000 })
  res.redirect("/")
})

app.use("/api", apiRoutes)

if (process.env.NODE_ENV === "production") {
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../build/index.html"))
  })
}

const port = process.env.PORT || 4000
app.set("port", port)
app.listen(port, () => console.log(`🚀  Server ready at ${port}`))
