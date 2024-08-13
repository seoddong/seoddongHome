# Rocky linux 환경 초기 설치
  - https://www.librechat.ai/docs/remote/docker_linux
  ```shell
  sudo dnf update
  sudo dnf install -y ca-certificates curl gnupg2 lsb-release
  sudo curl -fsSL https://download.docker.com/linux/centos/gpg | sudo gpg2 --dearmor -o /etc/pki/rpm-gpg/docker-ce.gpg
  ```
  - 아래 명령은 한 번에 입력한다.
  ```
  echo '[docker-ce-stable]
  name=Docker CE Stable - $basearch
  baseurl=https://download.docker.com/linux/centos/7/\$basearch/stable
  enabled=1
  gpgcheck=1
  gpgkey=file:///etc/pki/rpm-gpg/docker-ce.gpg' | sudo tee /etc/yum.repos.d/docker-ce.repo
  ```
  - ㅇ


# Linux - docker Update
  - npm 명령 부분으로 update하자.
  - docker 명령 직접 실행은 windows에서는 가능했으나 linux docker에서는 제대로 되지 않음

