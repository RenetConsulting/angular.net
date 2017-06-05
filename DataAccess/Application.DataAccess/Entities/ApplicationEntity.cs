﻿namespace Application.DataAccess.Entities
{
    using System;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;

    /// <summary>
    /// This is an abstract entity base class. All application entities should inherit this class
    /// </summary>
    public abstract class ApplicationEntity
    {
        [Column(TypeName = "DateTime2")]
        [DatabaseGenerated(DatabaseGeneratedOption.Computed)] // this will prevent the column to be updated
        public DateTime CreatedDate { get; internal set; }

        [Column(TypeName = "DateTime2")]
        [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
        public DateTime? UpdatedDate { get; internal set; }

        public bool IsActive { get; set; }

        [NotMapped]
        public virtual string Timestamp
        {
            get { return this.RowVersion == null ? null : Convert.ToBase64String(this.RowVersion); }
            set { this.RowVersion = string.IsNullOrEmpty(value) ? null : Convert.FromBase64String(value); }
        }

        [Timestamp]
        public virtual byte[] RowVersion { get; internal set; }

        [StringLength(450)]
        [Required]
        [DatabaseGenerated(DatabaseGeneratedOption.Computed)] // this will prevent the column to be updated
        public string CreatedBy { get; internal set; }

        [StringLength(450)]
        public string UpdatedBy { get; internal set; }
    }
}
