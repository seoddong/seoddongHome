pipeline {
    agent any

    environment {
        NODEJS_HOME = "/usr/bin"
        PATH = "$NODEJS_HOME:$PATH"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Deploy') {
            steps {
                script {
                    // 호스트 서버 정보와 도커 컨테이너 경로
                    def host = 'root@seoddong-web'
                    def containerName = 'webserver'
                    def deployDir = '/usr/share/nginx/html'

                    // 빌드된 파일을 호스트 서버로 복사
                    sh """
                    scp -r ${WORKSPACE}/build/* ${host}:/tmp/deployment/
                    """

                    // 호스트 서버에서 도커 컨테이너 내로 파일 복사
                    sh """
                    ssh ${host} "docker cp /tmp/deployment/. ${containerName}:${deployDir}"
                    """
                }
            }
        }
    }

    post {
        always {
            cleanWs()
        }
    }
}
