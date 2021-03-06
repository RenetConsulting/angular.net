﻿// <copyright file="ControllerErrorCode.cs" company="Renet Consulting, Inc">
// Copyright (c) Renet Consulting, Inc. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
// </copyright>

namespace Application.Controllers
{
    using System.ComponentModel;

    public enum ControllerErrorCode
    {
        None = 0,

        [Description("The record has been modified by another user.")]
        UpdateConcurrencyException = 1000
    }
}
