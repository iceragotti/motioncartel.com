import express from 'express';
import session from 'express-session';
import { Issuer, generators } from 'openid-client';

const app = express();

// Session-Konfiguration für State-Management
app.use(session({
  secret: 'dein-super-geheimes-zufallswort',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Auf 'true' setzen, wenn du HTTPS nutzt
}));

// Hier musst du die Konfiguration deines Identity-Providers einfügen
// Für ID Austria / OIDC-Anbieter:
const setupClient = async () => {
  const issuer = await Issuer.discover('https://dein-oidc-provider.com'); // Die Discovery-URL deines Anbieters
  return new issuer.Client({
    client_id: 'DEINE_CLIENT_ID',
    client_secret: 'DEIN_CLIENT_SECRET',
    redirect_uris: ['http://localhost:3000/auth/callback'],
    response_types: ['code'],
  });
};

let client;
setupClient().then(c => client = c);

// 1. Route: Startet den Login-Prozess
app.get('/auth/login', (req, res) => {
  if (!client) {
    return res.status(503).send("Server initialisiert noch. Bitte in 5 Sekunden erneut versuchen.");
  }
  
  const state = generators.state();
  req.session.state = state;

  const authUrl = client.authorizationUrl({
    scope: 'openid profile email',
    state: state,
  });

  res.redirect(authUrl);
});

// 2. Route: Callback nach dem Login (dein bestehender Teil)
app.get('/auth/callback', async (req, res) => {
  try {
    const params = client.callbackParams(req);
    
    const tokenSet = await client.callback(
      'http://localhost:3000/auth/callback',
      params,
      { state: req.session.state }
    );

    console.log("Erfolgreich eingeloggt. User-Daten:", tokenSet.claims());

    // Redirect zurück in die App mit dem Token
    // 'social-beta' ist dein in app.json definiertes Scheme
    const token = tokenSet.access_token;
    res.redirect(`social-beta://login-success?token=${token}`);

  } catch (err) {
    console.error("Login Fehler:", err);
    res.status(400).send("Login fehlgeschlagen: " + err.message);
  }
});

// Server starten
app.listen(3000, () => {
  console.log("Server läuft auf http://localhost:3000");
});