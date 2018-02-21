﻿namespace Application
{
    public class AppSettings
    {
        public string SendGridKey { get; set; }

        public string InfoFromEmail { get; set; }

        public string RecaptchaSecret { get; set; }

        public string InfoToEmail { get; set; }

        public string SubjectToUser { get; set; }

        public string SubjectToWebsite { get; set; }

        public string GoogleAnalyticsId { get; set; }

        public string BlobStorage { get; set; }

        public string BlobContainerName { get; set; }

        public string FileExtensions { get; set; }
    }
}