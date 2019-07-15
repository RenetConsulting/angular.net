﻿// <copyright file="SettingsController.cs" company="Renet Consulting, Inc">
// Copyright (c) Renet Consulting, Inc. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
// </copyright>

namespace Application.Controllers
{
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.Extensions.Logging;
    using Microsoft.Extensions.Options;

    [Route("api/[controller]")]
    [ApiController]
    public class SettingsController : BaseController
    {
        public SettingsController(IOptions<AppSettings> appSettings, ILogger<AccountController> logger)
            : base(appSettings, logger)
        {
        }

        [HttpGet]
        public async Task<IActionResult> GetAsync()
        {
            var options = new
            {
                this.AppSettings.FacebookAppId,
                this.AppSettings.GoogleClientId,
                this.AppSettings.CoreCaptchaUrl
            };

            return await Task.FromResult(this.Ok(options));
        }
    }
}