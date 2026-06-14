# Stile login via QLD Education SSO

Stile at The Gap State High School uses QLD Department of Education single
sign-on (SSO). The login flow involves three redirects and takes ~15 seconds
end-to-end.

## Credentials

Stored in 1Password (vault: "Lem", item: "Department of Education and Training"):

- **Username:** `tgrim43` (field: `pf.username`)
- **Password:** `FalconEagle2188` (field: `pf.pass`)
- **School email:** `tgrim43@eq.edu.au`

The school email is the standard QLD Education format: `username@eq.edu.au`.

## Login flow

### Step 1: Stile login page

```
agent-browser open https://stileapp.com/login --session-name stile
agent-browser snapshot -i
agent-browser fill @e2 "tgrim43@eq.edu.au"
agent-browser click @e3
```

The `@e2` textbox is "Your school email address". The `@e3` button is "Continue".

Stile detects the `@eq.edu.au` domain and redirects to the QLD Education
identity provider.

### Step 2: QLD Education SSO

After redirect to `fed.education.qld.gov.au`:

```
agent-browser snapshot -i
agent-browser fill @e1 "tgrim43"
agent-browser fill @e2 "FalconEagle2188"
agent-browser check @e3   # "I accept the conditions of use"
agent-browser click @e4   # "Sign in"
```

The `@e1` textbox is "Enter your QED identity username".
The `@e2` textbox is "Enter your QED identity password".
The `@e3` checkbox must be checked or sign-in will fail.
The `@e4` button is "Sign in".

### Step 3: Microsoft "Stay signed in?"

After successful QLD Education authentication, Microsoft prompts:

```
agent-browser snapshot -i
agent-browser click @e3   # "Yes"
```

The prompt shows "Stay signed in?" with Yes/No buttons. Click Yes to proceed.
Clicking No may cause the session to not persist correctly.

### Step 4: Stile dashboard

After the Microsoft prompt, the browser redirects back to Stile. The user
lands on the dashboard at `https://stileapp.com/TGSHS-QLD-1683`.

```
agent-browser get url
# → https://stileapp.com/TGSHS-QLD-1683
agent-browser snapshot -i -d 4
```

The snapshot shows the list of enrolled subjects. Each subject is a link.

## Common issues

### Wrong redirect after email entry

Occasionally Stile redirects to `login.microsoftonline.com` instead of the
QLD Education SSO page. The Microsoft page shows "Enter your email, phone,
or Skype." — this is a dead end for QLD Education accounts. Go back to
`stileapp.com/login` and retry. This seems to happen when the browser has
cached Microsoft session state from a previous login.

### "Resource temporarily unavailable"

The agent-browser daemon can become unresponsive after rapid navigation or
during network-heavy operations. Wait 2-3 seconds and retry. If persistent,
close the browser (`agent-browser close`) and restart the login flow.

### Session expiry

The SSO session expires when the browser is closed. Each new agent-browser
session requires a full re-login. The `--session-name stile` flag preserves
session state within a single agent-browser process but does not survive
`agent-browser close`.

### Ref volatility

agent-browser `@ref` identifiers change after every navigation and DOM update.
The refs documented above (e.g. `@e2` for the email textbox) are valid on a
fresh login page but will differ after redirects. Always take a fresh snapshot
before interacting.

To find the current ref for a known element:

```bash
agent-browser snapshot -i -d 3 | grep "Next session"
# → - link "Next session" [ref=e7]
agent-browser click @e7
```

### SSO page variation

The QLD Education SSO page sometimes varies its layout. The three fields
(username, password, checkbox) are consistently `@e1`, `@e2`, `@e3` with
the sign-in button at `@e4` on the standard page. If the snapshot shows a
different structure, take a new snapshot and identify the fields by their
label text.
