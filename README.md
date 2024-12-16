# Fidget Interactive
Utilized a Sample CodePipeline from Amazon AWS course through University of Nebraska at Omaha <br /><br />

Edited index.html and CSS page for Fidget Interactive project <br />
Created Index.js for functionality regarding index.html

## This App Uses AWS Services:
Elastic Beanstalk - WebPage Creation for the environment <br />
EC2 Instance - Instance for Webpage to be deployed on <br />
CodePipeline - Continuous Integration/Continuous Delivery <br />
Roles - Policies created (Letting Amazon AWS Handle Bucket and Instance <br />
S3 Buckets

# How to Implement/Use
## On your Amazon AWS account (Preferrably an IAM account)
-Go to Elastic Beanstalk Environments <br />
-Create Environment 

## Step One - Configure Environment
-Select Web Server environment <br />
-Write Application Name (Environment Information will automattically be set to "The name you chose"-env) <br />
-Choose Managed platform (for mine I chose PHP as the platform since I'm using HTML and JS) <br />
-I ran this as a Sample Application <br />
-Hit Next

## Step Two - Configure Service Access
-You'll hit next and then configure your Service Access <br /> 
-Create and use new service role <br />
-Service role name (Automatically configured based on name of application) <br />
-EC2 Key Pair (Instructions for creating a Key Pair is further down) <br />
-EC2 Instance Profile (Instructions for creating policies further down)

## Step Three - Set up Networking, Database, and Tags
-This is optional and for this project it's not necessary <br />
-However, this is the step where you could implement an RDS (Relational Database) through AWS

## Step Four - Configure Instance Traffic and Scaling
-The only thing I did here was Configure the Root Volume type (General Purpose 3(SSD)) <br />
-Size, IOPS, and Throughput are all fine as is (Not a big project, not necessary to change) <br />
-Add EC2 Security Group if you want

## Step Five - Configure Updates, Monitoring, and Logging
-Not necessary for this project (skip) <br />

# Creating a Key Pair
-Go to EC2 Dashboard
-Go to Key Pairs on the left hand side
-Create Key Pair (follow the instructions on AWS)
-Can use .PPK (Putty) or .PEM (SSH) (either is fine for this project, I used .PEM)

# Creating Roles for policies
-For the Roles you can create the policies for your roles through the IAM dashboard <br />
-Go to IAM Dashboard <br />
-Go to Roles <br />
-Create Roles <br />
-For this application I used AmazonEC2FullAccess and AmazonS3FullAccess (easiest to let Amazon manage the buckets and EC2 instance for this simple project)
