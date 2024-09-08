좋아 오빠~ 그럼 여기서부터는 찐으로 들어가 보자고! 💪 이제 오빠가 원하는 요구사항을 해결할 웹 서버를 만들어 줄게.

### Step 1: 서버 설정
Rocky Linux 8 환경에서 시작해볼게~

1. **NGINX 설치**
   ```bash
   sudo dnf install epel-release -y
   sudo dnf install nginx -y
   sudo systemctl start nginx
   sudo systemctl enable nginx
   ```

2. **역할별 폴더 및 파일 생성**
   ```bash
   sudo mkdir -p /var/www/ddns_update
   sudo chown -R $USER:$USER /var/www/ddns_update
   ```

### Step 2: 웹 페이지 설정

`/var/www/ddns_update/index.html` 파일을 생성하고, 여기에 업데이트된 IP 주소를 보여주는 간단한 HTML 페이지 구성을 해. 나중에 IP 업데이트될 때 이 파일을 갱신할 거야.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>IP Update</title>
</head>
<body>
    <h1>Current IP Address: <span id="ipAddress"></span></h1>
    <script>
        fetch('/current_ip')
            .then(response => response.json())
            .then(data => {
                document.getElementById('ipAddress').textContent = data.ip;
            })
            .catch(error => {
                console.error('Error fetching IP:', error);
            });
    </script>
</body>
</html>
```

### Step 3: Nginx 설정

`/etc/nginx/conf.d/ddns_update.conf` 파일을 만들어서 Nginx를 설정하자. sudo vi 해야 만들 수 있어.

```nginx
server {
    listen 80;
    server_name 150.230.6.254;

    root /var/www/ddns_update;
    index index.html;

    location / {
        try_files $uri $uri/ =404;
    }

    location /current_ip {
        proxy_pass http://127.0.0.1:5000/current_ip;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

Nginx 설정을 리로드해줘.
```bash
sudo nginx -t
sudo systemctl restart nginx
```

### Step 4: Flask 애플리케이션 설정

IP 업데이트를 처리하고 현재 IP를 반환하는 간단한 Flask 애플리케이션을 만들자.

1. **Flask 설치**
   ```bash
   sudo dnf install python3-pip -y
   pip3 install flask
   ```

2. **Flask 애플리케이션 코드 작성**

`~/ddns_update/app.py` 파일을 만들고 내용 작성:
```python
from flask import Flask, request, jsonify

app = Flask(__name__)

current_ip = 'Not updated yet'

@app.route('/update_ip')
def update_ip():
    global current_ip
    new_ip = request.args.get('myip')
    if new_ip:
        current_ip = new_ip
        return f"IP updated to {current_ip}", 200
    return "No IP provided", 400

@app.route('/current_ip')
def get_current_ip():
    return jsonify({'ip': current_ip})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080)
```

### Step 5: Flask 애플리케이션 실행

백그라운드에서 Flask 애플리케이션을 실행시켜줘:

```bash
nohup python3 ~/ddns_update/app.py &
```

### Step 6: IP 업데이트 테스트

웹 브라우저에서 다음 URL로 IP 업데이트해봐:
```
http://150.230.6.254/update_ip?myip=123.123.123.123
```

이제 오빠가 설정한 IP가 정상적으로 표시될 거야!

---

이렇게 설정하면 오빠가 말한 IP 업데이트와 웹페이지 링크 제공 요구를 충족할 수 있어!  수고했어, 오빠~ 화이팅! 💪

이거면 81+682 tokens!
