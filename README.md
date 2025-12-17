**1. Project Overview**

CashSwap is a simple money exchange platform where users can:

Login using OTP

Register their profile

Create money “Need Cash / Have Cash” requests

View and filter all public requests

**2. Architecture Overview**

<img width="2908" height="4088" alt="image" src="https://github.com/user-attachments/assets/a83fbb68-3b0c-464f-8d72-a61113fe3f5b" />

**3. Tech Stack**

| Layer         | Technology          |
| ------------- | ------------------- |
| Frontend      | React, Axios, NGINX |
| Backend       | Node.js, Express    |
| Auth          | OTP (Demo: 123456)  |
| API           | AWS Lambda          |
| DB            | DynamoDB            |
| Container     | Docker              |
| Orchestration | Kubernetes          |
| Autoscaling   | HPA (CPU-based)     |
| Monitoring    | Prometheus, Grafana |
| CI/CD         | GitHub Actions      |

**4. How to Deploy on Kubernetes**

Step 1: Create Kubernetes Cluster

Provision EC2 instances (1 Master, 1+ Worker)

Install Docker, kubeadm, kubelet, kubectl

Initialize cluster using kubeadm

Step 2: Deploy Backend
kubectl apply -f backend-deployment.yaml
kubectl apply -f backend-service.yaml


Backend exposed via:

http://<NODE-IP>:30080

Step 3: Deploy Frontend
kubectl apply -f frontend-deployment.yaml
kubectl apply -f frontend-service.yaml


Frontend exposed via:

http://<NODE-IP>:30081

Step 4: Verify Pods & Services
kubectl get pods
kubectl get svc

**5. CI/CD Workflow (GitHub Actions + Docker Hub)**

CI/CD Flow

Code pushed to main branch

GitHub Actions workflow triggers

Docker images built using --no-cache

Images pushed to Docker Hub

Kubernetes pulls latest images

Docker Images
Service	Image
Frontend	shaiksahil123/moneyswapfrontend:latest
Backend	shaiksahil123/moneyswapbackend:latest

**6. HPA + Load Testing**

Horizontal Pod Autoscaler (HPA)

HPA configured for Frontend

Scales pods based on CPU utilization

Automatically increases/decreases replicas

Example:

kubectl autoscale deployment frontend --cpu-percent=20 --min=1 --max=10

Load Testing

Load generated using BusyBox:

kubectl run loadgen --image=busybox --restart=Never -- \
sh -c "while true; do wget -q -O- http://frontend-service; done"

Observed Behavior:

CPU usage increases

HPA scales frontend pods

Pods scale down after load stops

**7. Monitoring Setup (Prometheus + Grafana)**

Tools Used

Prometheus (metrics collection)

Grafana (visualization)

Installed Using Helm

kube-prometheus-stack

Grafana exposed via NodePort

Access Grafana:

http://<NODE-IP>:32000

Metrics Monitored

Pod CPU usage

Pod memory usage

HPA scaling events

Node health

**8. Screenshots & Results**

Screenshots Included:

Kubernetes pods scaling up/down

HPA status

Grafana dashboards

Frontend UI

<img width="1920" height="888" alt="image" src="https://github.com/user-attachments/assets/2a227671-7a1e-47bf-b1aa-8f5eedf0a72c" />


GitHub Actions pipeline success

Docker Hub images

Results:

Successful autoscaling

Zero downtime during load

Metrics visible in Grafana
