﻿// <copyright file="IGlobalRepository.cs" company="Renet Consulting, Inc">
// Copyright (c) Renet Consulting, Inc. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
// </copyright>

namespace Application.DataAccess.Repositories
{
    using System.Collections.Generic;
    using System.Diagnostics.CodeAnalysis;
    using System.Threading;
    using System.Threading.Tasks;
    using Application.DataAccess.Enums;
    using Application.DataAccess.Models;
    using Entities;
    using Microsoft.AspNetCore.Identity;
    using Microsoft.EntityFrameworkCore.Storage;

    public interface IGlobalRepository
    {
        #region Transactions
        IDbContextTransaction BeginTransaction();

        Task<IDbContextTransaction> BeginTransactionAsync(CancellationToken cancellationToken = default(CancellationToken));

        Task<IDbContextTransaction> BeginTransactionAsync(System.Data.IsolationLevel isolationLevel, CancellationToken cancellationToken = default(CancellationToken));
        #endregion

        Task<T> AddAsync<T>(T entity)
            where T : class;

        Task<T> UpdateAsync<T>(T entity)
             where T : ApplicationEntity;

        [SuppressMessage("StyleCop.CSharp.SpacingRules", "SA1009:ClosingParenthesisMustBeSpacedCorrectly", Justification = "ValueTuple.")]
        Task<(TEntity[] list, long totalItems)> ListAsync<TEntity>(int? skip, int? take, bool? active, string sortFieldName, SortOrder? sortOrder)
            where TEntity : ApplicationEntity;

        Task<T> FindByIdAsync<T>(params object[] keys)
            where T : ApplicationEntity;

        Task<bool> SaveBlogFileAsync(string blogId, string fileBlobName);

        Task<FileStorage> GetBlogFileAsync(string fileBlobName);

        [SuppressMessage("StyleCop.CSharp.SpacingRules", "SA1009:ClosingParenthesisMustBeSpacedCorrectly", Justification = "ValueTuple.")]
        Task<(List<Blog>, int)> GetBlogsAsync(int index, int count, string userId);

        Task<Blog> AddBlogAsync(Blog blog);

        Task<Blog> UpdateBlogAsync(string blogId, string title, string content, string userId);

        Task<bool> DeleteBlogFileAsync(string fileBlobName, string userId);

        Task<bool> DeleteBlogAsync(string blogId, string userId);

        Task<Blog> GetBlogAsync(string blogId, string userId);

        Task<List<FileStorage>> GetAllFilesAsync();

        Task<FileStoragesPagingModel> GetFileStoragesAsync(string userId, int page, int pageSize);
    }
}
