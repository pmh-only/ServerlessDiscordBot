# ServerlessDiscordBot
Simple Discord bot on [cloudflare workers](https://workers.cloudflare.com/)


https://user-images.githubusercontent.com/39158228/148331462-9f4f739f-d0d5-44ce-aec5-97d90b22ad0b.mp4

![image](https://user-images.githubusercontent.com/39158228/148331610-bb1e8741-ca23-488f-9bd3-8767dc73a1d6.png)


## Step-by-step guide
### 1. install cloudflare `wrangler`
```
npm install -g @cloudflare/wrangler
```
or
```
yarn global add @cloudflare/wrangler
```

### 2. login cloudflare `wrangler`
```
wrangler login
```

### 3. clone repository
```
git clone https://github.com/pmh-only/ServerlessDiscordBot.git
cd ServerlessDiscordBot
```

### 4. install dependancies
```
npm i
```
or
```
yarn
```

### 5. edit configuration file
edit `wrangler.toml`:
```toml
name = "YOUR_APP_NAME_HERE"
type = "javascript"
zone_id = ""
account_id = "YOUR_ACCOUNT_ID_HERE"
route = ""
workers_dev = true
compatibility_date = "2022-01-06"

[build]
command = "yarn && yarn build"
[build.upload]
format = "service-worker"
```

### 6. publish your worker
```
wrangler publish
```

### 7. get application's public key
![](https://cdn.discordapp.com/attachments/530043751901429762/931156961947418715/unknown.png)

### 8. get application's bot token
![](https://media.discordapp.net/attachments/530043751901429762/931157722685124668/unknown.png)

### 9. apply them
![](https://cdn.discordapp.com/attachments/530043751901429762/931158648380596264/unknown.png)

![](https://cdn.discordapp.com/attachments/530043751901429762/931159439296311336/unknown.png)

### 10. regist global application command
```
node -i <APP_ID> -t <BOT_TOKEN> ./utils/cmdctl.js create ping ping
```

### 11. done!
```
https://discord.com/api/oauth2/authorize?client_id=<APPLICATION_ID_HERE>&scope=applications.commands
```
