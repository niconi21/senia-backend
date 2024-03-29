// Function to validate that the message returned from SonarQube is ok
def qualityGateValidation(qg) {
  if (qg.status != 'OK') {
    // emailext body: "WARNING SANTI: Code coverage is lower than 80% in Pipeline ${BUILD_NUMBER}", subject: 'Error Sonar Scan,   Quality Gate', to: "${EMAIL_ADDRESS}"
    return true
  }
  // emailext body: "CONGRATS SANTI: Code coverage is higher than 80%  in Pipeline ${BUILD_NUMBER} - SUCCESS", subject: 'Info - Correct Pipeline', to: "${EMAIL_ADDRESS}"
  return false
}
pipeline {
  agent any

  tools {
      nodejs 'nodejs_16'
  }

  environment {
      // General Variables for Pipeline
      PROJECT_ROOT = '.'
      EMAIL_ADDRESS = 'morenodurann@gmail.com'
      REGISTRY = 'san99tiago/docker-pirate-express'
  }

  stages {
      
      stage('Checkout') {
        steps {
        // Get Github repo using Github credentials (previously added to Jenkins credentials)
        checkout([$class: 'GitSCM', branches: [[name: '*/master']], extensions: [], userRemoteConfigs: [[url: 'https://github.com/niconi21/senia-backend']]])        }
      }
      stage('Install dependencies') {
        steps {
          sh 'npm --version'
          sh "cd ${PROJECT_ROOT}; npm install"
        }
      }
      
  stage('scan') {
      environment {
        // Previously defined in the Jenkins "Global Tool Configuration"
        scannerHome = tool 'sonar-scanner'
      }
      steps {
        // "sonarqube" is the server configured in "Configure System"
        withSonarQubeEnv('sonarqube') {
          // Execute the SonarQube scanner with desired flags
          sh "${scannerHome}/bin/sonar-scanner \
                      -Dsonar.projectKey=seniaExample:Test \
                      -Dsonar.projectName=seniaExample \
                      -Dsonar.projectVersion=0.0.${BUILD_NUMBER} \
                      -Dsonar.host.url=http://192.168.31.242:9000 \
                      -Dsonar.sources=./index.ts,./src/configs/app.config.ts \
                      -Dsonar.login=jenkins \
                      -Dsonar.password=nodeisjs \
                      -Dsonar.javascript.lcov.reportPaths=./${PROJECT_ROOT}/coverage/lcov.info"
        }
        timeout(time: 3, unit: 'MINUTES') {
          // In case of SonarQube failure or direct timeout exceed, stop Pipeline
          waitForQualityGate abortPipeline: qualityGateValidation(waitForQualityGate())
        }
      }
  }
  }
  post {
    always {
      discordSend description: "**Commit** ${GIT_COMMIT}\n**Status**: ${currentBuild.currentResult}\n**Duration**: ${currentBuild.durationString}", footer: "By: ${env.BUILD_USER}\nEmail: ${EMAIL_ADDRESS}\nTimestamp: ${BUILD_TIMESTAMP}", link: env.BUILD_URL, result: currentBuild.currentResult, title: "Job: ${JOB_NAME} ${BUILD_DISPLAY_NAME}", webhookURL: env.WEBHOOK_URL
    }
  }
}
