pipeline {
    agent any
    tools {
        gradle 'gradle'
        nodejs 'node'
        git 'git'   
    }

    stages {
        stage('Checkout Back') {
            steps {
                checkout scmGit(
                    branches: [[name: '*/master']],
                    extensions: [],
                    userRemoteConfigs: [[url: 'https://github.com/DieguinFC/TingesoProyecto1']]
                )
            }
        }

        stage('Build Back') {
            steps {
                script {
                    bat './gradlew clean build' 
                }
            }
        }

        stage('Unit Tests Back') {
            steps {
                script {
                    bat './gradlew test' 
                }
            }
        }

        stage('Build Docker Image for Backend') {
            steps {
                script {
                    bat 'docker build -t shezy1/backimage:latest .'
                }
            }
        }

        stage('Push Docker Image for Backend') {
            steps {
                script {
                    withCredentials([string(credentialsId: 'goodance1', variable: 'DOCKERHUB_PASS')]) {
                        bat 'docker login -u shezy1 -p %DOCKERHUB_PASS%'
                    }
                    bat 'docker push shezy1/backimage:latest'
                }
            }
        }

        stage('Checkout Front') {
            steps {
                checkout scmGit(
                    branches: [[name: '*/master']],
                    extensions: [],
                    userRemoteConfigs: [[url: 'https://github.com/DieguinFC/TingesoProyecto1']]
                )
            }
        }

        stage('Build Front') {
            steps {
                script {
                    // Asegúrate de que el contenedor tenga las dependencias necesarias para el frontend
                    bat 'npm install' // Usar 'npm install' para instalar dependencias (si estás usando npm)
                    bat 'npm run build' // Ejecuta el build del frontend, cambia si tu script se llama diferente
                }
            }
        }

        stage('Build Docker Image for Frontend') {
            steps {
                script {
                    // Construye la imagen de Docker para el frontend
                    bat 'docker build -t shezy1/frontimage:latest .'
                }
            }
        }

        stage('Push Docker Image for Frontend') {
            steps {
                script {
                    withCredentials([string(credentialsId: 'goodance1', variable: 'DOCKERHUB_PASS')]) {
                        // Inicia sesión en Docker Hub
                        bat 'docker login -u shezy1 -p %DOCKERHUB_PASS%'
                    }
                    // Publica la imagen en Docker Hub
                    bat 'docker push shezy1/frontimage:latest'
                }
            }
        }
    }

    triggers {
        // Activa la construcción automáticamente en cada push al repositorio
        githubPush()
    }
}
