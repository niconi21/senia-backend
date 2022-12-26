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
      stage('Hello') {
        steps {
          // First stage is a sample hello-world step to verify correct Jenkins Pipeline
          echo 'Hello World, I am Happy'
          echo 'This is my amazing Pipeline'
        }
      }
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
      stage("Discord webhook"){
        steps{
          echo "WEBHOOK URL: "
          echo env.WEBHOOK_URL
        }
      }
      // stage('scan') {
      //     environment {
      //       // Previously defined in the Jenkins "Global Tool Configuration"
      //       scannerHome = tool 'sonar-scanner'
      //     }
      //     steps {
      //       // "sonarqube" is the server configured in "Configure System"
      //       withSonarQubeEnv('sonarqube') {
      //         // Execute the SonarQube scanner with desired flags
      //         sh "${scannerHome}/bin/sonar-scanner \
      //                     -Dsonar.projectKey=seniaExample:Test \
      //                     -Dsonar.projectName=seniaExample \
      //                     -Dsonar.projectVersion=0.0.${BUILD_NUMBER} \
      //                     -Dsonar.host.url=http://sonarqube:9000 \
      //                     -Dsonar.sources=./index.ts,./src/configs/app.config.ts \
      //                     -Dsonar.login=admin \
      //                     -Dsonar.password=nodeisjs \
      //                     -Dsonar.javascript.lcov.reportPaths=./${PROJECT_ROOT}/coverage/lcov.info"
      //       }
      //       timeout(time: 3, unit: 'MINUTES') {
      //         // In case of SonarQube failure or direct timeout exceed, stop Pipeline
      //         waitForQualityGate abortPipeline: qualityGateValidation(waitForQualityGate())
      //       }
      //     }
      // }
  }

  post {
    always {
         discordSend description: "Jenkins Pipeline Build", footer: "Footer Text", link: env.BUILD_URL, result: currentBuild.currentResult, title: JOB_NAME, webhookURL: env.WEBHOOK_URL
    }
  }
}