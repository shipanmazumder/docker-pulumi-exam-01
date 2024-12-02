"use strict";
const pulumi = require("@pulumi/pulumi");
const aws = require("@pulumi/aws");
const fs = require("fs");

// Create a VPC
const vpc = new aws.ec2.Vpc("my-vpc", {
    cidrBlock: "10.0.0.0/16",
    enableDnsHostnames: true,
    enableDnsSupport: true,
    tags: {
        Name: "my-vpc",
    },
});

// Create an Internet Gateway
const internetGateway = new aws.ec2.InternetGateway("my-igw", {
    vpcId: vpc.id,
    tags: {
        Name: "my-igw",
    },
});

// Create Public Subnets in two Availability Zones
const publicSubnet1 = new aws.ec2.Subnet("public-subnet-1", {
    vpcId: vpc.id,
    cidrBlock: "10.0.1.0/24",
    availabilityZone: "ap-southeast-1a",
    mapPublicIpOnLaunch: true,
    tags: {
        Name: "public-subnet-1",
    },
});

const publicSubnet2 = new aws.ec2.Subnet("public-subnet-2", {
    vpcId: vpc.id,
    cidrBlock: "10.0.2.0/24",
    availabilityZone: "ap-southeast-1b",
    mapPublicIpOnLaunch: true,
    tags: {
        Name: "public-subnet-2",
    },
});

// Create a Route Table
const routeTable = new aws.ec2.RouteTable("public-rt", {
    vpcId: vpc.id,
    routes: [
        {
            cidrBlock: "0.0.0.0/0",
            gatewayId: internetGateway.id,
        },
    ],
    tags: {
        Name: "public-rt",
    },
});

// Associate the Route Table with Public Subnets
const routeTableAssociation1 = new aws.ec2.RouteTableAssociation("public-rta-1", {
    subnetId: publicSubnet1.id,
    routeTableId: routeTable.id,
});

const routeTableAssociation2 = new aws.ec2.RouteTableAssociation("public-rta-2", {
    subnetId: publicSubnet2.id,
    routeTableId: routeTable.id,
});

// Update Security Group configuration with additional ports
const securityGroup = new aws.ec2.SecurityGroup("web-sg", {
    description: "Allow inbound HTTP, HTTPS and custom application ports",
    vpcId: vpc.id,
    ingress: [
        {
            protocol: "tcp",
            fromPort: 80,
            toPort: 80,
            cidrBlocks: ["0.0.0.0/0"],
        },
        {
            protocol: "tcp",
            fromPort: 3000,
            toPort: 3000,
            cidrBlocks: ["0.0.0.0/0"],
        },
        {
            protocol: "tcp",
            fromPort: 4000,
            toPort: 4000,
            cidrBlocks: ["0.0.0.0/0"],
        },
        {
            protocol: "tcp",
            fromPort: 22,
            toPort: 22,
            cidrBlocks: ["0.0.0.0/0"],
        }
    ],
    egress: [{
        protocol: "-1",
        fromPort: 0,
        toPort: 0,
        cidrBlocks: ["0.0.0.0/0"],
    }],
    tags: {
        Name: "web-sg",
    },
});

// Create a key pair
const keyPair = new aws.ec2.KeyPair("my-key-pair", {
    publicKey: "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAACAQDUMyMEy2VKqS46kRC7cpRfJABAcm3y34N1p44b1byjstfP133uFmDUtafaJ5FCV8Ag65BIRD2EkrdHrdmg9Ky6k/GwTLXIPaoV82nWYi69toQylHwoOHkeOb40bHIgpLY8rIlwXpDAehG4EylsnqQPOh1WDHgr2arkdJcvDMmr3CGtWJiM06fe8U1retyNfrC1t7Co2Yrobra5Mdw0TkMDGLxCDAqzOnjohVzRlcTnPchIjaDtoemj2vmqZkx+6zjpFNhqK5/5qIgAVunihbLWqPm4Wkl7wrotv/wTu8eSQ7mKPmdjzeZa1FD2rPtlgQcUs1zgNo2M8mfUz8Y+O+OrwLp6Ny1wvRHsQl2mHa6NA7kOw4ALkf+rvIh11ERdmBuol3DRnQ6atyJ/c32AkU4rAcjNul0cRX2QScQn6eUeXmqo/b+W1hmcxTIQ8uj1BeTiEfnD4nP4WQO7inySjoGb/LXXAkxZlInHF7SWs27hOhqiMFahI5duQOLBM01d1bUbcKF8tUizYZb46d8kWD9dlq63UeBzeITXzfKtweowQz9QGpWJuetFWmyY2gHZe+kroNY0EnTOxC9oovnARnJD1nOo/Vaskgo8Oxyc/lAVpY9CLj5bARYTw561/CbTJnTVRUsSGOC3HI1hiiJUVnAexaHVGtWMEUxNMqhh7K4p1w== shipanmazumder@gmail.com", // Replace with your public key
});

// Create EC2 Instances
const createEC2Instance = (name, subnet) => {
    return new aws.ec2.Instance(name, {
        instanceType: "t2.micro",
        ami: "ami-047126e50991d067b",  // Change with your AMI ID
        subnetId: subnet.id,
        associatePublicIpAddress: true,
        vpcSecurityGroupIds: [securityGroup.id],
        keyName: keyPair.keyName,
        userData: fs.readFileSync("user-data.sh", "utf8"),
        tags: {
            Name: name,
        },
    });
};

const instance1 = createEC2Instance("instance-1", publicSubnet1);
const instance2 = createEC2Instance("instance-2", publicSubnet2);

// Update Target Group health check configuration
const targetGroup = new aws.lb.TargetGroup("web-tg", {
    port: 4000, // Changed to match backend port
    protocol: "HTTP",
    vpcId: vpc.id,
    targetType: "instance",
    healthCheck: {
        path: "/",
        protocol: "HTTP",
        matcher: "200",
        interval: 30,
        timeout: 5,
        healthyThreshold: 3,
        unhealthyThreshold: 3,
        port: "4000"
    },
    tags: {
        Name: "web-target-group",
    },
});

// Attach EC2 Instances to Target Group
const targetGroupAttachment1 = new aws.lb.TargetGroupAttachment("tg-attachment-1", {
    targetGroupArn: targetGroup.arn,
    targetId: instance1.id,
    port: 4000,
});

const targetGroupAttachment2 = new aws.lb.TargetGroupAttachment("tg-attachment-2", {
    targetGroupArn: targetGroup.arn,
    targetId: instance2.id,
    port: 4000,
});

// Create an Application Load Balancer
const alb = new aws.lb.LoadBalancer("web-alb", {
    internal: false,
    loadBalancerType: "application",
    securityGroups: [securityGroup.id],
    subnets: [publicSubnet1.id, publicSubnet2.id],
    tags: {
        Name: "web-alb",
    },
});

// Create ALB Listener
const listener = new aws.lb.Listener("web-listener", {
    loadBalancerArn: alb.arn,
    port: 80,
    protocol: "HTTP",
    defaultActions: [{
        type: "forward",
        targetGroupArn: targetGroup.arn,
    }],
});

// Export the VPC ID, EC2 instance public IPs, and ALB DNS name
exports.vpcId = vpc.id;
exports.instance1PublicIp = instance1.publicIp;
exports.instance2PublicIp = instance2.publicIp;
exports.albDnsName = alb.dnsName;