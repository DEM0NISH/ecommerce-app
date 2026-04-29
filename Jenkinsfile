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
                bat 'docker build -t ecommerce-frontend ./frontend'
            }
        }

        stage('Build Backend') {
            steps {
                echo 'Building backend Docker image...'
                bat 'docker build -t ecommerce-backend ./backend'
            }
        }

        stage('Deploy') {
            steps {
                echo 'Starting all containers...'
                bat 'docker-compose up -d'
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