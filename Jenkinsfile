pipeline {
    agent any

    stages {

        stage('Clone Repo') {
            steps {
                echo 'Cloning repository...'
                checkout scm
            }
        }

        stage('Build Frontend') {
            steps {
                echo 'Building frontend Docker image...'
                sh 'docker build -t ecommerce-frontend ./frontend'
            }
        }

        stage('Build Backend') {
            steps {
                echo 'Building backend Docker image...'
                sh 'docker build -t ecommerce-backend ./backend'
            }
        }

        stage('Deploy') {
            steps {
                echo 'Removing conflicting containers...'
                sh 'docker rm -f mongo backend frontend || true'
                echo 'Starting all containers...'
                sh 'docker-compose up -d'
            }
        }
    }

    post {
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}