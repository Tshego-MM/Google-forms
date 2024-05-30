terraform {
  backend "s3" {
    bucket = "google-forms-levelup-bucket"
    key = "google-forms/terraform.tfstate"  # Specify the path/key for your state file
    region = "eu-west-1"
  }
}